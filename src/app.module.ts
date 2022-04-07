import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InfoSchema, UserSchema } from './Models/users.model';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthorizationModule } from './authorization/authorization.module';
import { ProposalScehma } from './Models/Student/proposal.modal';
import { FormSchema } from './Models/Student/form.model';
import { InternalAdvisorModule } from './internal-advisor/internal-advisor.module';
import { InternalAdvisorSchema } from './Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { StudentSchema } from './Models/Student/student.model';
import { AttendanceSchema } from './Models/Student/attendance.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'test', schema: UserSchema, collection: 'test' },
      {
        name: 'UndergradateStudents',
        schema: StudentSchema,
        collection: 'UndergradateStudents',
      },
      { name: 'proposals', schema: ProposalScehma, collection: 'proposals' },
      { name: 'formdatas', schema: FormSchema, collection: 'formdatas' },
      {
        name: 'InternalAdvisor',
        schema: InternalAdvisorSchema,
        collection: 'internalAdvisor',
      },
      {
        name: 'attendance',
        schema: AttendanceSchema,
        collection: 'attendance',
      },
    ]),

    ConfigModule.forRoot(),

    MongooseModule.forRoot(
      // 'mongodb+srv://fypportal:ahmed123@cluster0.yvupc.mongodb.net/PortalV187?retryWrites=true&w=majority',
      'mongodb+srv://fypportal:ahmed123@cluster0.yvupc.mongodb.net/PortalTEST?retryWrites=true&w=majority',
    ),

    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '40000s' },
    }),
    AuthorizationModule,
    InternalAdvisorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
