import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async generateToken(payload) {
    return await this.jwtService.signAsync(payload);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { userId: user.userId, role: user.role };

    const token = await this.generateToken(payload);

    return { ...user, accessToken: token };
  }
}
