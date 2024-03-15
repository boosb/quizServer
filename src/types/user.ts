import { Role } from "src/user/entities/role.entity"

export interface IUser {
    id: string
    email: string
    roleId: string|number
    role?: Role
    token?: string
    isEmailConfirmed: boolean
    avatar: string | null
    alias: string | null
}