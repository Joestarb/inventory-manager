import { IsNotEmpty } from "class-validator";


export class CreateSaleDto {
    @IsNotEmpty({ message: 'El campo user_id no puede estar vacío' })
    user_id: number;

    @IsNotEmpty()
    total_amount: number;
}