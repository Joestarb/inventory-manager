import { Controller, Body, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Purchase')
@Controller('purchase')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) { }
    @Get()
    @ApiOperation({ summary: 'Get all purchases' })
    @ApiResponse({ status: 200, description: 'Return all purchases.' })
    findAllActive() {
        return this.purchaseService.findAllActive();
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get a purchase' })
    @ApiResponse({ status: 200, description: 'Return the purchase.' })
    findOne(@Param('id') id: number) {
        return this.purchaseService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a purchase' })
    @ApiResponse({ status: 200, description: 'Return the created purchase.' })
    create(@Body() createPurchaseDto: CreatePurchaseDto) {
        return this.purchaseService.create(createPurchaseDto);
    }

  

      @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete a purchase' })
    @ApiResponse({ status: 200, description: 'Return a message that the purchase is soft deleted.' })
    softDelete(@Param('id') id: number): Promise<string> {
        return this.purchaseService.softDelete(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a purchase' })
    @ApiResponse({ status: 200, description: 'Return the updated purchase.' })
    update(@Param('id') id: number, @Body() updatePurchaseDto: UpdatePurchaseDto) {
        return this.purchaseService.update(id, updatePurchaseDto);
    }

}
