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
@Controller('coordinator')
export class CoordinatorController {
  constructor(
    private readonly CoordinatorService: CoordinatorService,
    private readonly jwtService: JwtService,
    @InjectModel('Coordinator')
    private CoordinatorModel: Model<Coordinator>,
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
      const data = await this.CoordinatorService.login(email, password);
      return {
        data,
        jwt: this.CoordinatorService.signUser(10, data.email, 'user'),
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
}
