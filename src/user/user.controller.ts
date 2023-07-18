import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { nguoi_dung } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiProperty, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

class bodyType {
  @ApiProperty({ description: "mat_khau", type: String })
  mat_khau: string;

  @ApiProperty({ description: "ho_ten", type: String })
  ho_ten: string;

  @ApiProperty({ description: "tuoi", type: Number })
  tuoi: number;

  @ApiProperty({ description: "anh_dai_dien", type: String })
  anh_dai_dien: string;

}

@ApiBearerAuth()
@ApiTags("user")
@Controller('/user')
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiHeader({ name: "Authorization" })
  @Get("/get-all-user")
  getUser(@Headers("Authorization") token: string) {
    return this.userService.getUser();
  }

  @ApiHeader({ name: "Authorization" })
  @Put("/update-user/:id")
  updateUser(@Param("id") id: string, @Body() body: bodyType, @Headers("Authorization") token: string) {
    return this.userService.updateUser(Number(id), body);
  }

  @ApiHeader({ name: "Authorization" })
  @Delete("/delete-user/:id")
  deleteUser(@Param("id") id: string, @Headers("Authorization") token: string) {
    return this.userService.deleteUser(Number(id));
  }
}
