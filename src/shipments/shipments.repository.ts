import { Injectable } from "@nestjs/common/decorators/core";
import { Prisma, Shipment } from "@prisma/client";
import PrismaService from "src/prisma-client/prisma.service";

@Injectable()
export default class ShipmentsRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async shipment(shipmentUniqueInput: Prisma.ShipmentWhereUniqueInput): Promise<Shipment> {
        return this.prismaService.shipment.findUnique({ where: shipmentUniqueInput })
    }

    async shipments(where: Prisma.ShipmentWhereInput): Promise<Shipment[]> {
        return this.prismaService.shipment.findMany({ where })
    }

    async createShipment(data: Prisma.ShipmentCreateInput): Promise<Shipment> {
        return this.prismaService.shipment.create({ data });
    }

    async updateShipment(params: {
        where: Prisma.ShipmentWhereUniqueInput,
        data: Prisma.ShipmentUpdateInput
    }): Promise<Shipment> {
        const { where, data } = params;

        return this.prismaService.shipment.update({ where, data });
    }

    async deleteShipment(where: Prisma.ShipmentWhereUniqueInput) {
        return this.prismaService.shipment.delete({ where });
    }

}