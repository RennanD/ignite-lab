import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateEnrollmentData {
  courseId: string;
  studentId: string;
}

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

  async listAllEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId, canceldAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCourseAndStudentId(courseId: string, studentId: string) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, canceldAt: null },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentData) {
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }
}
