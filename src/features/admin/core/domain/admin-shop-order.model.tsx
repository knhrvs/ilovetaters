export interface AdminShopOrderModel {
  id: number;
  status: number;
  dateadded: string;
  tracking_no: string;
  purchase_amount: string;
  distance_price: string;
  discount: string | null;
  discount_name: string | null;
  discount_percentage: string | null;
  reseller_discount: string;
  giftcard_discount: string;
  cod_fee: string;
  invoice_num: string;
  client_name: string;
  add_name: string;
  payops: number;
  email: string;
  contact_number: string;
  address: string;
  add_address: string;
  store_name: string;
  payment_proof: string;
  reference_num: string;
  store: number;
  fb_user_id: number | null;
  mobile_user_id: number | null;
  items: Array<{
    price: number | null;
    product_price: number | null;
    quantity: number;
    remarks: string;
    name: string;
    description: string;
    add_details: string;
    product_label?: string;
    alias?: string;

    deal_name?: string;
    deal_description?: string;
    promo_discount_percentage?: string;
  }>;
}
