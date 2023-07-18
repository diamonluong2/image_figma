import { Controller, Get, Post, Body, Patch, Headers, Param, Delete, UseInterceptors, UploadedFile, Put, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';


class bodyType {
  @ApiProperty({ description: "ten_hinh", type: String })
  ten_hinh: string;

  @ApiProperty({ description: "duong_dan", type: String })
  duong_dan: string;

  @ApiProperty({ description: "mo_ta", type: String })
  mo_ta: string;

  @ApiProperty({ description: "nguoi_dung_id", type: String })
  nguoi_dung_id: string;

}

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ description: "ten_hinh", type: String })
  ten_hinh: string;

  @ApiProperty({ description: "mo_ta", type: String })
  mo_ta: string;
}

@ApiBearerAuth()
@ApiTags("image")
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService
  ) { }

  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
    }),
  }))
  @Post("upload/:id")
  uploadImage(@Headers("Authorization") token: string, @Param("id") id: string, @UploadedFile() file: Express.Multer.File, @Body() body: FileUploadDto) {
    return this.imageService.uploadImage(Number(id), file, body);
  }

  @Get("get-all-image")
  getImage() {
    return this.imageService.getImage();
  }

  @ApiHeader({ name: "Authorization" })
  @UseGuards(AuthGuard("jwt"))
  @Get('get-image/:id')
  getImagebyId(@Headers("Authorization") token: string, @Param('id') id: string) {
    return this.imageService.getImagebyId(Number(id));
  }

  @ApiHeader({ name: "Authorization" })
  @UseGuards(AuthGuard("jwt"))
  @Get('get-image-by-user/:id')
  getImagebyUserid(@Headers("Authorization") token: string, @Param('id') id: string) {
    return this.imageService.getImagebyUserid(Number(id));
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @Get('get-Simage-by-user/:id')
  getSaveImagebyUserid(@Headers("Authorization") token: string, @Param('id') id: string) {
    return this.imageService.getSaveImagebyUserid(Number(id));
  }


  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @Get('get-image-name/:name')
  getImagebyName(@Headers("Authorization") token: string, @Param('name') name: string) {
    return this.imageService.getImagebyName(name);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @Get('get-save-image/:idImage/:idUser')
  getSaveImage(@Headers("Authorization") token: string, @Param('idImage') idImage: string, @Param('idUser') idUser: string) {
    return this.imageService.getSaveImage(+idImage, +idUser);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
    }),
  }))
  @Put('update-image/:id')
  updateImage(@Headers("Authorization") token: string, @Param('id') id: string, @Body() body, @UploadedFile() file: Express.Multer.File) {
    return this.imageService.updateImage(Number(id), body, file);
  }

  @UseGuards(AuthGuard("jwt"))
  @ApiHeader({ name: "Authorization" })
  @Delete('delete-image/:id')
  removeImage(@Headers("Authorization") token: string, @Param('id') id: string) {
    return this.imageService.removeImage(Number(id));
  }
}

