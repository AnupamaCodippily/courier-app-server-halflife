export class CreateShipmentDto {
    shipment: {
        shipperId : number;
        recipientName: string;
        recipientAddress: string;
        recipientPhone: string;
    }
}
