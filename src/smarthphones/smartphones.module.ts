import { Module } from '@nestjs/common';
import { SmarthphonesService } from './smartphones.service';
import { SmarthphonesController } from './smartphones.controller';
import { Smarthphone } from './entities/smartphone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Smarthphone])],
  controllers: [SmarthphonesController],
  providers: [SmarthphonesService]
})
export class SmartphonesModule {}