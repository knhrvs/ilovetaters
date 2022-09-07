export interface CateringOrderModel {
  status: number;
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
      company_name: string;
      message: string;
      serving_time: string;
      event_class: string;
      dateadded: string;
      hash_key: string;
      store: number;
      invoice_num: string;
      discount: string;
      payment_plan: string;
      initial_payment: number;
      final_payment: number;
      final_payment_proof: string;
      contract: number;
      uploaded_contract: string;
      start_datetime: string;
      end_datetime: string;
      night_diff_fee: number;
      store_name: string;
      store_address: string;
      store_contact: string;
      store_person: string;
      store_email: string;
      add_name: string;
      add_contact: string;
      add_address: string;
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
      sku: string;
      sku_id: number;
      calc_price: string;
      product_price: string;
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
      category: number;
      product_label: string;
      freebie_prod_name: string;
    }>;

    addons: Array<{
      product_id: number;
      combination_id: number;
      type: string;
      quantity: number;
      status: number;
      remarks: string;
      promo_id: number;
      promo_price: string;
      sku: string;
      sku_id: number;
      calc_price: string;
      product_price: string;
      product_image: string;
      name: string;
      description: string;
      delivery_details: string;
      uom: string;
      add_details: string;
      add_remarks: number;
      product_hash: string;
      category: number;
      note: null;
      product_code: string;
      product_label: string;
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

  package_selection: Array<{
    product_id: number;
    combination_id: number;
    type: string;
    quantity: number;
    status: number;
    remarks: string;
    promo_id: number;
    promo_price: "";
    sku: string;
    sku_id: number;
    calc_price: string;
    product_price: string;
    product_image: string;
    name: string;
    description: string;
    delivery_details: string;
    add_remarks: number;
    product_hash: string;
    note: null;
    product_code: string;
    category: number;
    product_label: string;
    freebie_prod_name: null;
    flavors: Array<{
      name: string;
      quantity: number;
    }>;
  }>;

  firstname: string;
  lastname: string;
  grand_total: number;
  subtotal: string;
  service_fee: number;
  cod_fee: string;
  package_price: number;
  service_charge: number;
  transportation_fee: string;
  additional_hour_fee: string;
  night_diff_charge: number;
  no_of_pax: number;
  date_of_event: string;
  event_date_and_time: string;
  serving_time: string;
}
