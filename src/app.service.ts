import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}
  getHello(): string {
    return 'Hello World!';
  }
  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
