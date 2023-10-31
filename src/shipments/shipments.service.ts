import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import ShipmentsRepository from './shipments.repository';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import { ShipmentStatus } from './constants/shipment-status';
import { Shipment } from './entities/shipment.entity';

@Injectable()
export class ShipmentsService {
  
  constructor(private readonly shipmentsRepository: ShipmentsRepository, private readonly shipperService: UsersService) {}
  
  
  async create(createShipmentDto: CreateShipmentDto) {
    const shipper : User =  await this.shipperService.findById( createShipmentDto.shipment.shipperId );

    if (!shipper) {
      return;
    }

    const {  recipientAddress, recipientName, recipientPhone,shipperId } = createShipmentDto.shipment;

    const dateSent = Date.now().toLocaleString();
    const dateReceived = "PENDING";

    return await this.shipmentsRepository.createShipment({
      dateReceived, dateSent,  recipientAddress, recipientName, recipientPhone, shipper : {  connect: { id: +shipperId } } , status: ShipmentStatus.STARTED.toString()
    });
  }


  async findAll(owner) {
    return await this.shipmentsRepository.shipments({ id: +owner.userId });
  }


  async findOne(id: number) : Promise<Shipment>{  
    return await this.shipmentsRepository.shipment({ id: +id });
  }
  

  update(id: number, updateShipmentDto: UpdateShipmentDto): Promise<Shipment> {

    const shipment = {...updateShipmentDto.shipment, shipperId: +updateShipmentDto.shipment.shipperId}

    return this.shipmentsRepository.updateShipment({data: shipment, where: { id: +id }});
  }


  remove(id: number) {
    return this.shipmentsRepository.deleteShipment({id: +id});
  }
}
