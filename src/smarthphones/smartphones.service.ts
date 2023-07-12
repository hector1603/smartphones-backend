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
    // Crea un objeto vacío para las opciones de búsqueda
    const options = {};
    // Si se recibe el parámetro name, lo agrega al objeto con el operador ILIKE
    if (name) {
      options['name'] = ILike(`%${name}%`);
    }
    // Si se recibe el parámetro model, lo agrega al objeto con el operador ILIKE
    if (model) {
      options['model'] = ILike(`%${model}%`);
    }
    // Usa el método find del repositorio y pasa el objeto de opciones
    return this.smartphonesRepository.find(options);
  }

  async findOne(id: number): Promise<Smartphone> {
    // Usa el método findOneOrFail del repositorio y pasa el id como parámetro
    try {
      return await this.smartphonesRepository.findOneOrFail(id);
    } catch (error) {
      // Si no encuentra el smartphone, lanza una excepción con un mensaje personalizado
      throw new NotFoundException('Smartphone not found');
    }
  }

  async create(createSmartphoneDto: CreateSmartphoneDto): Promise<Smartphone> {
    // Crea una instancia de la entidad con los datos del DTO
    const smartphone = this.smartphonesRepository.create(createSmartphoneDto);
    // Usa el método save del repositorio y pasa la instancia como parámetro
    return this.smartphonesRepository.save(smartphone);
  }

  async update(id: number, updateSmartphoneDto: CreateSmartphoneDto): Promise<Smartphone> {
    // Busca el smartphone por id usando el método findOneOrFail
    const smartphone = await this.findOne(id);
    // Asigna los datos del DTO a la instancia encontrada
    Object.assign(smartphone, updateSmartphoneDto);
    // Usa el método save del repositorio y pasa la instancia como parámetro
    return this.smartphonesRepository.save(smartphone);
  }

  async delete(id: number): Promise<void> {
    // Busca el smartphone por id usando el método findOneOrFail
    const smartphone = await this.findOne(id);
    // Usa el método remove del repositorio y pasa la instancia como parámetro
    await this.smartphonesRepository.remove(smartphone);
  }
}