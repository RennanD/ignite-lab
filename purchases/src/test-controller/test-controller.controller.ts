import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller('test-controller')
export class TestControllerController {
  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'ok';
  }
}
