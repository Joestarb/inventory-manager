import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { UpdateDateColumn } from "typeorm";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto){
    @IsNotEmpty( { message: 'El campo id no puede estar vacío' })
    @UpdateDateColumn()
    updated_at?: Date;
}