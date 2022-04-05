import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCourseData {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async listAllCourses() {
    return this.prisma.course.findMany();
  }

  async findCourseByID(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createCourse({ title }: CreateCourseData) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
