import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [StripeController],
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [StripeService],
})
export class StripeModule {}
