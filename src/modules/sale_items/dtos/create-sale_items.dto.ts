import { IsNotEmpty } from "class-validator";

export class CreateSaleItemsDto {
  @IsNotEmpty()
  sale_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  unit_price: number;


}