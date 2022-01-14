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
    const data: {
      id: string;
      groupid: number;
      s_name: string;
      isSUBMIT: string;
      isINVITE: string;
      isACCEPTED: string;
      isPROPOSAL: string;
      isPROPOSALSUBMIT: string;
      s_rollno: string;
      s_email: string;
      s_batch: string;
      password: string;
      s_contact: string;
      s_department: string;
      s_status: string;
      s_tokens: any[];
      formid: { type: Schema.Types.ObjectId; ref: 'Form' };
      proposalid: { type: Schema.Types.ObjectId; ref: 'proposal' };
      groupRequest: string;
      ResponseCount: string;
    }[] = await this.StudentModel.find();
    console.log(data[1].id, 'data');
    // const result = data.filter((val) => {
    //   console.log(val.id, 'CT-18010', '=======');
    //   console.log(val.s_batch, ' CT - 18010');
    //   return val.id == 'CT-18008';
    // });
    return data;
  }
  // @Post('/student/signup')
  // async signup(@Body() body) {
  //   const { email, password } = body;
  //   const result = await this.UserModel.create({ email, password });
  //   return { email, password };
  // }
  // @Post('/student/login')
  // async login(@Body() body) {
  //   const { email, password } = body;
  //   const user = await this.UserModel.findOne({ email });
  //   if (!user) throw new UnauthorizedException('credentials are incorrect');
  //   console.log(user.password, password);
  //   if (user.password !== password) {
  //     throw new UnauthorizedException('credentials do not match');
  //   }

  //   return {
  //     jwt: this.appService.signUser(10, user.email, 'user'),
  //     email: user.email,
  //   };
  // }
  // @UseGuards(AuthGuard('jwt'))
  // @Get('/student/login/:token')
  // async getData(@Param('token') token: string) {
  //   try {
  //     const user = await this.jwtService.verify(token);
  //     console.log(user);
  //     return ' you have succesfully loged in without deployment issues';
  //   } catch (error) {
  //     return 'jwt token expired';
  //   }
  // }
}
