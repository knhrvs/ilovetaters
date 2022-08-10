import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav, HeaderNav } from "features/shared";
import { SearchAddress } from "features/shared/presentation/components/inputs/search-address";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { StoreListDelivery } from "../components/store-list-delivery";
import { getSession, selectGetSession } from "../../../shared/presentation/slices/get-session.slice";
import { getStoresAvailable } from "features/shared/presentation/slices/get-stores-available-slice";

export function Shop(){
    const dispatch = useAppDispatch();
    const [address, setAddress] = useState<any>('');
    const getSessionState = useAppSelector(selectGetSession);
    
    useEffect(()=>{
        dispatch(getSession());
    },[]);

    useEffect(()=>{
        if(getSessionState.data?.customer_address !== null){
            setAddress(getSessionState.data?.customer_address);
        }
    },[]);

    return (
        <main className="bg-primary">
            <HeaderNav serviceReached={true} active='SNACKSHOP' sticky/>
            
            <img className="lg:hidden" src={REACT_APP_DOMAIN_URL + "uploads/images/shop/hero/mobile/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>
            <img className="hidden lg:block" src={REACT_APP_DOMAIN_URL + "uploads/images/shop/hero/desktop/snackshop_landing_page_banner.webp"} alt="The best pop corn in town"></img>

            <section className=" container mx-auto min-h-screen">


                <div className='flex items-center justify-center mb-3'>
                    <label className="pure-material-textfield-outlined w-[96%]">
                        <SearchAddress onPlaceSelected={( place : string)=>{
                            setAddress(place);
                            dispatch(getStoresAvailable({address: place}));
                        }}/>
                        <span>Search Address</span>
                    </label>
                </div>

                <StoreListDelivery address={address}/>

            </section>

            <FooterNav/>
        </main>
    );
}