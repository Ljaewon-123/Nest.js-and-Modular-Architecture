export class Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: string;

  constructor(
    id: string,
    orderId: string,
    amount: number,
    paymentMethod: string,
    status: string
  ) {
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
}