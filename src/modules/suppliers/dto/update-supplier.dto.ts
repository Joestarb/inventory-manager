import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { UpdateDateColumn } from "typeorm";
import { CreateSupplierDto } from "./create-supplier.dto";

export class UpdateSupplierDto extends PartialType(CreateSupplierDto){
    @IsNotEmpty( { message: 'El campo id no puede estar vacío' })
    @UpdateDateColumn()
    updatedAt?: Date;
}  