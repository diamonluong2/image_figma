import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';


class signUpType {
  @ApiProperty({ description: "email", type: String })
  email: string;

  @ApiProperty({ description: "mat_khau", type: String })
  mat_khau: string;

  @ApiProperty({ description: "ho_ten", type: String })
  ho_ten: string;

  @ApiProperty({ description: "tuoi", type: Number })
  tuoi: number;

  @ApiProperty({ description: "anh_dai_dien", type: String })
  anh_dai_dien: string;
}

class loginType {
  @ApiProperty({ description: "email", type: String })
  email: string;

  @ApiProperty({ description: "mat_khau", type: String })
  mat_khau: string;

}


@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("/login")
  login(@Body() body: loginType) {

    return this.authService.login(body);
  }

  @Post("/sign-up")
  signUp(@Body() body: signUpType) {

    return this.authService.signUp(body);

  }
}
// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt