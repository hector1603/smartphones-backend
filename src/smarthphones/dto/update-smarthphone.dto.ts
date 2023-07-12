import { PartialType } from '@nestjs/mapped-types';
import { CreateSmarthphoneDto } from './create-smartphone.dto';


export class UpdateSmarthphoneDto extends PartialType(CreateSmarthphoneDto) {}
  