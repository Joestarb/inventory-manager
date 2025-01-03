import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>

    
    async findAllActive(){
        return this.saleRepository.find({ where: { deleted: false } });
    }

    findOne(id: number) {
        return this.saleRepository.findOne({ where: { id } });
    }

    create(createSaleDto: CreateSaleDto) {
        const newSale = this.saleRepository.create(createSaleDto);
        return this.saleRepository.save(newSale);
    }

    async softDelete(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new BadRequestException('ID must be a valid number.');
        }

        const sale = await this.saleRepository.findOne({ where: { id, deleted: false } });
        if (!sale) {
            throw new NotFoundException(`Sale with ID ${id} not found or already deleted.`);
        }

        sale.deleted = true; 
        await this.saleRepository.save(sale);
        return `Sale with ID ${id} has been soft deleted.`;
    }

    async update(id: number, updateSaleDto: UpdateSaleDto) {
        await this.saleRepository.update(id, updateSaleDto);
        return this.findOne(id); 
    }
}
