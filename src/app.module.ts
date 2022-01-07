import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './users.model';
import { JwtModule} from '@nestjs/jwt';
// import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'test', schema: UserSchema }]),

    ConfigModule.forRoot(),

    MongooseModule.forRoot(
      'mongodb+srv://fypportal:ahmed123@cluster0.yvupc.mongodb.net/FYPTESTV1?retryWrites=true&w=majority',
    ),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
