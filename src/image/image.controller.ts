import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';




@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService
  ) { }

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
    }),
  }))
  @Post("/upload/:id")
  uploadImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.imageService.uploadImage(Number(id), file, body);
  }

  @Get("get-all-image")
  getImage() {
    return this.imageService.getImage();
  }

  @Get('get-image/:id')
  getImagebyId(@Param('id') id: string) {
    return this.imageService.getImagebyId(Number(id));
  }

  @Get('get-image-name/:name')
  getImagebyName(@Param('name') name: string) {
    return this.imageService.getImagebyName(name);
  }



  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
    }),
  }))
  @Put('update-image/:id')
  updateImage(@Param('id') id: string, @Body() body, @UploadedFile() file: Express.Multer.File) {
    return this.imageService.updateImage(Number(id), body, file);
  }

  @Delete('delete-image/:id')
  removeImage(@Param('id') id: string) {
    return this.imageService.removeImage(Number(id));
  }
}
