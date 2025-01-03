import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierService } from './supplier.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('suppliers')
@Controller('suppliers')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }

    @Get()
    @ApiOperation({ summary: 'List of all suppliers' })
    @ApiResponse({ status: 200, description: 'List of all suppliers' })
    findAllActive() {
        return this.supplierService.findAllActive();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find supplier by id' })
    @ApiResponse({ status: 200, description: 'Find supplier by id' })
    findOne(@Param('id') id: number) {
        return this.supplierService.findOnde(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new supplier' })
    @ApiResponse({ status: 200, description: 'Create a new supplier' })
    create(@Body() createSupplierDto: CreateSupplierDto) {
        return this.supplierService.create(createSupplierDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update supplier by id' })
    @ApiResponse({ status: 200, description: 'Update supplier by id' })
        update(@Param('id')id:number, @Body() UpdateSupplierDto: UpdateSupplierDto){
        return this.supplierService.update(id, UpdateSupplierDto);
    }
 
    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete supplier by id' })
    @ApiResponse({ status: 200, description: 'Soft delete supplier by id' })
    softDelete(@Param('id') id: number): Promise<string> {
        return this.supplierService.softDelete(id);
    }
}
