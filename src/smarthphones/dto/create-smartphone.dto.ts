import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSmartphoneDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  priceReference: number;

  @IsNotEmpty()
  @IsNumber()
  priceSale: number;

  @IsNotEmpty()
  @IsNumber()
  yearModel: number;
}


  