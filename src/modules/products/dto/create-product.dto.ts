import {  IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @IsNotEmpty( {message: 'Description is required'})
    description:string;

    @IsNotEmpty({message: 'Purchase price is required'})
    purchase_price: number;

    @IsNotEmpty( {message: 'Sale price is required'})
    sale_price: number;

    @IsNotEmpty( {message: 'Stock is required'})
    stock: number;

    @IsNotEmpty({message: 'Category is required'})
    category_id: number;

    @IsNotEmpty({message: 'Product number is required'})
    product_number: string;

}