import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("comment")
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("create-comment")
  createComment(@Body() body) {
    return this.commentService.createComment(body);
  }

  @Get("get-all-comment")
  getComment() {
    return this.commentService.getComment();
  }


  @UseGuards(AuthGuard("jwt"))
  @Get('get-comment/:id')
  getCommentbyIdImage(@Param('id') id: string) {
    return this.commentService.getCommentbyIdImage(+id);
  }
}
