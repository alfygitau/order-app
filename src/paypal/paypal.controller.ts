import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('payment')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create')
  async createPayment(@Body() paymentData: any): Promise<any> {
    try {
      const payment = await this.paypalService.createPayment(paymentData);
      return { success: true, payment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  @Post('execute/:paymentId/:payerId')
  async executePayment(
    @Param('paymentId') paymentId: string,
    @Param('payerId') payerId: string,
  ): Promise<any> {
    try {
      const executedPayment = await this.paypalService.executePayment(
        paymentId,
        payerId,
      );
      return { success: true, executedPayment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('capture/:transactionId/:amount')
  async capturePayment(
    @Param('transactionId') transactionId: string,
    @Param('amount') amount: number,
  ): Promise<any> {
    try {
      const capture = await this.paypalService.capturePayment(
        transactionId,
        amount,
      );
      return { success: true, capture };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
