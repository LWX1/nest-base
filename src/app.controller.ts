import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './pages/auth/auth.service';
import { Public } from './common/filterAuthDecorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Public()
  @Get("/hello")
  async hello(req) {
    console.log(req, 444);
    return this.appService.getHello();
  }
  
}
