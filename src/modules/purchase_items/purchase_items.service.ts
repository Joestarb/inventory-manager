import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseItems } from './entities/purchase_items.entity';
import { Repository } from 'typeorm';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Product } from '../products/entities/products.enity';
import { UpdatePurchaseDto } from '../purchases/dto/update-purchase.dto';
@Injectable()
export class PurchaseItemsService {
    constructor(
        @InjectRepository(PurchaseItems)
        private readonly purchaseItemRepository: Repository<PurchaseItems>,

        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    findAllActive() {
        return this.purchaseItemRepository.find({
            where: { deleted: false },
            relations: ['purchase', 'product']
        });

    }

    findOne(id: number) {
        return this.purchaseItemRepository.findOne({ where: { id }, relations: ['purchase', 'product'] });
    }

    async create(createPurchaseItemDto) {
        const purchase = await this.purchaseRepository.findOne({ where: { id: createPurchaseItemDto.purchase_id } });
        if (!purchase) {
            throw new Error('Purchase not found');
        }

        const product = await this.productRepository.findOne({ where: { id: createPurchaseItemDto.product_id } });
        if (!product) {
            throw new Error('Product not found');
        }

        const newPurchaseItem = this.purchaseItemRepository.create({
            ...createPurchaseItemDto,
            purchase,
            product
        });

        return this.purchaseItemRepository.save(newPurchaseItem);
    }

    async softDelete(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error('ID must be a valid number.');
        }
        const purchaseItem = await this.purchaseItemRepository.findOne({ where: { id, deleted: false } });
        if (!purchaseItem) {
            throw new Error(`Purchase Item with ID ${id} not found or already deleted.`);
        }
        purchaseItem.deleted = true;
        await this.purchaseItemRepository.save(purchaseItem);
        return `Purchase Item with ID ${id} has been soft deleted.`;
    }

    async update(id:number, updatePurchaseDto: UpdatePurchaseDto){
        await this.purchaseItemRepository.update(id, updatePurchaseDto);
        return this.findOne(id);
    }


}