export type Order = {
  id: number;
  product: string;
  quantity: number; 
  createdAt: Date;
  totalAmount?: number;
}