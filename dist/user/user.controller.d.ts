/// <reference types="multer" />
import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }[]>;
    getUserById(id: number): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }>;
    createUser(dto: CreateUserDto): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }>;
    createUserWithUri(dto: CreateUserDto): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }>;
    editUser(id: number, dto: EditUserDto): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }>;
    deleteUser(id: number): Promise<void>;
    uploadFile(file: Express.Multer.File): void;
    uploadFileToLocal(file: Express.Multer.File): Promise<{
        statusCode: number;
        data: string;
    }>;
}
