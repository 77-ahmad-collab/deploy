import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CoordinatorSchema } from 'src/Models/Coordinator/Coordinator.Model';
import { EvaluationSchema } from 'src/Models/Evaluation/Evaluation.Model';
import { FinalEvaluationSchema } from 'src/Models/Evaluation/FinalEvaluation.model';
import { MarksSchema } from 'src/Models/Evaluation/Marks.model';
import { ExternalSchema } from 'src/Models/External/Externel.Model';
import { InternalAdvisorSchema } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { FormSchema } from 'src/Models/Student/form.model';
import { StudentSchema } from 'src/Models/Student/student.model';
import { CoordinatorController } from './coordinator.controller';
import { CoordinatorService } from './coordinator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Coordinator',
        schema: CoordinatorSchema,
        collection: 'Coordinator',
      },
      {
        name: 'InternalAdvisor',
        schema: InternalAdvisorSchema,
        collection: 'internalAdvisor',
      },
      {
        name: 'External',
        schema: ExternalSchema,
        collection: 'External',
      },
      {
        name: 'UndergradateStudents',
        schema: StudentSchema,
        collection: 'UndergradateStudents',
      },
      { name: 'formdatas', schema: FormSchema, collection: 'formdatas' },
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
      { name: 'formdatas', schema: FormSchema, collection: 'formdatas' },
      {
        name: 'Marks',
        schema: MarksSchema,
        collection: 'Marks',
      },
    ]),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '190000s' },
    }),
  ],
  controllers: [CoordinatorController],
  providers: [CoordinatorService],
})
export class CoordinatorModule {}
