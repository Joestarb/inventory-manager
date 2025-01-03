import { Injectable, NotFoundException } from '@nestjs/common';
import { SaleItem } from './entities/sale_items.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSaleItemsDto } from './dtos/create-sale_items.dto';
import { Sale } from '../sales/entities/sale.entity';
import { Product } from '../products/entities/products.enity';
import { UpdateSaleItemDto } from './dtos/update_sale_items.dto';
@Injectable()
export class SaleItemsService {

    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

    async findAllActivate() {
        return this.saleItemRepository.find({ where: { deleted: false }, relations: ['sale', 'product'] });
    }

    async create(createSaleItemsDto: CreateSaleItemsDto) {
        const { sale_id, product_id, quantity, unit_price } = createSaleItemsDto;

        const sale = await this.saleRepository.findOne({ where: { id: sale_id } });
        if (!sale) {
            throw new NotFoundException(`Sale with ID ${sale_id} not found`);
        }

        const product = await this.productRepository.findOne({ where: { id: product_id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${product_id} not found`);
        }

        const saleItem = this.saleItemRepository.create({
            sale,
            product,
            quantity,
            unit_price,
        });

        return this.saleItemRepository.save(saleItem);
    }
    async update(id: number, updateSaleItemsDto: UpdateSaleItemDto) {
        const { sale_id, product_id, quantity, unit_price,  } = updateSaleItemsDto;

        const saleItem = await this.saleItemRepository.findOne({ where: { id } });
        if (!saleItem) {
            throw new NotFoundException(`SaleItem with ID ${id} not found`);
        }

        if (sale_id) {
            const sale = await this.saleRepository.findOne({ where: { id: sale_id } });
            if (!sale) {
                throw new NotFoundException(`Sale with ID ${sale_id} not found`);
            }
            saleItem.sale = sale;
        }

        if (product_id) {
            const product = await this.productRepository.findOne({ where: { id: product_id } });
            if (!product) {
                throw new NotFoundException(`Product with ID ${product_id} not found`);
            }
            saleItem.product = product;
        }

        saleItem.quantity = quantity !== undefined ? quantity : saleItem.quantity;
        saleItem.unit_price = unit_price !== undefined ? unit_price : saleItem.unit_price;

        return this.saleItemRepository.save(saleItem);
    }

    async softDelete(id: number) {
        const saleItem = await this.saleItemRepository.findOne({ where: { id } });
        if (!saleItem) {
            throw new NotFoundException(`SaleItem with ID ${id} not found`);
        }

        saleItem.deleted = true;
        return this.saleItemRepository.save(saleItem);
    }
}
