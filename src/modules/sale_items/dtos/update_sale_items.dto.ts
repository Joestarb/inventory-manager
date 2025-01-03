import { PartialType } from "@nestjs/mapped-types";
import { UpdateDateColumn } from "typeorm";
import { CreateSaleItemsDto } from "./create-sale_items.dto";

export class UpdateSaleItemDto extends PartialType(CreateSaleItemsDto) {
     @UpdateDateColumn()
     updated_at: Date;
}