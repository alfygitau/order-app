import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Profile } from 'src/entities/Profile';
import { User, UserRole } from 'src/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateProfile, SerializedUser } from 'src/utils/types';
import { In, Repository } from 'typeorm';
import { AwsS3Service } from '../aws/aws.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(AwsS3Service)
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async createProfile(userId: number, profilePayload: CreateProfile) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let userWithoutPassword = plainToClass(SerializedUser, user);

    const newProfile = await this.profileRepository.create({
      ...profilePayload,
      user: userWithoutPassword,
    });
    return this.profileRepository.save(newProfile);
  }

  async findAllProfiles() {
    return await this.profileRepository.find();
  }

  async getUserProfile(userId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { user: { userId } },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async getAdminProfiles(): Promise<Profile[]> {
    const adminUsers = await this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });

    const adminUserIds = adminUsers.map((user) => user.userId);
    const adminProfiles = await this.profileRepository.find({
      where: { user: { userId: In(adminUserIds) } },
    });
    return adminProfiles;
  }

  async getAllWritersProfiles(): Promise<Profile[]> {
    const writerUsers = await this.userRepository.find({
      where: { role: UserRole.WRITER },
    });

    const writerUserIds = writerUsers.map((user) => user.userId);
    const writerPrifiles = await this.profileRepository.find({
      where: { user: { userId: In(writerUserIds) } },
    });
    return writerPrifiles;
  }

  async uploadProfilePicture(file: Express.Multer.File, userId: number) {
    const profileUrl = await this.awsS3Service.uploadProfilePicture(
      file,
      userId,
    );

    const userProfile = await this.getUserProfile(userId);

    userProfile.profilePicture = profileUrl;

    // Save the profile to the database
    return this.profileRepository.save(userProfile);
  }
}
