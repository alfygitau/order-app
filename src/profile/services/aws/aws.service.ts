import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service {
  constructor(private readonly configService: ConfigService) {}

  async uploadProfilePicture(
    file: Express.Multer.File,
    profileId: number,
  ): Promise<string> {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
    console.log(file);
    const uploadOptions: S3.Types.PutObjectRequest = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `profile-pictures/${profileId}_${file?.originalname}`,
      Body: file?.buffer,
    };

    const uploadedFile = await s3.upload(uploadOptions).promise();

    return uploadedFile.Location;
  }
}
