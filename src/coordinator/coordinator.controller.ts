import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalAdvisorDto } from 'src/internal-advisor/dtos/internalAdvisor.dto';
import { CoordinatorService } from './coordinator.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Coordinator } from 'src/Models/Coordinator/Coordinator.Model';
import { Model } from 'mongoose';
import { Evaluation } from 'src/Models/Evaluation/Evaluation.Model';
import { Marks } from 'src/Models/Evaluation/Marks.model';
import { StudentInterface } from 'src/Models/Student/student.model';
import { Form } from 'src/Models/Student/form.model';
@Controller('coordinator')
export class CoordinatorController {
  constructor(
    private readonly CoordinatorService: CoordinatorService,
    private readonly jwtService: JwtService,
    @InjectModel('Coordinator')
    private CoordinatorModel: Model<Coordinator>,
    @InjectModel('Evaluation')
    private EvaluationModel: Model<Evaluation>,
    @InjectModel('UndergradateStudents')
    private StudentModel: Model<StudentInterface>,
    @InjectModel('formdatas') private StudentFormModel: Model<Form>,
  ) {}

  @Post('/signup')
  //   @Serialize(new SerializeInterceptor(AdvisorDto))
  async register(@Body() body: InternalAdvisorDto) {
    console.log(body);
    const data = await this.CoordinatorService.register(body);
    return {
      message: 'Account has been registered',
      data,
    };
  }
  @Post('/login')
  async login(@Body() body) {
    try {
      const { email, password } = body;
      let previousdata = await this.CoordinatorService.login(email, password);
      console.log(previousdata, 'prr----------------');
      const count = await this.StudentModel.find().count();
      const totalgroups = await this.StudentFormModel.find().count();
      let data = {
        name: previousdata.name,
        id: previousdata.id,
        email: previousdata.email,
        contact: previousdata.contact,
        designation: previousdata.designation,
        password: previousdata.password,
        locationOfEvaluation: previousdata.locationOfEvaluation,
        totalStudents: count,
        totalFydpGroups: totalgroups,
      };

      return {
        data,
        jwt: this.CoordinatorService.signUser(10, previousdata.email, 'user'),
      };
    } catch (error) {
      throw new UnauthorizedException('credentials are not correct');
    }
  }
  @Get('/auth/:token')
  async getData(@Param('token') token: string) {
    try {
      const user = await this.jwtService.verify(token);
      console.log(user);
      const advisor = await this.CoordinatorModel.findOne({
        email: user.email,
      });

      return advisor;
    } catch (error) {
      return 'jwt token expired';
    }
  }
  ///---for final evaluation---/// same for mid just in final it will overwrite
  @Post('/evaluation')
  async evaluation(@Body() body: any) {
    const data = await this.CoordinatorService.evaluation(body);
    return {
      message: 'Evaluation has been submitted',
      data,
    };
  }
  @Post('/finalevaluation')
  async finalevaluation(@Body() body: any) {
    const data = await this.CoordinatorService.finalevaluation(body);
    return {
      message: 'Evaluation has been submitted',
      data,
    };
  }

  ///---for final evaluation---/// same for mid just in final it will overwrite
  @Get('/all/EvaluationLocation')
  async getAllEvaluationLocation() {
    const data = await this.CoordinatorModel.find();
    return {
      data: data[0].locationOfEvaluation,
    };
  }
  ///---for final evaluation---/// same for mid just in final it will overwrite
  @Get('shedule/evaluation/:mid') //if mid then true
  async getAllEvaluation(@Param('mid') mid: string) {
    try {
      const data = await this.CoordinatorService.getAllEvaluationShedule(mid);
      return data;
    } catch (error) {
      return error;
    }
  }
  @Get('/total/students/department')
  async getTotalStudents() {
    const data = await this.StudentModel.find().count();
    return data;
  }
  @Get('/total/fydp/groups')
  async getTotalGroups() {
    const data = await this.StudentFormModel.find().count();
    return data;
  }
  @Get('/student/details/:id')
  async getDetails(@Param('id') id: string) {
    const student = await this.StudentModel.findOne({
      id: id.toUpperCase(),
    });
    if (student.formid) {
      const FORMID = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: FORMID });
      return {
        groupCount: studentForm.mem_count,
        internal: studentForm.s_internal,
        external: studentForm.s_external,
      };
    } else {
      return {
        groupCount: 0,
        internal: '',
        external: '',
      };
    }
  }
}
