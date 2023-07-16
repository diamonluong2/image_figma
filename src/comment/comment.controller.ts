import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @Post("create-comment")
  createComment(@Body() body) {
    return this.commentService.createComment(body);
  }

  @Get("get-all-comment")
  getComment() {
    return this.commentService.getComment();
  }



  @Get('get-comment/:id')
  getCommentbyIdImage(@Param('id') id: string) {
    return this.commentService.getCommentbyIdImage(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
