import { Stripe } from 'stripe';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Orders } from './orders.entity';
export declare class StripeService {
    private readonly ordersRepository;
    constructor(ordersRepository: Repository<Orders>);
    private readonly stripe;
    createPaymentIntent(products: Product[]): Promise<any>;
    updatePaymentIntent(payment_intent_id: string, payload: Stripe.PaymentIntent): Promise<boolean>;
}
