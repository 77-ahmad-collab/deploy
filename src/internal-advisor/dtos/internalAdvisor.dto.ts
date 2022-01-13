import { IsString, IsEmail, IsNumber } from 'class-validator';

export class InternalAdvisorDto {
  @IsString()
  name: string;
  @IsString()
  contact: string;
  @IsString()
  password: string;
  @IsString()
  designation: string;
  @IsEmail()
  email: string;
  @IsNumber()
  id: number;
}
