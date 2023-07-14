import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { nguoi_dung } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';


@Controller('/user')
// @UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/get-all-user")
  getUser() {
    return this.userService.getUser();
  }
  @Put("/update-user/:id")
  updateUser(@Param("id") id: string, @Body() body: any) {
    return this.userService.updateUser(Number(id), body);
  }

}
