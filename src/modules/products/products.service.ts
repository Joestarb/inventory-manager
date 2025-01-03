import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.enity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../categories/entities/category.entity';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const newProduct =  await this.categoryRepository.findOne({where :{id: createProductDto.category_id}});
        if(!newProduct){
            throw new Error('Category not found');
        }
        const product = this.productRepository.create({
            ...createProductDto,
            category: newProduct
            });

        return this.productRepository.save(product);
    }

    findAllActive() {
        return this.productRepository.find({
            where: { deleted: false },
            relations: ['category'],
        });
    }

 async softDelete(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new Error('ID must be a valid number.');
        }
        const product = await this.productRepository.findOne({ where: { id, deleted: false } });
        if (!product) {
            throw new Error(`Product with ID ${id} not found or already deleted.`);
        }
        product.deleted = true;
        await this.productRepository.save(product);
        return `Product with ID ${id} has been soft deleted.`;
    }
 
    async update(id: number, updateProductDto: UpdateCategoryDto) {
        await this.productRepository.update(id, updateProductDto);
        return this.productRepository.findOne({ where: { id } });
    }
};
