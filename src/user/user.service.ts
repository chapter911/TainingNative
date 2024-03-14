import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import * as argon2 from "argon2";
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async createUser(dto: CreateUserDto){
        const hashPwdResult = await argon2.hash(dto.hashPwd)
        try {
            const user = await this.prisma.user.create({
                data: {
                    userName: dto.userName,
                    email: dto.email,
                    hashPwd: hashPwdResult,
                    role: dto.role
                }
            });

            return user;
        } catch (error) {
            throw new BadRequestException(`terjadi error: ${error}`)
        }
    }

    async createUserWithUri(dto: CreateUserDto){
        const hashPwdResult = await argon2.hash(dto.hashPwd)
        const user = await this.prisma.user.create({
            data: {
                userName: dto.userName,
                email: dto.email,
                hashPwd: hashPwdResult,
                role: dto.role
            }
        });

        return user;
    }

    async editUser(id: number, dto: EditUserDto){
        try {
            const user = await this.prisma.user.update({
                where: {id: id},
                data: {...dto}
            });
            return user;
        } catch (error) {
            throw new BadRequestException(`terjadi error: ${error}`)
        }
    }

    async userById(id: number){
        try {
            const user = await this.prisma.user.findUnique({
                where: {id: id}
            });
            return user
        } catch (error) {
            throw new BadRequestException(`terjadi error: ${error}`)
        }
    }

    async deleteUser(id: number){
        try {
            const user = await this.prisma.user.delete({
                where: {id: id}
            });
            // return user; //ini sebenarnya tidak perlu karena menampilkan data yang di hapus
        } catch (error) {
            throw new BadRequestException(`terjadi error: ${error}`)
        }
    }

    async getUser(){
        return this.prisma.user.findMany();
    }
}
