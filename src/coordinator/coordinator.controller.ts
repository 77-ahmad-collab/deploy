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
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { External } from 'src/Models/External/Externel.Model';
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
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    @InjectModel('External')
    private ExternalModel: Model<External>,
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
  } //
  @Get('/student/details/:id')
  async getDetails(@Param('id') id: string) {
    const student = await this.StudentModel.findOne({
      id: id.toUpperCase(),
    });
    if (student.formid) {
      const FORMID = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: FORMID });
      const std1_rollNo = studentForm.mem1;
      const std2_rollNo = studentForm.mem2;
      const std3_rollNo = studentForm.mem3;
      const student1 = await this.StudentModel.findOne({ id: std1_rollNo });
      const student2 = await this.StudentModel.findOne({ id: std2_rollNo });
      const student3 = await this.StudentModel.findOne({ id: std3_rollNo });
      const internal = await this.InternalAdvisorModel.findOne({
        name: studentForm.s_internal,
      });
      const external = await this.ExternalModel.findOne({
        name: studentForm.s_external,
      });
      let internal_email = '';
      let external_email = '';
      if (internal) internal_email = internal.email;
      if (external) external_email = external.email;

      let data: any = {
        groupCount: studentForm.mem_count,
        internal: studentForm.s_internal,
        external: studentForm.s_external,
        internal_email: internal_email || '',
        external_email: external_email || '',
        std1_rollNo,
        std2_rollNo,
        std3_rollNo,
        std1_Name: student1.s_name,
        std1_status: student1.s_status,
        std2_Name: student2.s_name,
        std2_status: student2.s_status,
        std3_Name: student3.s_name,
        std3_status: student3.s_status,
      };
      if (studentForm.mem_count === 4) {
        const std4_rollNo = studentForm.mem4;
        const student4 = await this.StudentModel.findOne({
          id: studentForm.mem4,
        });
        data = {
          ...data,
          std4_rollNo,
          std4_Name: student4.s_name,
          std4_status: student4.s_status,
        };
      }
      return data;
    } else {
      let data: any = {
        groupCount: 0,
        internal: '',
        external: '',
        internal_email: '',
        external_email: '',
        std1_rollNo: '',
        std2_rollNo: '',
        std3_rollNo: '',
        std1_Name: '',
        std1_status: '',
        std2_Name: '',
        std2_status: '',
        std3_Name: '',
        std3_status: '',
      };
      return data;
    }
  }
}
