import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionFile } from 'src/entities/Revision-files';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { OrderService } from 'src/order/services/order/order.service';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionFilesService {
  constructor(
    @InjectRepository(RevisionFile)
    private readonly revisionFileRepository: Repository<RevisionFile>,

    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(AwsService) private readonly awsService: AwsService,
  ) {}

  async uploadRevisionFiles(orderId: number, files: Express.Multer.File[]) {
    let urls = await this.awsService.uploadOrderFiles(files);
    const order = await this.orderService.getOrderById(orderId);
    const uploadedFiles = [];

    for (let url of urls) {
      let revisionFile = new RevisionFile();
      revisionFile.order = order;
      revisionFile.fileUrl = url;

      const savedRevisionFiles = await this.revisionFileRepository.save(
        revisionFile,
      );
      uploadedFiles.push(savedRevisionFiles)
    }

    const revisionFileWithUrls = {
        fileId: uploadedFiles[0].fileId,
        order: uploadedFiles[0].order,
        fileUrls: uploadedFiles.map((file) => file.fileUrl),
      };
  
      return revisionFileWithUrls;
  }
}
