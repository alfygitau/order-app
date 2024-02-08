import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/entities/User';

export class CreateUserDto {
  @IsNotEmpty()
  role: UserRole;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNumber: string;
}
