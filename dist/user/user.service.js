"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(dto) {
        const hashPwdResult = await argon2.hash(dto.hashPwd);
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
        }
        catch (error) {
            throw new common_1.BadRequestException(`terjadi error: ${error}`);
        }
    }
    async createUserWithUri(dto) {
        const hashPwdResult = await argon2.hash(dto.hashPwd);
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
    async editUser(id, dto) {
        try {
            const user = await this.prisma.user.update({
                where: { id: id },
                data: { ...dto }
            });
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(`terjadi error: ${error}`);
        }
    }
    async userById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id }
            });
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(`terjadi error: ${error}`);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: id }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`terjadi error: ${error}`);
        }
    }
    async getUser() {
        return this.prisma.user.findMany();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map