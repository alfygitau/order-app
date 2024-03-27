import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('users')
  async generateUserReport(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<any> {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return await this.reportService.getUserInformation(startDate, endDate);
  }

  @Get('orders')
  async generateOrderReport(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<any> {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return await this.reportService.getOrderInformation(startDate, endDate);
  }

  @Get('totalUsers')
  async getUserCountsByRole() {
    return this.reportService.getUserCountsByRole();
  }

  @Get('totalOrders')
  async getOrdersCount() {
    return this.reportService.getOrdersCounts();
  }
}
