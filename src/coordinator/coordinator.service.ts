import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Model } from 'mongoose';
import { Coordinator } from 'src/Models/Coordinator/Coordinator.Model';
import { Evaluation } from 'src/Models/Evaluation/Evaluation.Model';
import { Marks } from 'src/Models/Evaluation/Marks.model';
import { Form } from 'src/Models/Student/form.model';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class CoordinatorService {
  constructor(
    @InjectModel('Coordinator')
    private CoordinatorModel: Model<Coordinator>,
    private jwtService: JwtService,
    @InjectModel('Evaluation')
    private EvaluationModel: Model<Evaluation>,
    @InjectModel('formdatas') private StudentFormModel: Model<Form>,
    @InjectModel('Marks') private MarksModel: Model<Marks>,
  ) {}

  async register(body) {
    try {
      const {
        email,
        password,
        name,
        id,
        contact,
        designation,
        locationOfEvaluation,
      } = body;
      const user = await this.CoordinatorModel.findOne({ email });
      if (user) return 'User ALready exits >>>>>';
      const salt = randomBytes(8).toString('hex');
      console.log(salt, '======salt');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      console.log(hash, '=========hash');
      const result = hash.toString('hex') + '.' + salt.toString();
      console.log(result, 'result');
      const saveUser = await this.CoordinatorModel.create({
        name,
        id,
        email,
        contact,
        designation,
        password: result,
        locationOfEvaluation,
      });
      console.log(saveUser, 'user has been saved in to database');
      return { status: 'okay' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async login(email: string, password: string) {
    const user = await this.CoordinatorModel.findOne({ email });
    console.log(user);
    if (!user) throw new NotFoundException("Email or User name doesn't exists");
    console.log(user.password);
    const [storedHash, salt] = user.password.split('.');
    console.log('stored hash: ' + storedHash, 'Salt', salt);
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash == hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('Invalid Credentials');
    }
  }
  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
  async evaluation(body) {
    try {
      const {
        location,
        project_title,
        group_leader,
        supervisor,
        co_supervisor,
        external,
        chairmen,
        external_evaluator,
        date,
        time,
      } = body;
      const evaluation = await this.EvaluationModel.create({
        location,
        project_title,
        group_leader,
        supervisor,
        co_supervisor,
        external,
        chairmen,
        external_evaluator,
        date,
        time,
      });
      return { evaluation, body };
    } catch (error) {
      return {
        error: error.message,
        body,
      };
    }
  }
  async getProjectInformationByTitle(s_proj_title) {
    try {
      const info = await this.StudentFormModel.findOne({
        s_proj_title,
      });
      console.log(s_proj_title, 'the project title=>>>>>', info);
      const { mem1 } = info;
      const result = await axios.get(
        `https://student-server-app.herokuapp.com/student/getformdata/${mem1}`,
      );
      console.log(result.data, 'the result============================');
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllEvaluationShedule() {
    //  target the form model
    let data = await this.EvaluationModel.find({}, { _id: 0 });
    console.log(data, 'the data length');
    let Eval = await Promise.all(
      data.map((value) => {
        return this.getProjectInformationByTitle(value.project_title);
      }),
    );
    console.log(Eval, 'eval=================');
    Eval.map((value, index) => {
      console.log(data[index], '>>>index');
      return (data[index] = {
        ...value,
        data: data[index].date,
        time: data[index].time,
        location: data[index].location,
      });
    });
    return {
      data,
      // data,
    };
  }
  getWeightedAverage(mark1: number, mark2: number, mark3: number) {
    const multiplyByFactor = (mark, factor) => {
      return mark * factor;
    };
    const resultAverage =
      multiplyByFactor(mark1, 0.5) +
      multiplyByFactor(mark2, 0.5) +
      multiplyByFactor(mark3, 0.5);
    return resultAverage;
  }
  async getProgressMarks(body) {
    try {
      const Marks = await this.MarksModel.findOne({
        std1_rollNo: body.std1_rollNo,
      });
      let data;
      const std1_weighted_average = this.getWeightedAverage(
        body.std1_coherence_with_group,
        body.std1_intellectual_contribution,
        body.std1_response_to_questions,
      );
      const std2_weighted_average = this.getWeightedAverage(
        body.std2_coherence_with_group,
        body.std2_intellectual_contribution,
        body.std2_response_to_questions,
      );
      const std3_weighted_average = this.getWeightedAverage(
        body.std3_coherence_with_group,
        body.std3_intellectual_contribution,
        body.std3_response_to_questions,
      );
      if (body.count === 3) {
        data = {
          std1_coherence_with_group: body.std1_coherence_with_group,
          std1_intellectual_contribution: body.std1_intellectual_contribution,
          std1_name: body.std1_name,
          std1_response_to_questions: body.std1_response_to_questions,
          std1_rollNo: body.std1_rollNo,
          std2_coherence_with_group: body.std2_coherence_with_group,
          std2_intellectual_contribution: body.std2_intellectual_contribution,
          std2_name: body.std2_name,
          std2_response_to_questions: body.std2_response_to_questions,
          std2_rollNo: body.std2_rollNo,
          std3_coherence_with_group: body.std3_coherence_with_group,
          std3_intellectual_contribution: body.std3_intellectual_contribution,
          std3_name: body.std3_name,
          std3_response_to_questions: body.std3_response_to_questions,
          std3_rollNo: body.std3_rollNo,
          supervior_id: body.supervior_id,
          count: parseInt(body.count),
          project_title: body.project_title,
          std1_weighted_average,
          std2_weighted_average,
          std3_weighted_average,
        };
      } else if (body.count === 4) {
        const std4_weighted_average = this.getWeightedAverage(
          body.std4_coherence_with_group,
          body.std4_intellectual_contribution,
          body.std4_response_to_questions,
        );
        data = {
          std1_coherence_with_group: body.std1_coherence_with_group,
          std1_intellectual_contribution: body.std1_intellectual_contribution,
          std1_name: body.std1_name,
          std1_response_to_questions: body.std1_response_to_questions,
          std1_rollNo: body.std1_rollNo,
          std2_coherence_with_group: body.std2_coherence_with_group,
          std2_intellectual_contribution: body.std2_intellectual_contribution,
          std2_name: body.std2_name,
          std2_response_to_questions: body.std2_response_to_questions,
          std2_rollNo: body.std2_rollNo,
          std3_coherence_with_group: body.std3_coherence_with_group,
          std3_intellectual_contribution: body.std3_intellectual_contribution,
          std3_name: body.std3_name,
          std3_response_to_questions: body.std3_response_to_questions,
          std3_rollNo: body.std3_rollNo,
          std4_coherence_with_group: body.std4_coherence_with_group,
          std4_intellectual_contribution: body.std4_intellectual_contribution,
          std4_name: body.std4_name,
          std4_response_to_questions: body.std4_response_to_questions,
          std4_rollNo: body.std4_rollNo,
          supervior_id: body.supervior_id,
          count: parseInt(body.count),
          project_title: body.project_title,
          std1_weighted_average,
          std2_weighted_average,
          std3_weighted_average,
          std4_weighted_average,
        };
      }
      const marks = await this.MarksModel.create(data);
      return { message: 'FIRST TIME SUBMisso', marks };
      //  else {
      //   if (body.count === 3) {
      //     data = {
      //       std1_coherence_with_group: [
      //         ...Marks.std1_coherence_with_group,
      //         body.std1_coherence_with_group,
      //       ],
      //       std1_intellectual_contribution: [
      //         ...Marks.std1_intellectual_contribution,
      //         body.std1_intellectual_contribution,
      //       ],
      //       std1_response_to_questions: [
      //         ...Marks.std1_response_to_questions,
      //         body.std1_response_to_questions,
      //       ],

      //       std2_coherence_with_group: [
      //         ...Marks.std2_coherence_with_group,
      //         body.std2_coherence_with_group,
      //       ],
      //       std2_intellectual_contribution: [
      //         ...Marks.std2_intellectual_contribution,
      //         body.std2_intellectual_contribution,
      //       ],

      //       std2_response_to_questions: [
      //         ...Marks.std2_response_to_questions,
      //         body.std2_response_to_questions,
      //       ],

      //       std3_coherence_with_group: [
      //         ...Marks.std3_coherence_with_group,
      //         body.std3_coherence_with_group,
      //       ],
      //       std3_intellectual_contribution: [
      //         ...Marks.std3_intellectual_contribution,
      //         body.std3_intellectual_contribution,
      //       ],

      //       std3_response_to_questions: [
      //         ...Marks.std3_response_to_questions,
      //         body.std3_response_to_questions,
      //       ],
      //     };
      //   } else if (body.count === 4) {
      //     data = {
      //       std1_coherence_with_group: [
      //         ...Marks.std1_coherence_with_group,
      //         body.std1_coherence_with_group,
      //       ],
      //       std1_intellectual_contribution: [
      //         ...Marks.std1_intellectual_contribution,
      //         body.std1_intellectual_contribution,
      //       ],
      //       std1_response_to_questions: [
      //         ...Marks.std1_response_to_questions,
      //         body.std1_response_to_questions,
      //       ],

      //       std2_coherence_with_group: [
      //         ...Marks.std2_coherence_with_group,
      //         body.std2_coherence_with_group,
      //       ],
      //       std2_intellectual_contribution: [
      //         ...Marks.std2_intellectual_contribution,
      //         body.std2_intellectual_contribution,
      //       ],

      //       std2_response_to_questions: [
      //         ...Marks.std2_response_to_questions,
      //         body.std2_response_to_questions,
      //       ],

      //       std3_coherence_with_group: [
      //         ...Marks.std3_coherence_with_group,
      //         body.std3_coherence_with_group,
      //       ],
      //       std3_intellectual_contribution: [
      //         ...Marks.std3_intellectual_contribution,
      //         body.std3_intellectual_contribution,
      //       ],

      //       std3_response_to_questions: [
      //         ...Marks.std3_response_to_questions,
      //         body.std3_response_to_questions,
      //       ],
      //       std4_coherence_with_group: [
      //         ...Marks.std4_coherence_with_group,
      //         body.std4_coherence_with_group,
      //       ],
      //       std4_intellectual_contribution: [
      //         ...Marks.std4_intellectual_contribution,
      //         body.std4_intellectual_contribution,
      //       ],

      //       std4_response_to_questions: [
      //         ...Marks.std4_response_to_questions,
      //         body.std4_response_to_questions,
      //       ],
      //     };
      //   }
      //   const UpdatedMarks = await this.MarksModel.updateOne(
      //     { std1_rollNo: body.std1_rollNo },
      //     {
      //       $set: data,
      //     },
      //   );
      // //   return Marks;
      // }
      // return { status: 'ok', body };
    } catch (error) {
      return error;
    }
  }
  async getAverage(id: number) {
    const Marks = await this.MarksModel.findOne({ supervior_id: id });
    return Marks;
  }
}
