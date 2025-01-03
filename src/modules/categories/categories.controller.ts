import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor (private readonly CategoriesService: CategoriesService) {}
    @Get()
    @ApiOperation({ summary: 'List of all categories' })
    findAll() {
        return this.CategoriesService.findAllActive();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.CategoriesService.findOnde(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    create(@Body() CreateCategoryDto: CreateCategoryDto) {
        return this.CategoriesService.create(CreateCategoryDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() UpdateCategoryDto: UpdateCategoryDto) {
        return this.CategoriesService.update(id, UpdateCategoryDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete category by id' })
    @ApiResponse({ status: 200, description: 'Soft delete category by id' })
    softDelete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.CategoriesService.softDelete(id);
    }
    
}
