import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CreatePurchaseDto } from "./create-purchase.dto";
import { UpdateDateColumn } from "typeorm";

export class UpdatePurchaseDto extends PartialType (CreatePurchaseDto){
    @IsNotEmpty( { message: 'El campo id no puede estar vacío' })
    @UpdateDateColumn( )
    updated_at: Date;
}