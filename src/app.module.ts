import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserServiceService } from './user-service/user-service.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserServiceService, UserService],
})
export class AppModule {}
