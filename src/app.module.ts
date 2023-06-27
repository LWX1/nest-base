import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './pages/auth/auth.module';
import { UsersService } from './pages/users/users.service';
import { UsersModule } from './pages/users/users.module';
import { AuthController } from './pages/auth/auth.controller';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, UsersService],
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
