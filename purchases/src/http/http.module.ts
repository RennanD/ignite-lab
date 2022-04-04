import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { TestControllerController } from '../test-controller/test-controller.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [TestControllerController],
})
export class HttpModule {}
