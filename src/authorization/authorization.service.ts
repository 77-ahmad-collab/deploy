import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Models/users.model';

@Injectable()
export class AuthorizationService {
  constructor(@InjectModel('test') private UserModel: Model<User>) {}
  async signup(email, password) {
    const result = await this.UserModel.create({ email, password });
    console.log(result);
    return result;
  }

  async signIn(email, password) {
    console.log(email, password);
    const user = await this.UserModel.findOne({ email });
    console.log(user, 'hello');
    if (!user) throw new UnauthorizedException('credentials are incorrect');
    console.log(user.password, password);
    if (user.password !== password) {
      throw new UnauthorizedException('credentials do not match');
    }

    return {
      email: user.email,
    };
  }
}
