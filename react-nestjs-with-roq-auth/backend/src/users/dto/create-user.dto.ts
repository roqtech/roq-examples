// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(65)
  @ApiProperty()
  @ApiProperty({ required: false })
  first_name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(65)
  @ApiProperty()
  @ApiProperty({ required: false })
  last_name?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: true })
  password: string;
}
