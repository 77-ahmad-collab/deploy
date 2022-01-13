import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoSchema, UserSchema } from 'src/Models/users.model';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'test', schema: UserSchema }]),

    ConfigModule.forRoot(),

    MongooseModule.forRoot(
      'mongodb+srv://AHMAD:12345#$@cluster0.ysenv.mongodb.net/SECONDDatabase?retryWrites=true&w=majority',
    ),
  ],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
