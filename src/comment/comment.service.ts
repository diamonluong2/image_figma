import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();
  async createComment(body: any) {
    try {
      const time = new Date();
      const image = await this.prisma.binh_luan.create({
        data: {
          nguoi_dung_id: +body.nguoi_dung_id,
          hinh_id: +body.hinh_id,
          noi_dung: body.noi_dung,
          ngay_binh_luan: time,
        }
      });
      const responseContent = { message: "Comment thành công" }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);

    }




  }

  async getComment() {
    try {
      const comment = await this.prisma.binh_luan.findMany();
      const responseContent = { message: "Lấy danh sách comment thành công", content: { data: comment } }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  async getCommentbyIdImage(id: number) {
    try {
      const image = await this.prisma.binh_luan.findMany({
        where: { hinh_id: id }
      });
      if (!image) {
        throw new HttpException('Không tìm thấy bình luận', 400);
      }
      const responseContent = { message: "Lấy danh sách bình luận thành công", content: { data: image } }
      return responseContent;
    } catch (error) {
      throw new HttpException('Lỗi BE', 500);
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
