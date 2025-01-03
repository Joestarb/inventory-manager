import { IsNotEmpty } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    name: string;
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    email: string;
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    phone: number;
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    address: string;
}