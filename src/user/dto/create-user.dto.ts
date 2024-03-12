import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto{
    @IsString()
    userName: string

    @IsString() //opsional
    @IsEmail()
    email: string

    @IsString()
    hashPwd: string

    @IsString()
    @IsOptional()
    role?: string
}