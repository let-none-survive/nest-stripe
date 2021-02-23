import { Product } from './product.entity';
import { ProductService } from './product.service';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(): Promise<Product[]>;
    fetchProducts(): Promise<boolean>;
}
