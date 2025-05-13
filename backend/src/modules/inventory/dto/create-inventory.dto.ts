import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  warehouse: string;
}
