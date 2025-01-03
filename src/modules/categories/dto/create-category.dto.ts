import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty( { message: 'El campo name no puede estar vacío' })
    name: string;
    @IsNotEmpty( { message: 'El campo description no puede estar vacío' })
    description: string;
}