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
import { Rating } from 'src/entities/Rating';
import { Profile } from 'src/entities/Profile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async findAllUsers(role) {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'orders')
      .leftJoinAndSelect('user.ratings', 'ratings')
      .leftJoinAndSelect('user.profile', 'profile')
      .addGroupBy('user.userId')
      .addSelect('COUNT(orders.order_id)', 'orderCount')
      .addSelect('AVG(ratings.value)', 'averageRating');

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    const usersWithCountAndRatings = await queryBuilder.getRawMany();

    return usersWithCountAndRatings.map((userWithCountAndRatings) => {
      const user = new User();
      Object.assign(user, {
        userId: userWithCountAndRatings.user_userId,
        role: userWithCountAndRatings.user_role,
        name: userWithCountAndRatings.user_name,
        email: userWithCountAndRatings.user_email,
        password: userWithCountAndRatings.user_password,
        phoneNumber: userWithCountAndRatings.user_phoneNumber,
        created_at: userWithCountAndRatings.user_created_at,
        updated_at: userWithCountAndRatings.user_updated_at,
        averageRating: parseFloat(userWithCountAndRatings.averageRating) || 0,
        orderCount: parseInt(userWithCountAndRatings.orderCount, 10) || 0,
        profile: userWithCountAndRatings.profile
          ? userWithCountAndRatings.profile
          : null,
      });

      return user;
    });
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
    const user = await this.usersRepository.findOne({
      where: { userId: id },
      relations: ['profile'],
    });

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

  async addRating(
    userId: number,
    value: number,
    comments: string,
  ): Promise<Rating> {
    const user = await this.usersRepository.findOne({ where: { userId } });
    const newRating = this.ratingRepository.create({
      value,
      comments,
      user,
    });
    return this.ratingRepository.save(newRating);
  }
}
