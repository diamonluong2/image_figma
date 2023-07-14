import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("/login")
  login(@Body() body) {

    return this.authService.login(body);
  }

  @Post("/sign-up")
  signUp(@Body() body) {

    return this.authService.signUp(body);

  }
}
// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt