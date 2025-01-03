import { PartialType } from "@nestjs/mapped-types";
import { CreateSaleDto } from "./create-sale.dto";
import { UpdateDateColumn } from "typeorm";

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @UpdateDateColumn()
    updated_at: Date;
}
