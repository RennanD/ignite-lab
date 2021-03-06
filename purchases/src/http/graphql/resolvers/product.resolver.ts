import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Product } from '../models/product';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
