import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/requests/product.dto';
import { IdRequestDto } from '../../common/dto/id.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() { limit, offset }: PaginationDto) {
    return this.productService.getAll(limit, offset);
  }
  @Post()
  async createProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Get('/:id')
  async getSingleProduct(@Param() { id: productId }: IdRequestDto) {
    return this.productService.getSingleProduct(productId);
  }
  @Put('/:id')
  async updateProduct(
    @Param() { id: productId }: IdRequestDto,
    @Body() productDto: ProductDto,
  ) {
    return this.productService.updateProduct(productId, productDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param() { id: productId }: IdRequestDto) {
    await this.productService.deleteProduct(productId);
  }
}
