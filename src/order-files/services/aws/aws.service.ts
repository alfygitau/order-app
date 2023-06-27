import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private readonly configService: ConfigService) {}

  async uploadOrderFiles(files: Express.Multer.File[]): Promise<string[]> {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });

    const uploadPromises = files.map(file => this.uploadOrderFile(s3, file));
    const fileUrls = await Promise.all(uploadPromises);
    return fileUrls;
  }

  private uploadOrderFile(s3: S3, file: Express.Multer.File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadOptions: S3.PutObjectRequest = {
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: `order-files/${file.originalname}`,
        Body: file.buffer,
      };

      s3.upload(uploadOptions, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }

  
}
