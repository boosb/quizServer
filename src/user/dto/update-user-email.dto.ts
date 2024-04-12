import { IsEmail } from "class-validator";

export class UpdateUserEmailDto {
    //id: string | number;

    @IsEmail()
    email: string;

    @IsEmail()
    oldEmail?: string;
}