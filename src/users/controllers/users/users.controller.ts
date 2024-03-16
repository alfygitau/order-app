import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AdminAuthGuard } from 'src/auth/guards/admin-access/admin-access.guard';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUser } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/utils/types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getUsers(@Query('role') role?: string) {
    const users = this.userService.findAllUsers(role);
    return plainToClass(SerializedUser, users);
  }

  @Post('register')
  registerUser(@Body() userPayload: CreateUserDto) {
    const user = this.userService.createUser(userPayload);
    return plainToClass(SerializedUser, user);
  }

  // @UseGuards(AdminAuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findUserById(id);

    return plainToClass(SerializedUser, user);
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() userDetails: UpdateUser) {
    const user = this.userService.updateUser(id, userDetails);
    return plainToClass(SerializedUser, user);
  }

  @Post(':userId/add-user-rating')
  addUserRating(
    @Param('userId') userId: number,
    @Body('value') value: number,
    @Body('comments') comments: string,
  ) {
    return this.userService.addRating(userId, value, comments);
  }
}
