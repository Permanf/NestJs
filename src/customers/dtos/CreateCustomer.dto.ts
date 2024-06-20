import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString } from "class-validator";

export class CreateCustomerDto{
    @IsEmail()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;
}