import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Param
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { User } from './users.model';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('test') private UserModel: Model<User>,
  private jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
    console.log(user.password,password);
    if (user.password !== password) {
      throw new UnauthorizedException('credentials do not match');
    }

    return {jwt:this.appService.signUser(10, user.email, 'user'),
    email:user.email};
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('/student/login/:token')
  async getData(@Param("token") token:string) {
    try {
      const user = await this.jwtService.verify(token);
console.log(user)
    return ' you have succesfully loged in without deployment issues';
  
    } catch (error) {
      return "jwt token expired"
    }
}
}