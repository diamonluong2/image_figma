import { HttpException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();
  async uploadImage(id: number, file: Express.Multer.File, body: any) {
    try {
      const userUpload = await this.prisma.nguoi_dung.findFirst({ where: { nguoi_dung_id: id } });
      if (!userUpload) {
        throw new HttpException('Không tìm thấy user', 400);
      }
      const image = await this.prisma.hinh_anh.create({
        data: {
          ten_hinh: body.ten_hinh,
          duong_dan: file.filename,
          mo_ta: body.mo_ta,
          nguoi_dung_id: id,
        }
      });
      const responseContent = { message: "Upload hình ảnh thành công" }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);

    }
  }

  async getImage() {
    try {
      const image = await this.prisma.hinh_anh.findMany();
      const responseContent = { message: "Lấy danh sách hình ảnh thành công", content: { data: image } }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  async getImagebyId(id: number) {
    try {
      const image = await this.prisma.hinh_anh.findMany({
        include: { nguoi_dung: true },
        where: { hinh_id: id }
      });
      if (!image) {
        throw new HttpException('Không tìm thấy hình ảnh', 400);
      }
      const responseContent = { message: "Lấy danh sách hình ảnh thành công", content: { data: image } }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  async getImagebyName(name: string) {
    try {
      const image = await this.prisma.hinh_anh.findMany({
        where: {
          ten_hinh: {
            contains: name,
          }
        }
      });
      if (!image) {
        throw new HttpException('Không tìm thấy tên hình', 400);
      }
      const responseContent = { message: "Lấy danh sách hình ảnh thành công", content: { data: image } }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }




  async updateImage(id: number, body: any, file: Express.Multer.File) {
    try {
      const userUpload = await this.prisma.hinh_anh.findFirst({ where: { hinh_id: id } });
      if (!userUpload) {
        throw new HttpException('Không tìm thấy user', 400);
      }
      userUpload.ten_hinh = body.ten_hinh;
      userUpload.duong_dan = file.filename;
      userUpload.mo_ta = body.mo_ta;

      const image = await this.prisma.hinh_anh.update({
        data: userUpload,
        where: {
          hinh_id: id
        }
      });
      return { message: "Cập nhật thành công" };
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  async removeImage(id: number) {
    try {
      const image = await this.prisma.hinh_anh.findFirst({ where: { hinh_id: id } });
      if (!image) {
        throw new HttpException('Không tìm thấy hình ảnh', 400);
      }
      const deleteImage = await this.prisma.hinh_anh.delete({
        where: {
          hinh_id: id
        }
      })
      const responseContent = { message: "Xóa hình ảnh thành công" }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }
}
