// paypal.module.ts
import { Module, Global } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import * as paypal from 'paypal-rest-sdk';
import { PaypalController } from './paypal.controller';

@Global()
@Module({
  providers: [
    {
      provide: 'PAYPAL_CONFIG',
      useFactory: () => {
        const clientId =
          'AQOWMSX8jDRPTHmZzTVO-L42fwtTqXdnwYYmtTLezeWxm5AmmBQ8b4HbuNDkJVQtlKXQNHXOnF56iMYP';
        const clientSecret =
          'EEVveus_lWBxDGwvoSzF6pkRBXAWpqatTHcterPrUCXlHCrNxUl4cEB9vHVorWtTNypkxDwWq6FeTgCd';

        if (!clientId || !clientSecret) {
          throw new Error('PayPal client ID or secret not provided');
        }
        paypal.configure({
          mode: 'sandbox',
          client_id: clientId,
          client_secret: clientSecret,
        });

        return { clientId, clientSecret };
      },
    },
    PaypalService,
  ],
  exports: ['PAYPAL_CONFIG'],
  controllers: [PaypalController],
})
export class PaypalModule {}
