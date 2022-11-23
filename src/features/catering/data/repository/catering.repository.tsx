import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { CategoryProductsModel } from "features/shop/core/domain/category-products.model";
import {
  AddToCartCateringParam,
  CateringCheckoutOrdersParam,
  GetCategoryProductsParam,
  GetCateringOrdersParam,
  GetCateringProductDetailsParam,
  UploadContractParam,
  CateringUploadProofOfPaymentParam,
} from "features/catering/core/catering.params";
import { CateringProductDetailsModel } from "features/catering/core/domain/catering-product-details.model";
import { CateringOrderModel } from "features/catering/core/domain/catering-order.model";
import { CheckoutOrdersModel } from "features/shop/core/domain/checkout-orders.model";

export interface GetCategoryProductsResponse {
  data: {
    message: string;
    data: Array<CategoryProductsModel>;
  };
}

export interface GetCateringProductDetailsResponse {
  data: {
    message: string;
    data: CateringProductDetailsModel;
  };
}

export interface AddToCartCateringResponse {
  data: {
    message: string;
  };
}

export interface RemoveItemFromCartCateringResponse {
  data: {
    message: string;
  };
}

export interface CateringCheckoutOrdersResponse {
  data: {
    message: string;
    data: CheckoutOrdersModel;
  };
}
export interface GetCateringOrdersResponse {
  data: {
    message: string;
    data: CateringOrderModel;
  };
}

export interface UploadContractResponse {
  data: {
    message: string;
  };
}

export interface CateringUploadProofOfPaymentResponse {
  data: {
    message: string;
  };
}
export function CateringUploadProofOfPaymentRepository(
  param: CateringUploadProofOfPaymentParam
): Promise<CateringUploadProofOfPaymentResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/shared/catering_upload_payment/`,
    param.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}
export function UploadContractRepository(
  param: UploadContractParam
): Promise<UploadContractResponse> {
  return axios.post(
    `${REACT_APP_DOMAIN_URL}api/catering/upload_contract/`,
    param.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
}

export function GetCateringOrdersRepository(
  param: GetCateringOrdersParam
): Promise<GetCateringOrdersResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/orders${
      param.hash ? "?hash=" + param.hash : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function CateringCheckoutOrdersRepository(
  param: CateringCheckoutOrdersParam
): Promise<CateringCheckoutOrdersResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/transaction/catering`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function RemoveItemFromCartCateringRepository(
  param: number
): Promise<RemoveItemFromCartCateringResponse> {
  return axios.delete(
    `${REACT_APP_DOMAIN_URL}api/cart/catering?item-index=${param}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function AddToCartCateringRepository(
  param: AddToCartCateringParam
): Promise<AddToCartCateringResponse> {
  return axios.post(`${REACT_APP_DOMAIN_URL}api/cart/catering`, param, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetCateringProductDetailsRepository(
  param: GetCateringProductDetailsParam
): Promise<GetCateringProductDetailsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/product${
      param.hash ? "?hash=" + param.hash : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export function GetCateringCategoryProductsRepository(
  param: GetCategoryProductsParam
): Promise<GetCategoryProductsResponse> {
  return axios.get(
    `${REACT_APP_DOMAIN_URL}api/catering/products${
      param.region_id ? "?region_id=" + param.region_id : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}
