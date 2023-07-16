import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ImageModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
