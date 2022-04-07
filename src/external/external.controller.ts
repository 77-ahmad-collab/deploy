import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Coordinator } from 'src/Models/Coordinator/Coordinator.Model';
import { External } from 'src/Models/External/Externel.Model';
import { ExternalService } from './external.service';

@Controller('external')
export class ExternalController {
  constructor(
    private readonly externalService: ExternalService,
    private readonly jwtService: JwtService,
    @InjectModel('External')
    private ExternalModel: Model<External>,
  ) {}
  @Post('/signup')
  //   @Serialize(new SerializeInterceptor(AdvisorDto))
  async register(@Body() body: any) {
    console.log(body);
    const data = await this.externalService.register(body);
    return {
      message: 'Account has been registered',
      data,
    };
  }
  @Post('/login')
  async login(@Body() body) {
    try {
      const { email, password } = body;
      const data = await this.externalService.login(email, password);
      return {
        data,
        jwt: this.externalService.signUser(10, data.email, 'user'),
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
      const advisor = await this.ExternalModel.findOne({
        email: user.email,
      });

      return advisor;
    } catch (error) {
      return 'jwt token expired';
    }
  }
  @Get('/getAll')
  async getAll() {
    const data = await this.ExternalModel.find();
    return data;
  }
}
