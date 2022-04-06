import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  async listAllStudents() {
    return this.prisma.student.findMany();
  }

  async findStudentAuthUser(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async findStudentByID(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async create(authUserId: string) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
