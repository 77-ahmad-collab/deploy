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
import { Model } from 'mongoose';
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
  ) {}

  @Get()
  async getHello() {
    const data = await this.FormModel.find();
    return data;
  }
  @Post('/student/signup')
  async signup(@Body() body) {
    const { email, password } = body;
    const result = await this.UserModel.create({ email, password });
    return { email, password };
  }
  @Post('/student/login')
  async login(@Body() body) {
    const { email, password } = body;
    const user = await this.UserModel.findOne({ email });
    if (!user) throw new UnauthorizedException('credentials are incorrect');
    console.log(user.password, password);
    if (user.password !== password) {
      throw new UnauthorizedException('credentials do not match');
    }

    return {
      jwt: this.appService.signUser(10, user.email, 'user'),
      email: user.email,
    };
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('/student/login/:token')
  async getData(@Param('token') token: string) {
    try {
      const user = await this.jwtService.verify(token);
      console.log(user);
      return ' you have succesfully loged in without deployment issues';
    } catch (error) {
      return 'jwt token expired';
    }
  }
}
