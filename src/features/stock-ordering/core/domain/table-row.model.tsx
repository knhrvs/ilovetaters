export interface TableRow {
  order_information: {
    store_name: string;
    order_number: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
    order_reviewed_date: string;
    order_confirmation_date: string;
    view_delivery_receipt: string;
    dispatch_date: string;
    order_enroute: string;
    actual_delivery_date: string;
    view_updated_delivery_receipt: string;
    billing_information_ready: boolean;
    view_payment_details: string;
    payment_confirmation: string;
  };
  product_data: {
    id: string;
    productId: string;
    productName: string;
    uom: string;
    // cost: string;
    orderQty: string;
    // currentStock: string;
    commitedQuantity: string;
    deliveredQuantity: string;
  }[];
}
