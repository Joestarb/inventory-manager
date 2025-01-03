// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @UpdateDateColumn()
    @IsDate()
    updatedAt?: Date; 
}
