import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Owner } from 'src/auth/jwt-owner.decorator';

@Controller('shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  findAll(@Owner() owner) {
    return this.shipmentsService.findAll(owner);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentsService.update(+id, updateShipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(+id);
  }
}
