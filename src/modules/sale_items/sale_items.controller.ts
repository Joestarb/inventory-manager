import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SaleItemsService } from './sale_items.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSaleItemsDto } from './dtos/create-sale_items.dto';
import { UpdateSaleItemDto } from './dtos/update_sale_items.dto';

@ApiTags('sale-items')
@Controller('sale-items')
export class SaleItemsController {
    constructor(private readonly saleItemService: SaleItemsService) { }

    @Get()
    @ApiOperation({ summary: 'List of all sale items' })
    @ApiResponse({ status: 200, description: 'List of all sale items' })
    findAllActivate() {
        return this.saleItemService.findAllActivate();
    }

    @Post()
    @ApiOperation({ summary: 'Create sale items' })
    @ApiResponse({ status: 200, description: 'Create sale items' })
    create(@Body() CreateSaleItemsDto: CreateSaleItemsDto) {
        return this.saleItemService.create(CreateSaleItemsDto);
    }

    @Put()
    @ApiOperation({ summary: 'Update sale items' })
    @ApiResponse({ status: 200, description: 'Update sale items' })
    updat(@Param('id')id:number, @Body() UpdateSaleItemsDto: UpdateSaleItemDto) {
        return this.saleItemService.update(id, UpdateSaleItemsDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete sale items' })
    @ApiResponse({ status: 200, description: 'Soft delete sale items' })
    softDelete(@Param('id',) id: number) {
        return this.saleItemService.softDelete(id);
    }
}