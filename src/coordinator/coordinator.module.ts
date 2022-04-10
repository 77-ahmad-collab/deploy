import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CoordinatorSchema } from 'src/Models/Coordinator/Coordinator.Model';
import { EvaluationSchema } from 'src/Models/Evaluation/Evaluation.Model';
import { FormSchema } from 'src/Models/Student/form.model';
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
        name: 'Evaluation',
        schema: EvaluationSchema,
        collection: 'Evaluation',
      },
      { name: 'formdatas', schema: FormSchema, collection: 'formdatas' },
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
