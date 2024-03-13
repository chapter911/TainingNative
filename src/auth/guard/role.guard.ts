import { ROLE_KEY } from './../role/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../role/role.enum";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.getAllAndOverride<Roles>(ROLE_KEY, [
            context.getHandler(), context.getClass()])
        if(!requiredRole){
            return true
        }

        // const user = context.switchToHttp().getRequest();
        const {user} = context.switchToHttp().getRequest();

        // console.log(user)
        return user.role === requiredRole
    }
}