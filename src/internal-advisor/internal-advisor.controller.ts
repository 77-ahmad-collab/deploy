import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Evaluation } from 'src/Models/Evaluation/Evaluation.Model';
import { FinalEvaluation } from 'src/Models/Evaluation/FinalEvaluation.model';
import { FinalEvaluationMarks } from 'src/Models/Evaluation/FinalEvaluationMarks.model';
import { ReportEvaluationMarks } from 'src/Models/Evaluation/ReportEvaluationMarks.model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { Attendance } from 'src/Models/Student/attendance.model';
import { Form } from 'src/Models/Student/form.model';
import { StudentInterface } from 'src/Models/Student/student.model';
import { AuthorizationServiceAdvisor } from './authorization.service';
import { InternalAdvisorDto } from './dtos/internalAdvisor.dto';

import {
  Serialize,
  SerializeInterceptor,
} from './interceptors/serialize.interceptor';
import { InternalAdvisorService } from './internal-advisor.service';
import { InternalAdvisorGetData } from './internalAdvisorGetData';

@Controller('internaladvisor')
export class InternalAdvisorController {
  constructor(
    @InjectModel('formdatas') private FormModel: Model<Form>,
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    private jwtService: JwtService,
    private authorizationService: AuthorizationServiceAdvisor,
    private internalAdvisorService: InternalAdvisorService,
    @InjectModel('UndergradateStudents')
    private readonly StudentModel: Model<StudentInterface>,
    private internalAdvisorGetData: InternalAdvisorGetData,
    @InjectModel('attendance') private attendanceModel: Model<Attendance>,
    @InjectModel('Evaluation')
    private EvaluationModel: Model<Evaluation>,
    @InjectModel('FinalEvaluationMarks')
    private FinalEvaluationMarksModel: Model<FinalEvaluationMarks>,
    @InjectModel('ReportEvaluationMarks')
    private ReportEvaluationMarksModel: Model<ReportEvaluationMarks>,
    @InjectModel('FinalEvaluation')
    private FinalEvaluationModel: Model<FinalEvaluation>,
  ) {}
  @Get('/')
  async get() {
    const data = await this.FormModel.find();
    return { name: 'ahmad', data };
  }
  @Post('/signup')
  //   @Serialize(new SerializeInterceptor(AdvisorDto))
  async register(@Body() body: InternalAdvisorDto) {
    console.log(body);
    const data = await this.authorizationService.register(body);
    return {
      message: 'Account has been registered',
      data,
    };
  }
  @Post('/login')
  async login(@Body() body) {
    try {
      const { email, password } = body;
      const data = await this.authorizationService.login(email, password);
      return {
        data,
        jwt: this.authorizationService.signUser(10, data.email, 'user'),
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
      const advisor = await this.InternalAdvisorModel.findOne({
        email: user.email,
      });

      return advisor;
    } catch (error) {
      return 'jwt token expired';
    }
  }

  @Get('/allocation/:id/:status/:rollno')
  async AdvisorStatusAllocation(
    @Param('status') status: string,
    @Param('id') id: string,
    @Param('rollno') rollno: string,
    @Body('remarks') remarks: string,
  ) {
    console.log(remarks, 'remarks');
    const user = await this.InternalAdvisorModel.findOne({ id });
    if (!user) return 'Not found with the given id';
    if (status == 'true') {
      const data = await this.internalAdvisorService.approveAllocation(
        id,
        rollno,
        remarks,
      );
      return data;
    } else if (status == 'false') {
      const data = await this.internalAdvisorService.reviewAllocation(
        id,
        rollno,
        remarks,
      );
      return data;
    }
  }
  @Get('/proposal/:id/:status/:rollno')
  async AdvisorStatusProposal(
    @Param('status') status: string,
    @Param('id') id: string,
    @Param('rollno') rollno: string,
    @Body('remarks') remarks: string,
  ) {
    const user = await this.InternalAdvisorModel.findOne({ id });

    if (!user) throw new NotFoundException('Not found with the given id');

    if (status == 'true') {
      const data = await this.internalAdvisorService.approveProposal(
        id,
        rollno,
        remarks,
      );
      return data;
    } else if (status == 'false') {
      const data = await this.internalAdvisorService.reviewProposal(
        id,
        rollno,
        remarks,
      );
      return data;
    }
  }
  @Get('/information/:id')
  async getInformation(@Param('id') id: string) {
    try {
      const user = await this.InternalAdvisorModel.findOne({ id });
      if (!user) throw new NotFoundException('Not found with the given id');
      return {
        name: user.name,
        email: user.email,
        contact: user.contact,
        designation: user.designation,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  @Get('/information/allocation/:id')
  async getAllocationInformation(@Param('id') id: string) {
    console.log(id, 'id');
    const data = this.internalAdvisorGetData.getAllocationInformation(id);
    return data;
  }
  @Get('/information/proposal/:id')
  async getProposalInformation(@Param('id') id: string) {
    console.log(id, 'id');
    const data = this.internalAdvisorGetData.getProposalInformation(id);
    return data;
  }
  @Get('/all')
  async getInternalAdvisorList() {
    const data = await this.InternalAdvisorModel.find();
    return data;
  }
  // @Get('/attendance/:id')
  // async attendance(@Param('id') id: string) {
  //   try {
  //     const data = await this.internalAdvisorService.attendance(id);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  @Post('/attendance/:advisorid/:weekno/:count')
  async updateAttendance(
    @Param('advisorid') advisorid: string,
    @Param('count') count: string,

    @Param('weekno') weekno: string,
    @Body() body,
  ) {
    try {
      console.log(body, 'body>>>>>');
      const data = await this.internalAdvisorService.updateAttendance(
        advisorid,
        count,

        weekno,
        body,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/leaders/all/:id')
  async getAttendanceLeaders(@Param('id') id: string) {
    try {
      console.log('i hav ebeen ');
      const data = await this.internalAdvisorGetData.getAttendanceLeaders(id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/group/information/:rollno')
  async getAttendanceGroupInformation(@Param('rollno') rollno: string) {
    try {
      const result = await axios.get(
        `https://student-server-app.herokuapp.com/student/getformdata/${rollno}`,
      );
      const getData = await this.attendanceModel.findOne({ id: rollno });
      let data = { ...result.data, week: getData.count || 1 };
      return data;
    } catch (error) {
      return error;
    }
  }
  @Get('/all/projects/:id/:mid') // mid 1 updated that need tobe given today
  async getAllProjects(@Param('id') id: number, @Param('mid') mid: string) {
    try {
      const data = await this.internalAdvisorGetData.getAllProjects(id, mid);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/all/projects/report/:id') // mid 1 updated that need tobe given today
  async getAllReportProjects(@Param('id') id: number) {
    try {
      const data = await this.internalAdvisorGetData.getAllReportProjects(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/all/progress/projects') // dont need in final evalution
  async getAllProgressProjects(@Body('id') id: string) {
    try {
      const data = await this.internalAdvisorGetData.getAllProgressProjects(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/submission/progress/marks') // dont need in final evaluation
  async getMarks(@Body() body: any) {
    const data = await this.internalAdvisorGetData.getProgressMarks(body);
    return data;
  }
  @Post('/submission/progress/average') // dont need in final evaluation
  async getAverage(@Body() body: any) {
    const data = await this.internalAdvisorGetData.getAverage(body.id);
    return data;
  }
  @Post('/submission/evaluation/marks/:mid') // mid evaluation marks submiision update 2222
  async getEvaluationMarks(@Body() body: any, @Param('mid') mid: string) {
    if (mid === 'true') {
      const data = await this.internalAdvisorGetData.getEvaluationMarks(body);
      return data;
    } else {
      const data = await this.internalAdvisorGetData.getFinalEvaluationMarks(
        body,
      );
      return data;
    }
  }
  @Post('/submission/report/final')
  async finalReportSubmission(@Body() body: any) {
    const data = await this.internalAdvisorGetData.getReportEvaluationMarks(
      body,
    );
    return data;
  }
  @Get('/submission/evaluation/average/:id/:mid') //get mif marks updated
  async getEvaluationAverage(
    @Param('id') id: string,
    @Param('mid') mid: string,
  ) {
    if (mid === 'true') {
      const data = await this.internalAdvisorGetData.getEvaluationAverage(
        id,
        mid,
      );
      return data;
    } else {
      const data = await this.FinalEvaluationMarksModel.findOne({
        std1_rollNo: id,
      });
      return data;
    }
  }
  @Get('/submission/report/average/:id')
  async getReportAverage(@Param('id') id: string) {
    const data = await this.ReportEvaluationMarksModel.findOne({
      std1_rollNo: id,
    });
    return data;
  }

  @Get('/all/allocated/projects') // dont need
  async getAllAllocatedProjects() {
    const data = this.EvaluationModel.find(
      { isProgressResponded: false },
      { project_title: 1, _id: 0 },
    );
    return data;
  }
  @Get('/all/allocated/evaluation/:mid')
  async getAllAllocatedEvaluations(@Param('mid') mid: string) {
    const testData = await this.EvaluationModel.find();
    console.log(testData, 'test adat');
    if (mid === 'true') {
      const data = await this.EvaluationModel.find(
        { isEvaluationResponded: false },
        { project_title: 1, _id: 0 },
      );
      return data;
    } else {
      const data = await this.FinalEvaluationModel.find(
        { isfinalEvaluationResponded: false },
        { project_title: 1, _id: 0 },
      );
      return data;
    }
  }
  @Get('/all/allocated/report/evaluation')
  async getAllReportAllocatedEvaluations() {
    const data = await this.FinalEvaluationModel.find(
      { isreportEvaluationResponded: false },
      { project_title: 1, _id: 0 },
    );
    return data;
  }
}
