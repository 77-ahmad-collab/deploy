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
import { Model } from 'mongoose';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
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
      return ' you have succesfully loged in without deployment issues';
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
  // @Get('/test')
  // async getTest() {
  //   return await this.internalAdvisorGetData.leaderInformation(['CT-18021']);
  // }
}
