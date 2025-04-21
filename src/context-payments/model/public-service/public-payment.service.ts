import { Injectable } from "@nestjs/common";

@Injectable()
export class PublicPaymentService {
  // Add your service methods and properties here
  constructor() {
    // Initialization code if needed
  }

  // Example method
  public async processPayment(amount: number): Promise<string> {
    // Logic to process payment
    return `Payment of ${amount} processed successfully.`;
  }
}