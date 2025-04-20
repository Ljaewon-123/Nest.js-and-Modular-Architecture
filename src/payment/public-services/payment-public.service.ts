import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderPublicService {
  // Add your public service methods here
  getPublicOrderDetails(orderId: string): string {
    return `Public details for order ${orderId}`;
  }
}
