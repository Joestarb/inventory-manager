import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>

    findAllActive() {
        return this.categoryRepository.find({ where: { deleted: false } });
    }

    findOnde(id: number) {
        return this.categoryRepository.findOne({ where: { id } });
    }
    create(createCategoryDto: CreateCategoryDto) {
        const newCategorie = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(newCategorie);
    }

    async softDelete(id: number): Promise<string> {
        if (isNaN(id)) {
            throw new BadRequestException('ID must be a valid number.');
        }
        const user = await this.categoryRepository.findOne({ where: { id, deleted: false } });
        if (!user) {
            throw new Error(`User with ID ${id} not found or already deleted.`);
        }
        user.deleted = true; // Marca el usuario como eliminado
        await this.categoryRepository.save(user);
        return `User with ID ${id} has been soft deleted.`;
    }

    async update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
        await this.categoryRepository.update(id, UpdateCategoryDto);
        return this.findOnde(id);
    }
}
