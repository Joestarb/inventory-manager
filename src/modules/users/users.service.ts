import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>


  async findAllActive() {
      return this.userRepository.find({ where: { deleted: false } });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async softDelete(id: number): Promise<string> {
    if (isNaN(id)) {
        throw new BadRequestException('ID must be a valid number.');
    }

    const user = await this.userRepository.findOne({ where: { id, deleted: false } });
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found or already deleted.`);
    }

    user.deleted = true; 
    await this.userRepository.save(user);
    return `User with ID ${id} has been soft deleted.`;
}


  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id); 
  }
}
