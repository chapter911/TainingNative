import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
    userById(id: number): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }>;
    deleteUser(id: number): Promise<void>;
    getUser(): Promise<{
        id: number;
        userName: string;
        email: string;
        hashPwd: string;
        role: string;
    }[]>;
}
