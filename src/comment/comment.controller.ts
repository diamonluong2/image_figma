import { Controller, Get, Post, Body, Headers, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';

class commentType {
  @ApiProperty({ description: "noi_dung", type: String })
  noi_dung: string;

  @ApiProperty({ description: "hinh_id", type: Number })
  hinh_id: number;

  @ApiProperty({ description: "nguoi_dung_id", type: Number })
  nguoi_dung_id: number;
}

@ApiBearerAuth()
@ApiTags("comment")
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @ApiHeader({ name: "Authorization" })
  @UseGuards(AuthGuard("jwt"))
  @Post("create-comment")
  createComment(@Headers("Authorization") token: string, @Body() body: commentType) {
    return this.commentService.createComment(body);
  }

  @Get("get-all-comment")
  getComment() {
    return this.commentService.getComment();
  }


  @ApiHeader({ name: "Authorization" })
  @UseGuards(AuthGuard("jwt"))
  @Get('get-comment/:id')
  getCommentbyIdImage(@Headers("Authorization") token: string, @Param('id') id: string) {
    return this.commentService.getCommentbyIdImage(+id);
  }
}
