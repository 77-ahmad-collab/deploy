import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalSchema } from 'src/Models/External/Externel.Model';
import { FormSchema } from 'src/Models/Student/form.model';
import { StudentSchema } from 'src/Models/Student/student.model';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';

@Module({
  imports: [
    MongooseModule.forFeature([
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
    ]),
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '190000s' },
    }),
  ],
  controllers: [ExternalController],
  providers: [ExternalService],
})
export class ExternalModule {}
