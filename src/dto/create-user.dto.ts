 import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

    export class CreateUserDto {
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      name: string;

      @IsNotEmpty()
      @IsEmail()
      email: string;
    }