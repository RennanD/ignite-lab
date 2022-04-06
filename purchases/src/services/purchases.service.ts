import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';
interface CreatePurchaseData {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private kafka: KafkaService, private prisma: PrismaService) {}

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseData) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customer: { connect: { id: customerId } },
        product: { connect: { id: productId } },
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
