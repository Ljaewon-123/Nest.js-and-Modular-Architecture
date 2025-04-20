export class Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: string;

  constructor(
    id: string,
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    status: string
  ) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}