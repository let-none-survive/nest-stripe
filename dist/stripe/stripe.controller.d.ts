import { Product } from '../products/product.entity';
import { StripeService } from './stripe.service';
import { Stripe } from 'stripe';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createPaymentIntent(products: Product[]): Promise<any>;
    updatePaymentIntent(params: {
        payment_intent_id: string;
    }, payload: Stripe.PaymentIntent): Promise<boolean>;
}
