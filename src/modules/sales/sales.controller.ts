import { Controller, Get, Param, ParseIntPipe, Post, Body,Put } from '@nestjs/common';
import { ApiOperation,  ApiResponse, ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
@ApiTags('sales')
@Controller('sales')
export class SalesController {

    constructor(private readonly salesServices: SalesService){}

    @Get()
    @ApiOperation({ summary: 'List of all sales' })
    @ApiResponse({ status: 200, description: 'List of all sales' })
    findAllActivate(){
        return this.salesServices.findAllActive();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get sale by id' })
    @ApiResponse({ status: 200, description: 'Get sale by id' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.salesServices.findOne(id);
    }

    @Post()
    create(@Body() CreateSaleDto: CreateSaleDto){
        return this.salesServices.create(CreateSaleDto);
    }


    @Put()
    @ApiOperation({ summary: 'Update sale by id' })
    @ApiResponse({ status: 200, description: 'Update sale by id' })
    update(@Param('id')id:number, @Body() UpdateSaleDto: UpdateSaleDto){
        return this.salesServices.update(id, UpdateSaleDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete sale by id' })
    @ApiResponse({ status: 200, description: 'Soft delete sale by id' })
    softDelete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.salesServices.softDelete(id);
    }
}
