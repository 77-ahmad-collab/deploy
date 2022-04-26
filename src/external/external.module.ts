import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalSchema } from 'src/Models/External/Externel.Model';
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
