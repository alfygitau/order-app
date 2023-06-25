import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LoginUser } from 'src/auth/dtos/LoginUser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { SerializedUser } from 'src/utils/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: LoginUser) {
    const user = this.authService.signIn(
      credentials.email,
      credentials.password,
    );

    return plainToClass(SerializedUser, user);
  }
}
