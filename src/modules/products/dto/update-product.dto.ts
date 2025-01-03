import { UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
        @IsNotEmpty( { message: 'El campo id no puede estar vacío' })
        @UpdateDateColumn( )
        updated_at: Date;

        
}