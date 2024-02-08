import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { CreateUser, UpdateUser } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAllUsers() {
    return this.usersRepository.find();
  }

  async createUser(userPayload: CreateUser) {
    const { role, email, password, phoneNumber, name } = userPayload;

    // hash the password
    const hashed = await bcrypt.hash(password, 10);

    let newUser = this.usersRepository.create({
      role,
      email,
      password: hashed,
      phoneNumber,
      name,
    });

    return await this.usersRepository.save(newUser);
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ userId: id });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async updateUser(id: number, userDetails: UpdateUser) {
    await this.usersRepository.update({ userId: id }, { ...userDetails });
    const updatedUser = await this.findUserById(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID '${id}' not found.`);
    }
    return updatedUser;
  }
}
