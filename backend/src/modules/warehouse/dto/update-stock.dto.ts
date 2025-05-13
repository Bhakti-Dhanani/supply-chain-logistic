import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  action: 'add' | 'subtract';
}
