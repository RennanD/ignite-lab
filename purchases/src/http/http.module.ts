import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestControllerController } from 'src/test-controller/test-controller.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TestControllerController],
})
export class HttpModule {}
