import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreateProfile } from 'src/profile/dtos/CreateProfile.dto';
import { ProfileService } from 'src/profile/services/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':userId/create')
  createUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userProfile: CreateProfile,
  ) {
    const profile = this.profileService.createProfile(userId, userProfile);
    return profile;
  }

  @Get(':userId')
  getUserProfile(@Param('userId') userId: number) {
    return this.profileService.getUserProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUserProfiles() {
    return this.profileService.findAllProfiles();
  }

  @UseGuards(AuthGuard)
  @Get('/admin/profiles')
  getAllAdminProfiles() {
    return this.profileService.getAdminProfiles();
  }

  @Get('/writer/profiles')
  getAllWritersProfile() {
    return this.profileService.getAllWritersProfiles();
  }

  @Post(':userId/upload-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(
    @Param('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfilePicture(file, userId);
  }
}
