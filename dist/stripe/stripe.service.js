"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stripe_1 = require("stripe");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
let StripeService = class StripeService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
        this.stripe = new stripe_1.Stripe(process.env.STRIPE_API_KEY, {
            apiVersion: '2020-08-27',
            typescript: true,
        });
    }
    async createPaymentIntent(products) {
        const amount = products.reduce((acc, val) => {
            return acc + val.price * 100;
        }, 0);
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount,
            currency: 'USD',
        });
        const order = this.ordersRepository.create({
            payment_intent_id: paymentIntent.id,
            amount,
            status: paymentIntent.status,
        });
        await this.ordersRepository.save(order);
        console.log(order);
        return {
            clientSecret: paymentIntent.client_secret,
        };
    }
    async updatePaymentIntent(payment_intent_id, payload) {
        const paymentIntent = await this.ordersRepository.findOne({
            where: { payment_intent_id },
        });
        await this.ordersRepository.save(Object.assign(Object.assign({}, paymentIntent), { status: payload.status }));
        return true;
    }
};
StripeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(orders_entity_1.Orders)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map