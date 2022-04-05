import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
interface CreatePurchaseData {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseData) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.prisma.purchase.create({
      data: {
        customer: { connect: { id: customerId } },
        product: { connect: { id: productId } },
      },
    });
  }
}
