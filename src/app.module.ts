import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration'

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    StripeModule,
    ConfigModule.forRoot({
      load:[configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
