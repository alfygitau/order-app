import { Injectable, Inject } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class PaypalService {
  constructor(@Inject('PAYPAL_CONFIG') private readonly paypalConfig) {}

  createPayment(paymentData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }
  executePayment(paymentId: string, payerId: string): Promise<any> {
    const executePaymentJson = {
      payer_id: payerId,
    };
    return new Promise((resolve, reject) => {
      paypal.payment.execute(
        paymentId,
        executePaymentJson,
        (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        },
      );
    });
  }
  capturePayment(transactionId: string, amount: number): Promise<any> {
    const captureDetails = {
      amount: {
        currency: 'USD',
        total: amount.toFixed(2),
      },
      is_final_capture: true,
    };
    return new Promise((resolve, reject) => {
      paypal.payment.capture(
        transactionId,
        captureDetails,
        (error, capture) => {
          if (error) {
            reject(error);
          } else {
            resolve(capture);
          }
        },
      );
    });
  }
}
