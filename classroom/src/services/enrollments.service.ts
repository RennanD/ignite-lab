import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceldAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
