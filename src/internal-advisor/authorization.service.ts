import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Model } from 'mongoose';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';

import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthorizationServiceAdvisor {
  constructor(
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    private jwtService: JwtService,
  ) {}
  async register(body) {
    try {
      const { email, password, name, id, contact, designation } = body;
      const user = await this.InternalAdvisorModel.findOne({ email });
      if (user) throw new BadRequestException('User ALready exits');
      const salt = randomBytes(8).toString('hex');
      console.log(salt, '======salt');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      console.log(hash, '=========hash');
      const result = hash.toString('hex') + '.' + salt.toString();
      console.log(result, 'result');
      const saveUser = await this.InternalAdvisorModel.create({
        name,
        id,
        email,
        contact,
        designation,
        password: result,
      });
      console.log(saveUser, 'user has been saved in to database');
      return { status: 'okay' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async login(email: string, password: string) {
    const user = await this.InternalAdvisorModel.findOne({ email });
    console.log(user);
    if (!user) throw new NotFoundException("Email or User name doesn't exists");
    console.log(user.password);
    const [storedHash, salt] = user.password.split('.');
    console.log('stored hash: ' + storedHash, 'Salt', salt);
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash == hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('Invalid Credentials');
    }
  }
  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
