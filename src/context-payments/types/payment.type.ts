type PaymentStatus = 'processed' | 'success' | 'failed';


type BillingInfo = {
  id: number;
  paymentId: number;
  amount: number;
}

type OrderPaymentResult =
  | ({ success: true; orderId: number } & { paymentId: number; billingId: number })
  | ({ success: false; orderId: number } & { error: string });
