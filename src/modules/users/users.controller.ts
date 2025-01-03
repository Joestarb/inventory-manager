import { Controller, Get, Post, Param, Body, Put, ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    @ApiOperation({ summary: 'List of all users' })
    @ApiResponse({ status: 200, description: 'List of all users' })
    findAllActive(){
        return this.usersService.findAllActive();
    }
   // Método para obtener todos los usuarios


    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, description: 'Get user by id' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }
    
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 200, description: 'Create a new user' })
    create(@Body() CreateUserDto: CreateUserDto){
        return this.usersService.create(CreateUserDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by id' })
    @ApiResponse({ status: 200, description: 'Update user by id' })
        update(@Param('id')id:number, @Body() UpdateUserDto: UpdateUserDto){
        return this.usersService.update(id, UpdateUserDto);
    }

    @Put(':id/softDelete')
    @ApiOperation({ summary: 'Soft delete user by id' })
    @ApiResponse({ status: 200, description: 'Soft delete user by id' })
    softDelete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.usersService.softDelete(id);
    }
z


    

}
