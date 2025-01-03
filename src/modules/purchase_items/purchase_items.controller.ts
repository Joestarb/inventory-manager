import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseItemsService } from './purchase_items.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePurchaseItemsDto } from './dto/create-purchase_items';
import { UpdatePurchaseItemsDto } from './dto/update-purchase_itmes';
@Controller('purchase-items')
export class PurchaseItemsController {
    constructor(private readonly purchaseItemsService: PurchaseItemsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all purchase items' })
    @ApiResponse({ status: 200, description: 'Return all purchase items.' })
    findAllActive() {
        return this.purchaseItemsService.findAllActive();
    }

    @Post()
    @ApiOperation({ summary: 'Create a purchase item' })
    @ApiResponse({ status: 200, description: 'Return the created purchase item.' })
    create(@Body() CreatePurchaseItemDto: CreatePurchaseItemsDto){
        return this.purchaseItemsService.create(CreatePurchaseItemDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a purchase item' })
    @ApiResponse({ status: 200, description: 'Return the updated purchase item.' })
    update(@Param('id')id:number, @Body() UpdatePurchaseItemsDto: UpdatePurchaseItemsDto){
        return this.purchaseItemsService.update(id, UpdatePurchaseItemsDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete a purchase item' })
    @ApiResponse({ status: 200, description: 'Return a message that the purchase item is soft deleted.' })
    softDelete(@Param('id') id: number): Promise<string> {
        return this.purchaseItemsService.softDelete(id);
    }


}
