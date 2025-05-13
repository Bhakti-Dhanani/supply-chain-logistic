import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';

// Export the ShipmentItem interface to make it available for other modules
export interface ShipmentItem {
  id: number;
  shipmentNumber: string;
  status: string;
}

@Injectable()
export class ShipmentsService {
  private shipments: ShipmentItem[] = []; // Specify the type explicitly

  create(createShipmentDto: CreateShipmentDto): ShipmentItem {
    const newShipment: ShipmentItem = { id: Date.now(), ...createShipmentDto };
    this.shipments.push(newShipment);
    return newShipment;
  }

  findAll(): ShipmentItem[] {
    return this.shipments;
  }
}
