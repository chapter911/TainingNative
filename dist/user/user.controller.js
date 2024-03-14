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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const dto_1 = require("./dto");
const edit_user_dto_1 = require("./dto/edit-user.dto");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../auth/guard/role.guard");
const role_decorator_1 = require("../auth/role/role.decorator");
const role_enum_1 = require("../auth/role/role.enum");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser() {
        return this.userService.getUser();
    }
    getUserById(id) {
        return this.userService.userById(id);
    }
    createUser(dto) {
        return this.userService.createUser(dto);
    }
    createUserWithUri(dto) {
        return this.userService.createUser(dto);
    }
    editUser(id, dto) {
        return this.userService.editUser(id, dto);
    }
    deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    uploadFile(file) {
        const arrBuffer = file.buffer;
        const byteArray = new Int32Array(arrBuffer);
        console.log("byteArray: ", byteArray);
    }
    async uploadFileToLocal(file) {
        return { statusCode: 200, data: file.path };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserWithUri", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, edit_user_dto_1.EditUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, role_decorator_1.Role)(role_enum_1.Roles.Admins),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000000 }),
            new common_1.FileTypeValidator({ fileType: 'image/jpeg' })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploadlocal'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'public/images',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000000 }),
            new common_1.FileTypeValidator({ fileType: 'image/jpeg' })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFileToLocal", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map