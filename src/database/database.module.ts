import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { Orders } from '../stripe/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      entities: [Product, Orders],
      database: 'database',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
