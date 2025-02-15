export interface AddToCartCateringParam {
  prod_id: number;
  prod_image_name: string;
  prod_name: string;
  prod_qty: number;
  prod_price: number;
  prod_calc_amount: number;
  prod_flavor?: number;
  prod_flavor_id?: number;
  prod_with_drinks?: number;
  prod_size?: number;
  prod_size_id?: number;
  flavors_details?: string;
  prod_sku_id?: number;
  prod_sku?: number;
  prod_discount?: number;
  prod_category: number;
  prod_type: "main";
  is_free_item?: boolean;
}
export interface GetCateringPackageDetailsParam {
  hash: string;
}
export interface GetCategoryPackagesParam {
  region_id: number;
}

export interface GetCateringCategoryProductsParam {
  region_id: number;
}

export interface CateringCheckoutOrdersParam {
  firstName: string;
  lastName: string;
  eMail: string;
  phoneNumber: string;
  eventStartDate: string;
  eventEndDate: string;
  servingTime: string;
  eventClass: string;
  companyName: string;
  otherDetails: string;
  eventAddress: string;
  paymentPlan: string;
  payops: string;
}

export interface GetCateringOrdersParam {
  hash: string;
}

export interface UploadContractParam {
  formData: FormData;
}
export interface CateringUploadProofOfPaymentParam {
  formData: FormData;
}

export interface AddToCartProductsParam {
  products: Array<{
    prod_id: number;
    prod_image_name: string;
    prod_name: string;
    prod_qty: number;
    prod_price: number;
    prod_calc_amount: number;
    prod_flavor?: string;
    prod_flavor_id?: number;
    prod_with_drinks?: number;
    prod_size?: string;
    prod_size_id?: number;
    flavors_details?: string;
    prod_sku_id?: number;
    prod_sku?: number;
    prod_discount?: number;
    prod_category: number;
    prod_type: "main" | "addon" | "product";
    promo_discount_percentage: string | null;
  }>;
}
