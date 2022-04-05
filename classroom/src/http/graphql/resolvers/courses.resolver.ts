import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesSerivice: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesSerivice.listAllCourses();
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  crateCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesSerivice.createCourse({ title: data.title });
  }
}
