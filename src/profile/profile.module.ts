import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/Profile';
import { User } from 'src/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { AwsS3Service } from './services/aws/aws.service';
import { ConfigModule } from '@nestjs/config';
import { Rating } from 'src/entities/Rating';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Profile, User, Rating]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, AwsS3Service],
})
export class ProfileModule {}
