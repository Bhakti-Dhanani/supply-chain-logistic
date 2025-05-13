import { IsString, IsNotEmpty } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  shipmentNumber: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
