import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SmartphonesService } from './smartphones.service';
import { SmartphoneEntity } from 'src/entities/smartphone.entity';
import { CreateSmartphoneDto } from './dto/create-smartphone.dto';

@Controller('smartphones')
export class SmartphonesController {
  constructor(private readonly smartphonesService: SmartphonesService) {}

  @Get()
  findAll(@Query('name') name: string, @Query('model') model: string): Promise<SmartphoneEntity[]> {
    return this.smartphonesService.findAll(name, model);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SmartphoneEntity> {
    return this.smartphonesService.findOne(id);
  }

  @Post()
  create(@Body() createSmartphoneDto: CreateSmartphoneDto): Promise<SmartphoneEntity> {
    return this.smartphonesService.create(createSmartphoneDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSmartphoneDto: CreateSmartphoneDto): Promise<SmartphoneEntity> {
    return this.smartphonesService.update(id, updateSmartphoneDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.smartphonesService.delete(id);
  }
}
