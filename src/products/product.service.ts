import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly httpService: HttpService,
    private readonly connection: Connection,
  ) {}

  public getAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async fetchProducts(): Promise<boolean> {
    const { name } = this.connection.getMetadata(Product);
    await this.productsRepository.query(`TRUNCATE TABLE ${name};`);
    const { data } = await this.httpService
      .get<ProductDto[]>('https://fakestoreapi.com/products')
      .toPromise();
    for (const product of data) {
      const createdProduct = this.productsRepository.create(product);
      await this.productsRepository.save(createdProduct);
    }
    return true;
  }
}
