import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Post('/fetch')
  @HttpCode(HttpStatus.OK)
  fetchProducts(): Promise<boolean> {
    return this.productService.fetchProducts();
  }
}
