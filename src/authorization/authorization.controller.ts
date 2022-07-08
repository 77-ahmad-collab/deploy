import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import axios from 'axios';
@Controller('authorization')
export class AuthorizationController {
  constructor(private AuthorizationService: AuthorizationService) {}
  @Post('/signup')
  async signup(@Body() body) {
    const { email, password } = body;
    const result = await this.AuthorizationService.signup(email, password);
    return result;
  }
  @Post('/signin')
  async signIn(@Body() body) {
    const { email, password } = body;
    const result = await this.AuthorizationService.signIn(email, password);

    return result;
  }
}
