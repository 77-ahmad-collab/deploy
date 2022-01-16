import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdvisorFormSchema } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisorSchema } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { FormSchema } from 'src/Models/Student/form.model';
import { ProposalScehma } from 'src/Models/Student/proposal.modal';
import { StudentSchema } from 'src/Models/Student/student.model';
import { UserSchema } from 'src/Models/users.model';
import { AuthorizationServiceAdvisor } from './authorization.service';
import { InternalAdvisorController } from './internal-advisor.controller';
import { InternalAdvisorService } from './internal-advisor.service';
import { InternalAdvisorGetData } from './internalAdvisorGetData';

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
      {
        name: 'proposals',
        schema: ProposalScehma,
        collection: 'proposals',
      },
    ]),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '40000s' },
    }),
  ],
  controllers: [InternalAdvisorController],
  providers: [
    InternalAdvisorService,
    AuthorizationServiceAdvisor,
    InternalAdvisorGetData,
  ],
})
export class InternalAdvisorModule {}
