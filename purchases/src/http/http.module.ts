import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';

import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';

import { PurchasesResolver } from './graphql/resolvers/pruchase.resolver';
import { ProductResolver } from './graphql/resolvers/product.resolver';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
  providers: [
    ProductResolver,
    PurchasesResolver,
    CustomerResolver,

    // Services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
