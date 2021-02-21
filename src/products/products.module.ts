import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductService],
  imports: [TypeOrmModule.forFeature([Product]), HttpModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
