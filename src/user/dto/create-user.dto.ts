import { IsEmail, IsNumber, MinLength } from "class-validator";
import { Role } from "../entities/role.entity";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(6, {message: 'Password is too short'})
    password: string;

    @IsNumber()
    roleId: number;

    role: Role;

    avatar: string | null
}