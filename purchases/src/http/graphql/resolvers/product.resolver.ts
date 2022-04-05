// import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { Product } from '../models/Product';

// import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { ProductsService } from '../../../services/products.service';

@Resolver('test')
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  async products() {
    return this.productsService.listAllProducts();
  }
}
