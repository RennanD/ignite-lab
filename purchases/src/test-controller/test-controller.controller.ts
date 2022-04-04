import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller('test-controller')
export class TestControllerController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  async hello() {
    return this.prisma.customer.findMany();
  }
}
