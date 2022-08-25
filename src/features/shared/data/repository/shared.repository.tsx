import axios from "axios"
import { SessionModel } from "features/shared/core/domain/session.model";
import { StoreModel } from "features/shared/core/domain/store.model";
import {  AddContactParam, FacebookLoginPointParam, GetStoresAvailableParam, SetSessionParam, SetStoreAndAddressParm, UploadProofOfPaymentParam } from "features/shared/core/shared.params";
import { REACT_APP_DOMAIN_URL } from '../../constants';

export interface GetStoresAvailableResponse{
    data: {
        message: string;
        data: Array<StoreModel>;
    }
}

export interface SetStoreAndAddressResponse{
    data: {
        message: string;
    }
}

export interface GetSessionResponse{
    data: {
        data: SessionModel;
        message: string;
    }
}

export interface SetSessionResponse{
    data: {
        message: string;
    }
}

export interface FacebookLoginResponse{
    data: {
        url: string;
        result: boolean;
    }
}

export interface FacebookLoginPointResponse{
    data: {
        message: string;
    }
}

export interface FacebookLogoutResponse{
    data: {
        message: string;
    }
}

export interface StoreResetResponse{
    data: {
        message: string;
    }
}

export interface RemoveItemFromCartResponse{
    data: {
        message: string;
    }
}

export interface UploadProofOfPaymentResponse{
    data: {
        message: string;
    }
}

export interface GetContactsResponse{
    data: {
        message: string;
    }
}

export interface AddContactResponse{
    data: {
        message: string;
    }
}

export function AddContactRepository(param: AddContactParam): Promise<AddContactResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/shared/contacts`, param,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function GetContactsRepository(): Promise<GetContactsResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/contacts`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function UploadProofOfPaymentRepository(param: UploadProofOfPaymentParam): Promise<UploadProofOfPaymentResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/shared/upload_payment/`,param.formData,{
        headers: {
            'Content-Type' : 'multipart/form-data'
        },
        withCredentials: true,
    });
}

export function RemoveItemFromCartRepository(param: number): Promise<RemoveItemFromCartResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/cart/delete/${param}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function StoreResetRepository(): Promise<StoreResetResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/store/reset/`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function FacebookLogoutRepository(): Promise<FacebookLogoutResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/logout/`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function FacebookLoginPointRepository(param: FacebookLoginPointParam): Promise<FacebookLoginPointResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
        fb_login_point: param.currentUrl
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function FacebookLoginRepository(): Promise<FacebookLoginResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
}

export function GetStoresAvailableRepository(param: GetStoresAvailableParam) : Promise<GetStoresAvailableResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/store${param.address ? '?address=' + param.address : ''}`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetStoreAndAddressRepository(param: SetStoreAndAddressParm) : Promise<GetStoresAvailableResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/store`,param,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function GetSessionRepository(): Promise<GetSessionResponse>{
    return axios.get(`${REACT_APP_DOMAIN_URL}api/shared/session`,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}

export function SetSessionRepository(param: SetSessionParam): Promise<GetSessionResponse>{
    return axios.post(`${REACT_APP_DOMAIN_URL}api/shared/session`, {'session' : param},{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials : true,
    });
}
