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
import { FinalEvaluation } from 'src/Models/Evaluation/FinalEvaluation.model';
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
    @InjectModel('FinalEvaluation')
    private FinalEvaluationModel: Model<FinalEvaluation>,
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
        external_evaluator2,
        external_evaluator3,
        date,
        time,
        midEvaluation,
      } = body;
      const form = await this.StudentFormModel.updateOne(
        {
          s_proj_title: project_title,
        },
        {
          $set: { external_evaluator: external_evaluator },
        },
      );
      const evaluation = await this.EvaluationModel.create({
        location,
        project_title,
        group_leader,
        supervisor,
        co_supervisor,
        external,
        chairmen,
        external_evaluator,
        external_evaluator2,
        external_evaluator3,
        date,
        time,
        midEvaluation,
      });

      return { evaluation, body };
    } catch (error) {
      return {
        error: error.message,
        body,
      };
    }
  }
  async finalevaluation(body) {
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
        external_evaluator2,
        external_evaluator3,
        date,
        time,
        midEvaluation,
      } = body;
      const form = await this.StudentFormModel.updateOne(
        {
          s_proj_title: project_title,
        },
        {
          $set: { external_evaluator: external_evaluator },
        },
      );
      const evaluation = await this.FinalEvaluationModel.create({
        location,
        project_title,
        group_leader,
        supervisor,
        co_supervisor,
        external,
        chairmen,
        external_evaluator,
        external_evaluator2,
        external_evaluator3,
        date,
        time,
        midEvaluation,
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
  async getAllEvaluationShedule(midEvaluation: string) {
    //  target the form model
    let data = null;
    if (midEvaluation === 'true') {
      data = await this.EvaluationModel.find({ midEvaluation }, { _id: 0 });
    } else {
      data = await this.FinalEvaluationModel.find(
        { midEvaluation },
        { _id: 0 },
      );
    }
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
}
// s_organization
// :
// ""
// mem1
// :
// "CT-18008"
// mem2
// :
// "CT-18013"
// mem3
// :
// "CT-18018"
// mem4
// :
// ""
// s_proj_title
// :
// "FYDP Management System"
