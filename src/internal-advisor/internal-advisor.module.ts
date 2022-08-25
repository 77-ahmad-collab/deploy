import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationSchema } from 'src/Models/Evaluation/Evaluation.Model';
import { EvaluationMarksSchema } from 'src/Models/Evaluation/EvaluationMarks.model';
import { FinalEvaluationSchema } from 'src/Models/Evaluation/FinalEvaluation.model';
import { FinalEvaluationMarksSchema } from 'src/Models/Evaluation/FinalEvaluationMarks.model';
import { MarksSchema } from 'src/Models/Evaluation/Marks.model';
import { ReportEvaluationMarksSchema } from 'src/Models/Evaluation/ReportEvaluationMarks.model';
import { ExternalSchema } from 'src/Models/External/Externel.Model';
import { AdvisorFormSchema } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisorSchema } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { AttendanceSchema } from 'src/Models/Student/attendance.model';
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
      {
        name: 'attendance',
        schema: AttendanceSchema,
        collection: 'attendance',
      },
      {
        name: 'Marks',
        schema: MarksSchema,
        collection: 'Marks',
      },
      {
        name: 'EvaluationMarks',
        schema: EvaluationMarksSchema,
        collection: 'EvaluationMarks',
      },
      {
        name: 'FinalEvaluationMarks',
        schema: FinalEvaluationMarksSchema,
        collection: 'FinalEvaluationMarks',
      },
      {
        name: 'ReportEvaluationMarks',
        schema: ReportEvaluationMarksSchema,
        collection: 'ReportEvaluationMarks',
      },
      {
        name: 'External',
        schema: ExternalSchema,
        collection: 'External',
      },
      {
        name: 'Evaluation',
        schema: EvaluationSchema,
        collection: 'Evaluation',
      },
      {
        name: 'FinalEvaluation',
        schema: FinalEvaluationSchema,
        collection: 'FinalEvaluation',
      },
    ]),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '190000s' },
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
