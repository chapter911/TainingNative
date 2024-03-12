import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getUser(){
        return this.userService.getUser()
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

    @HttpCode(HttpStatus.NO_CONTENT) //kalau mau customize status code
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }
}
