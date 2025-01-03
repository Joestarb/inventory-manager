import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productServices: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'List of all products' })
    @ApiResponse({ status: 200, description: 'List of all products' })
    findAllActive() {
        return this.productServices.findAllActive();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 200, description: 'Create a new product' })
    create(@Body() createProductDto: CreateProductDto ) {
        return this.productServices.create(createProductDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update product by id' })
    @ApiResponse({ status: 200, description: 'Update product by id' })
    update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
        return this.productServices.update(id, updateProductDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete product by id' })
    @ApiResponse({ status: 200, description: 'Soft delete product by id' })
    softDelete(@Param('id')id:number):Promise<string>{
        return this.productServices.softDelete(id);
    }
}