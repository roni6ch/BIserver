import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post('registerUser')
    async registerUser(@Body('username') username: string,@Body('password') password: string) {
      const token = await this.authService.registerUser(username,password);
      return token;
    }

    @Post('validateUser')
    async validateUser(@Body('username') username: string,@Body('password') password: string) {
      const result = await this.authService.validateUser(username,password);
      return result;
    }
  
}
