import { PartialType } from "@nestjs/mapped-types";
import { CreatePurchaseItemsDto } from "./create-purchase_items";
import { IsNotEmpty } from "class-validator";
import { UpdateDateColumn } from "typeorm";
export class UpdatePurchaseItemsDto extends PartialType(CreatePurchaseItemsDto) {
    @IsNotEmpty({ message: 'El campo id no puede estar vacío' })
    @UpdateDateColumn()
    updated_at: Date;
}