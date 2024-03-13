import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
// import { PrismaService } from "src/prisma/prisma.service";
import { PrismaService } from "../../src/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon2 from 'argon2'

@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async createToken(userId: number, email: string, role: string){
        const payload = {
            sub: userId, email, role
        }

        const jwtSercret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '4d',
            secret: jwtSercret
        })

        return {
            access_token: token
        }
    }

    async login(dto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user){
            throw new ForbiddenException("Incorrect email or password")
        }

        const pwdMatches = await argon2.verify(user.hashPwd, dto.hashPwd)

        if(!pwdMatches){
            throw new ForbiddenException("Incorrect email or password")
        }

        return this.createToken(user.id, user.email, user.role)
    }
}