import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entity/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
@Injectable()
export class SupplierService {
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>

    findAllActive() {
        return this.supplierRepository.find({ where: { deleted: false } });
    }

    findOnde(id: number) {
        return this.supplierRepository.findOne({ where: { id } });
    }

    create(createSupplierDto: CreateSupplierDto) {
        const newSupplier = this.supplierRepository.create(createSupplierDto);
        return this.supplierRepository.save(newSupplier);
    }

    async softDelete(id: number): Promise<string> {
        if(isNaN(id)) {
            throw new Error('ID must be a valid number.');
        }
        const user = await this.supplierRepository.findOne({ where: { id, deleted: false } });
        if (!user) {
            throw new Error(`User with ID ${id} not found or already deleted.`);
        }
        user.deleted = true; 
        await this.supplierRepository.save(user);
        return `User with ID ${id} has been soft deleted.`;
    }

    async update (id: number, updateSupplierDto: UpdateSupplierDto) {
        const supplier = await this.supplierRepository.preload({
            id,
            ...updateSupplierDto,
        });

        if (!supplier) {
            throw new Error(`Supplier with ID ${id} not found`);
        }

        return this.supplierRepository.save(supplier);
    }
}
