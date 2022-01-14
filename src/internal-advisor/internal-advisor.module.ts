import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvisorFormSchema } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisorSchema } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { FormSchema } from 'src/Models/Student/form.model';
import { StudentSchema } from 'src/Models/Student/student.model';
import { UserSchema } from 'src/Models/users.model';
import { AuthorizationServiceAdvisor } from './authorization.service';
import { InternalAdvisorController } from './internal-advisor.controller';
import { InternalAdvisorService } from './internal-advisor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'formdatas', schema: FormSchema, collection: 'formdatas' },
      {
        name: 'InternalAdvisor',
        schema: InternalAdvisorSchema,
        collection: 'internalAdvisor',
      },
      {
        name: 'AdvisorForm',
        schema: AdvisorFormSchema,
        collection: 'AdvisorForm',
      },
      {
        name: 'UndergradateStudents',
        schema: StudentSchema,
        collection: 'UndergradateStudents',
      },
    ]),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '40000s' },
    }),
  ],
  controllers: [InternalAdvisorController],
  providers: [InternalAdvisorService, AuthorizationServiceAdvisor],
})
export class InternalAdvisorModule {}
