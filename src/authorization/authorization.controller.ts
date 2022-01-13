import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import axios from 'axios';
@Controller('authorizationTEST')
export class AuthorizationController {
  constructor(private AuthorizationService: AuthorizationService) {}
  @Post('/student/signup')
  async signup(@Body() body) {
    const { email, password } = body;
    const result = await this.AuthorizationService.signup(email, password);
    return result;
  }
  @Post('/student/signin')
  async signIn(@Body() body) {
    const { email, password } = body;
    const result = await this.AuthorizationService.signIn(email, password);
    const resultof = await axios.get('http://localhost:7000/get');

    return resultof.data;
  }
}
