export interface OrderModel {
  order: {
    clients_info: {
      fb_user_id: number;
      fname: string;
      lname: string;
      email: string;
      address: string;
      contact_number: string;
      id: number;
      tracking_no: string;
      purchase_amount: string;
      distance_price: string;
      cod_fee: string;
      moh: number;
      payops: number;
      remarks: string;
      status: number;
      dateadded: string;
      hash_key: string;
      store: number;
      invoice_num: string;
      reseller_id: number;
      reseller_discount: string;
      discount: string;
      voucher_id: number;
      table_number: null;
      store_name: string;
      store_address: string;
      store_contact: string;
      store_person: string;
      store_email: string;
      add_name: string;
      add_contact: string;
      add_address: string;
      discount_value: null;
      voucher_code: null;
      giftcard_discount: string;
      giftcard_number: string;
    };
    order_details: Array<{
      product_id: number;
      combination_id: number;
      type: string;
      quantity: number;
      status: number;
      remarks: string;
      promo_id: number;
      promo_price: string;
      sku: null;
      sku_id: null;
      calc_price: number;
      product_price: number;
      product_image: string;
      name: string;
      description: string;
      delivery_details: string;
      uom: string;
      add_details: string;
      add_remarks: number;
      product_hash: string;
      note: null;
      product_code: string;
      product_label: string;
      addon_drink: string;
      addon_flav: string;
      addon_butter: string;
      addon_base_product: null;
      freebie_prod_name: null;
      deal_name?: string;
      deal_description?: string;
      promo_discount_percentage?: string;
    }>;
    deals_details: Array<{
      name: string;
      product_image: string;
      quantity: number;
      remarks: string | null;
      price: number;
    }>;
    personnel: {
      name: string;
      contact_number: string;
    };
    bank: {
      id: number;
      store_id: number;
      bank_name: string;
      bank_account_name: string;
      bank_account_num: string;
      indicator: number;
      moh_type: number;
      status: number;
      payment_type: number;
      sms_notes_customer: string;
      sms_notes_reseller: string;
      confirm_msg_customer: string;
      confirm_msg_reseller: string;
      qr_code: string;
    };
  };
  grand_total: number;
  delivery_fee: string;
  cod_fee: string;
  firstname: string;
  lastname: string;
  delivery_hours: string;
  subtotal: string;
}
