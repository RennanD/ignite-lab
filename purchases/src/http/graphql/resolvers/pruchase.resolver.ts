import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { Purchase } from '../models/purchase';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Product } from '../models/product';
import { ProductsService } from '../../../services/products.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  async purschases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.productId);
  }
}
