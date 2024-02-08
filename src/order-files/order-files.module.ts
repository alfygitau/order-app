import { Module } from '@nestjs/common';
import { AwsService } from './services/aws/aws.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderFile } from 'src/entities/Order-files';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([OrderFile])],
  providers: [AwsService],
  exports: [AwsService],
})
export class OrderFilesModule {}
