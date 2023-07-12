import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SmartphonesService } from './smartphones.service';
import { SmartphoneEntity } from 'src/entities/smartphone.entity'; // Importa la entidad desde la carpeta entities
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';

@Controller('smartphones')
export class SmartphonesController {
  constructor(private readonly smartphonesService: SmartphonesService) {}

  // Método para obtener todos los smartphones o filtrarlos por nombre o modelo
  @Get()
  findAll(@Query('name') name: string, @Query('model') model: string): Promise<SmartphoneEntity[]> {
    return this.smartphonesService.findAll(name, model);
  }

  // Método para obtener un smartphone por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SmartphoneEntity> {
    return this.smartphonesService.findOne(id);
  }

  // Método para crear un smartphone
  @Post()
  create(@Body() createSmartphoneDto: CreateSmartphoneDto): Promise<SmartphoneEntity> {
    return this.smartphonesService.create(createSmartphoneDto);
  }

  // Método para actualizar un smartphone por id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSmartphoneDto: CreateSmartphoneDto): Promise<SmartphoneEntity> {
    return this.smartphonesService.update(id, updateSmartphoneDto);
  }

  // Método para eliminar un smartphone por id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.smartphonesService.delete(id);
  }
}
