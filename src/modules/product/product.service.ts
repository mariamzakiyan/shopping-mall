import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import { IProductData } from './types/product.type';
import { ErrorMessage } from '../../common/constants/errorMessage';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAll(limit: number, offset: number) {
    return this.productRepository.findAll(limit, offset);
  }
  async createProduct(data: IProductData) {
    const { sku } = data;
    const productBySku = await this.productRepository.findBySku(sku);

    if (productBySku) {
      throw new ConflictException(ErrorMessage.NOT_UNIQUE_SKU);
    }
    return this.productRepository.createProduct(data);
  }

  async updateProduct(id: number, data: IProductData) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
    }

    const { sku } = data;
    const productBySku = await this.productRepository.findBySku(sku);

    if (productBySku && productBySku.id !== product.id) {
      throw new ConflictException(ErrorMessage.NOT_UNIQUE_SKU);
    }

    await this.productRepository.updateProduct(id, data);
    return this.productRepository.findById(id);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
    }

    await this.productRepository.deleteById(id);
  }

  async getSingleProduct(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);
    }

    return this.productRepository.getSingleProductWithCategory(id);
  }
}
