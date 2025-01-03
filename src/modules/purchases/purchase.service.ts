import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Purchase } from "./entities/purchase.entity";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { UpdatePurchaseDto } from "./dto/update-purchase.dto";
import { Supplier } from "src/modules/suppliers/entity/supplier.entity";

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
        
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>
    ) { }

    findAllActive() {
        return this.purchaseRepository.find({ 
            where: { deleted: false },
            relations: ['supplier'], // Incluir la relación con Supplier
        });
    }

    findOne(id: number) {
        return this.purchaseRepository.findOne({ 
            where: { id },
            relations: ['supplier'], // Incluir la relación con Supplier
        });
    }
    
    async create(createPurchaseDto: CreatePurchaseDto) {
        const supplier = await this.supplierRepository.findOne({ where: { id: createPurchaseDto.supplier_id } });
        if (!supplier) {
            throw new Error('Supplier not found');
        }

        const newPurchase = this.purchaseRepository.create({
            ...createPurchaseDto,
            supplier,
        });

        return this.purchaseRepository.save(newPurchase);
    }

    async softDelete(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error('ID must be a valid number.');
        }
        const purchase = await this.purchaseRepository.findOne({ where: { id, deleted: false } });
        if (!purchase) {
            throw new Error(`Purchase with ID ${id} not found or already deleted.`);
        }
        purchase.deleted = true;
        await this.purchaseRepository.save(purchase);
        return `Purchase with ID ${id} has been soft deleted.`;
    }


    async update(id:number, updatePurchaseDto: UpdatePurchaseDto){
        await this.purchaseRepository.update(id, updatePurchaseDto);
        return this.findOne(id);
    }
}