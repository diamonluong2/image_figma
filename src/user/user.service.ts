import { HttpException, Injectable } from '@nestjs/common';

import { PrismaClient, nguoi_dung } from '@prisma/client';


@Injectable()
export class UserService {
    prisma = new PrismaClient();

    async getUser(): Promise<nguoi_dung[]> {
        let data = await this.prisma.nguoi_dung.findMany();

        return data;
    }
    async updateUser(id: number, body: any) {
        const createdUser = await this.prisma.nguoi_dung.findFirst({ where: { nguoi_dung_id: id } });
        console.log(createdUser);

        if (!createdUser) {
            throw new HttpException('Không tìm thấy user', 400);
        }
        createdUser.mat_khau = body.mat_khau;
        createdUser.ho_ten = body.ho_ten;
        createdUser.tuoi = body.tuoi;
        createdUser.anh_dai_dien = body.anh_dai_dien;

        const user = await this.prisma.nguoi_dung.update({

            data: createdUser,
            where: {
                nguoi_dung_id: id
            }

        })
        return "Cập nhật thành công"
    }


}
