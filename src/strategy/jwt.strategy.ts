import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    // kiểm tra token 
    constructor(config: ConfigService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("KEY"), // KEY: FLASH
        });
    }

    // trả về dữ liệu khi một API gọi thành công có chứa token
    async validate(tokenDecode: any) {
        // check quyền
        return tokenDecode;
    }
}