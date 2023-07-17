import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';




@ApiTags("image")
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService
  ) { }
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
    }),
  }))
  @Post("upload/:id")
  uploadImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return this.imageService.uploadImage(Number(id), file, body);
  }

  @Get("get-all-image")
  getImage() {
    return this.imageService.getImage();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('get-image/:id')
  getImagebyId(@Param('id') id: string) {
    return this.imageService.getImagebyId(Number(id));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('get-image-by-user/:id')
  getImagebyUserid(@Param('id') id: string) {
    return this.imageService.getImagebyUserid(Number(id));
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('get-Simage-by-user/:id')
  getSaveImagebyUserid(@Param('id') id: string) {
    return this.imageService.getSaveImagebyUserid(Number(id));
  }


  @UseGuards(AuthGuard("jwt"))
  @Get('get-image-name/:name')
  getImagebyName(@Param('name') name: string) {
    return this.imageService.getImagebyName(name);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('get-save-image/:idImage/:idUser')
  getSaveImage(@Param('idImage') idImage: string, @Param('idUser') idUser: string) {
    return this.imageService.getSaveImage(+idImage, +idUser);
  }

  @UseGuards(AuthGuard("jwt"))
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

  @UseGuards(AuthGuard("jwt"))
  @Delete('delete-image/:id')
  removeImage(@Param('id') id: string) {
    return this.imageService.removeImage(Number(id));
  }
}

