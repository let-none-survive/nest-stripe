import { HttpService } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private readonly productsRepository;
    private readonly httpService;
    private readonly connection;
    constructor(productsRepository: Repository<Product>, httpService: HttpService, connection: Connection);
    getAll(): Promise<Product[]>;
    fetchProducts(): Promise<boolean>;
}
