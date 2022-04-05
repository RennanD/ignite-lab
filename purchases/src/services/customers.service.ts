import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerData {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findFirst({
      where: { authUserId },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerData) {
    const existentCustomer = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (existentCustomer) {
      throw new Error('Customer Already exists');
    }

    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
