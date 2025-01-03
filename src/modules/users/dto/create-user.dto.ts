import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    name: string;

    @IsEmail( {}, { message: 'El campo email debe ser un correo electrónico' })
    email: string;

    @MinLength(6)
    password: string;
}
