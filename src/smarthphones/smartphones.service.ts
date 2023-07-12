import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Smartphone } from './entities/smartphone.entity';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';

@Injectable()
export class SmartphonesService {
  constructor(
    @InjectRepository(Smartphone)
    private smartphonesRepository: Repository<Smartphone>,
  ) {}

  async findAll(name?: string, model?: string): Promise<Smartphone[]> {
    const options = {};
    if (name) {
      options['name'] = ILike(`%${name}%`);
    }
    if (model) {
      options['model'] = ILike(`%${model}%`);
    }
    return this.smartphonesRepository.find(options);
  }

  async findOne(id: number): Promise<Smartphone> {
    try {
      return await this.smartphonesRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('Smartphone not found');
    }
  }

  async create(createSmartphoneDto: CreateSmartphoneDto): Promise<Smartphone> {
    const smartphone = this.smartphonesRepository.create(createSmartphoneDto);
    return this.smartphonesRepository.save(smartphone);
  }

  async update(id: number, updateSmartphoneDto: CreateSmartphoneDto): Promise<Smartphone> {
    const smartphone = await this.findOne(id);
    Object.assign(smartphone, updateSmartphoneDto);
    return this.smartphonesRepository.save(smartphone);
  }

  async delete(id: number): Promise<void> {
    const smartphone = await this.findOne(id);
    await this.smartphonesRepository.remove(smartphone);
  }
}