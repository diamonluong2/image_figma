import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    prisma = new PrismaClient();
    // passport
    async login(body: any) {
        try {
            const createdUser = await this.prisma.nguoi_dung.findFirst({ where: { email: body.email } });
            const isMatch = await bcrypt.compare(body.mat_khau, createdUser.mat_khau)
            if (createdUser) {
                if (isMatch) {
                    let token = await this.jwtService.signAsync({ data: "data" }, { secret: this.configService.get("KEY"), expiresIn: "5m" });
                    const responseData = { message: "Đăng nhập thành công", access_token: token }
                    return responseData;
                } else {
                    throw new HttpException('Mật khẩu không đúng', 400);
                }
            } else {
                throw new HttpException('Email không đúng', 400);
            }

        } catch (error) {
            throw new HttpException(error.message, 500)
        }
        // tìm bằng email

        // true: check mat_khau
        // false mat_khau: báo mật khẩu không đúng

        // fasle email: báo mail tồn tại

    }

    async signUp(body: any) {
        try {
            const createdUser = await this.prisma.nguoi_dung.findFirst({ where: { email: body.email } });
            if (createdUser) {
                throw new HttpException('Email đã tồn tại', 400);
            }
            const user = await this.prisma.nguoi_dung.create({
                data: {
                    email: body.email,
                    mat_khau: bcrypt.hashSync(body.mat_khau, 10),
                    ho_ten: body.ho_ten,
                    tuoi: body.tuoi,
                    anh_dai_dien: body.anh_dai_dien,
                }
            });
            return "Đăng ký thành công"
        } catch (error) {
            throw new HttpException(error.message, 500)
        }


        // this.prisma.nguoi_dung.create({ data: userSignUp })
        // check email trùng

        // false: trùng báo lỗi mail trùng

        // true: tạo mới user
        return "";
    }
}
