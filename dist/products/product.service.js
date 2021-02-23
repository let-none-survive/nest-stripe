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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productsRepository, httpService, connection) {
        this.productsRepository = productsRepository;
        this.httpService = httpService;
        this.connection = connection;
    }
    getAll() {
        return this.productsRepository.find();
    }
    async fetchProducts() {
        const { name } = this.connection.getMetadata(product_entity_1.Product);
        await this.productsRepository.query(`TRUNCATE TABLE ${name};`);
        const { data } = await this.httpService
            .get('https://fakestoreapi.com/products')
            .toPromise();
        for (const product of data) {
            const createdProduct = this.productsRepository.create(product);
            await this.productsRepository.save(createdProduct);
        }
        return true;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.HttpService,
        typeorm_2.Connection])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map