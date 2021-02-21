import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stripe } from 'stripe';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Orders } from './orders.entity';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  private readonly stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
  });

  public async createPaymentIntent(products: Product[]): Promise<any> {
    const amount = products.reduce((acc, val) => {
      return acc + val.price * 100;
    }, 0);

    const paymentIntent: Stripe.PaymentIntent = await this.stripe.paymentIntents.create(
      {
        amount,
        currency: 'USD',
      },
    );

    const order: Orders = this.ordersRepository.create({
      payment_intent_id: paymentIntent.id,
      amount,
      status: paymentIntent.status,
    });

    await this.ordersRepository.save(order);

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  public async updatePaymentIntent(
    payment_intent_id: string,
    payload: Stripe.PaymentIntent,
  ): Promise<boolean> {
    const paymentIntent = await this.ordersRepository.findOne({
      where: { payment_intent_id },
    });
    await this.ordersRepository.save({
      ...paymentIntent,
      status: payload.status,
    });
    return true;
  }
}
