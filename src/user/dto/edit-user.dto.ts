import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class EditUserDto{

    @IsString()
    userName: string

    @IsString()
    @IsOptional()
    role?: string
}