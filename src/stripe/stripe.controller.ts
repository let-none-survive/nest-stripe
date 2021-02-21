import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Product } from '../products/product.entity';
import { StripeService } from './stripe.service';
import { Stripe } from 'stripe';

@Controller('/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('/create-payment-intent')
  public async createPaymentIntent(
    @Body('products') products: Product[],
  ): Promise<any> {
    return this.stripeService.createPaymentIntent(products);
  }

  @Put('/update-payment-intent/:payment_intent_id')
  public async updatePaymentIntent(
    @Param() params: { payment_intent_id: string },
    @Body('payload') payload: Stripe.PaymentIntent,
  ): Promise<boolean> {
    return this.stripeService.updatePaymentIntent(
      params.payment_intent_id,
      payload,
    );
  }
}
