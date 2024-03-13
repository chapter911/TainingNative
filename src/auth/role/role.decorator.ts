import { SetMetadata } from "@nestjs/common"
import { Roles } from "./role.enum"

export const ROLE_KEY = 'role'
export const Role = (role: Roles) => SetMetadata(ROLE_KEY, role)