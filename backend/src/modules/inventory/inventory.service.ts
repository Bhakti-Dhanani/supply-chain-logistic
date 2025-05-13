import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';

// Export the InventoryItem interface to make it available for other modules
export interface InventoryItem {
  id: number;
  itemName: string;
  quantity: number;
  warehouse: string;
}

@Injectable()
export class InventoryService {
  private inventory: InventoryItem[] = []; // Specify the type explicitly

  create(createInventoryDto: CreateInventoryDto) {
    const newInventory: InventoryItem = { id: Date.now(), ...createInventoryDto };
    this.inventory.push(newInventory);
    return newInventory;
  }

  findAll() {
    return this.inventory;
  }
}
