import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';
import { CustomersService } from '../../../services/customers.service';
import { AuthUser, CurrentUser } from '../../auth/curren-user';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.findAllCustomerId(customer.id);
  }
}
