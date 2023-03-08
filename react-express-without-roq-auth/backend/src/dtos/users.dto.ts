import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password?: string;
  @IsString()
  public roqUserId?: string;
  @IsString()
  public type?: string;
}
