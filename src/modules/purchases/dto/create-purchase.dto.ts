import {  IsNotEmpty } from "class-validator";

export class CreatePurchaseDto {
    @IsNotEmpty( { message: 'El campo supplier_id no puede estar vacío' })
    supplier_id: number;

    @IsNotEmpty( { message: 'El campo purchase_date no puede estar vacío' })
    total_amount:number;

}