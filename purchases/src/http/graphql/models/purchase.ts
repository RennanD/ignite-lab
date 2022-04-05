import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurschaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurschaseStatus, {
  name: 'PurschaseStatus',
  description: 'Available purchase status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurschaseStatus)
  status: PurschaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;

  customerId: string;
}
