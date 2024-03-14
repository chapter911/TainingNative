// import { JwtGuard } from '../../src/auth/guard/jwt.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
// import { RoleGuard } from '../../src/auth/guard/role.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
// import { Role } from '../../src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.decorator';
// import { Roles } from '../../src/auth/role/role.enum';
import { Roles } from 'src/auth/role/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

// @UseGuards(JwtGuard) //untuk mengaktifkan token jwt untuk semua method
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // @UseGuards(JwtGuard, RoleGuard) //untuk mengaktifkan token jwt untuk method spesifik
    // @Role(Roles.Admins)
    @Get()
    getUser(){
        return this.userService.getUser()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.userById(id)
    }

    @Post()
    createUser(@Body() dto: CreateUserDto){
        return this.userService.createUser(dto)
    }

    @Post('create')
    createUserWithUri(@Body() dto: CreateUserDto){
        return this.userService.createUser(dto)
    }

    @Patch(':id')
    editUser(@Param('id', ParseIntPipe) id: number, @Body() dto: EditUserDto){
        return this.userService.editUser(id, dto)
    }

    // @HttpCode(HttpStatus.NO_CONTENT) //kalau mau customize status code
    // @Delete(':id')
    // deleteUser(@Param('id', ParseIntPipe) id: number){
    //     return this.userService.deleteUser(id)
    // }

    @UseGuards(JwtGuard, RoleGuard) //untuk mengaktifkan token jwt untuk method spesifik
    @Role(Roles.Admins)
    @HttpCode(HttpStatus.NO_CONTENT) //kalau mau customize status code
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize: 1000000}), //ini dalam bytes
            new FileTypeValidator({fileType: 'image/jpeg'}) //ini dalam bytes
        ]
    })) file: Express.Multer.File){
        // console.log(file)

        const arrBuffer = file.buffer
        const byteArray = new Int32Array(arrBuffer)
        console.log("byteArray: ", byteArray); //untuk mengubah format tipe agar bisa disimpan ke database filenya
    }

    @Post('uploadlocal')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'public/images',
            filename: (req, file, cb) => {
                cb(null, file.originalname)
            }
        })
    }))
    async uploadFileToLocal(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize: 1000000}), //ini dalam bytes
            new FileTypeValidator({fileType: 'image/jpeg'}) //ini dalam bytes
        ]
    })) file: Express.Multer.File){
        return {statusCode: 200, data: file.path}
    }
}
