import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './graphql/resolvers/product.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from '../services/products.service';
import { PurchasesResolver } from './graphql/resolvers/pruchase.resolver';
import { PurchasesService } from '../services/purchases.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    ProductResolver,
    PurchasesResolver,
    ProductsService,
    PurchasesService,
  ],
})
export class HttpModule {}
