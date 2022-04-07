import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Param,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model, Schema } from 'mongoose';
import { AppService } from './app.service';
import { User } from './Models/users.model';
import { JwtService } from '@nestjs/jwt';
import { StudentInterface } from './Models/Student/student.model';
import { Proposal } from './Models/Student/proposal.modal';
import { Form } from './Models/Student/form.model';
import { InternalAdvisor } from './Models/INTERNAL_ADVISOR/internalAdvisor.model';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    @InjectModel('test') private UserModel: Model<User>,
    @InjectModel('UndergradateStudents')
    private StudentModel: Model<StudentInterface>,
    @InjectModel('proposals') private ProposalModel: Model<Proposal>,
    @InjectModel('formdatas') private FormModel: Model<Form>,
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
  ) {}

  @Get()
  async getHello() {
    return 'Nest server is succcesfully up';
  }
  @Get('/all/projects/title')
  async getProjectsTitle() {
    const data = await this.FormModel.find({}, { s_proj_title: 1, _id: 0 });
    return data;
  }
  @Get('/project/title/information')
  async getProjectInformationByTitle(@Body('title') title: string) {
    const data = await this.FormModel.findOne({ s_proj_title: title });
    const { mem1 } = data;
    const result = await axios.get(
      `https://student-server-app.herokuapp.com/student/getformdata/${mem1}`,
    );
    return result.data;
  }
}
