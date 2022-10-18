export interface DealModel {
  id: number;
  product_image: string;
  name: string;
  description: string;
  delivery_details: string;
  promo_price?: number;
  original_price?: number;
  discounted_price: number;
  uom: string;
  add_details: string;
  status: number;
  category: number;
  num_flavor: number;
  add_remarks: number;
  hash: string;
  note: number;
  dateadded: string;
  product_code: string;
  report_status: number;

  available_start_time?: string;
  available_end_time?: string;
  available_days?: string;
  seconds_before_expiration: string;
  minimum_purchase?: number;

  deal_id: number;
  category_name: string;
}
