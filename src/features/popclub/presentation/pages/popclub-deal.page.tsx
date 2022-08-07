import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { HeaderNav } from "features/shared";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeal, GetDealState, selectGetDeal } from "../slices/get-deal.slice";
import axios from "axios"
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { getDealProductVariants, GetDealProductVariantsState, resetGetDealProductVariantsState, selectGetDealProductVariants } from "../slices/get-deal-product-variants.slice";
import { VariantsChooserModal } from "../modals/variants-chooser.modal";
import { CountdownTimer } from "../components";
import { redeemDeal, RedeemDealState, resetRedeemDeal, selectRedeemDeal } from "../slices/redeem-deal.slice";
import { getRedeem, GetRedeemState, selectGetRedeem } from "../slices/get-redeem.slice";
import { resetGetRedeem } from "../slices/get-redeem.slice";

export function PopClubDeal(){
    const getDealState = useAppSelector(selectGetDeal);
    const getDealProductVariantsState = useAppSelector(selectGetDealProductVariants);
    const redeemDealState = useAppSelector(selectRedeemDeal);
    const getRedeemState = useAppSelector(selectGetRedeem);

    const dispatch = useAppDispatch();
    let { hash } = useParams();

    const getSessionState = useAppSelector(selectGetSession);
    
    const [openVariantChooserModal, setOpenVariantChooserModal ] = useState(false);

    useEffect(()=>{
        if(
            getDealState.status === GetDealState.success &&
            getDealProductVariantsState.status === GetDealProductVariantsState.success
        ){
            if(getDealProductVariantsState.data?.length > 0){
                setOpenVariantChooserModal(true);
            }else{
                if(getDealState.data?.hash){
                    dispatch(redeemDeal({
                        hash: getDealState.data?.hash,
                    }));
                    dispatch(resetGetDealProductVariantsState());
                }
            }
        }
    },[getDealProductVariantsState, dispatch, getDealState]);

    useEffect(()=>{
        dispatch(resetGetRedeem());
    },[]);

    useEffect(()=>{
        
        if(
            getDealState.status === GetDealState.success &&
            getDealState.data && redeemDealState.status === RedeemDealState.success
            ){
            dispatch(getRedeem({
                deal_id : getDealState.data.id
            }));
            dispatch(resetRedeemDeal());
        }
        
    },[redeemDealState, dispatch, getDealState]);


    useEffect(()=>{
        
        
        if(
            getDealState.status === GetDealState.success &&
            getDealState.data && getRedeemState.status === GetRedeemState.initial
            ){
            dispatch(getRedeem({
                deal_id : getDealState.data.id
            }));
        }

    },[getDealState, dispatch, getRedeemState]);

    useEffect(()=>{
        dispatch(getSession());
    },[dispatch]);

    
    useEffect(()=>{
        if(hash){
            dispatch(getDeal(hash));
        }
    },[dispatch, hash]);

    const handleRedeem =()=>{
        if(hash){
            dispatch(getDealProductVariants({
                hash,
            }));
        }
    }
    

    const loginToRedeem = () => {
        axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(function (response: any) {
            const facebookURL = response.data.url;
            
            if (response.data.result === false) {
                axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
                    fb_login_point: window.location.href 
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }).then(()=>{
                    window.location.href = facebookURL;
                });
            }
            
        })
    }

    const redeemButton =()=> {
        if(
            getSessionState.data?.userData && 
            getRedeemState.status === GetRedeemState.success &&
            getRedeemState.data){
            return (
                <div className="bg-green-700 text-white py-3 w-full uppercase border border-white rounded">CODE : 
                    <span className="font-bold ml-1">{getRedeemState.data.redeem_code}</span>
                </div>
            );
        }
        if(getSessionState.data?.userData){
            return(
                <button className="bg-primary text-white py-3 w-full uppercase border border-white rounded" onClick={handleRedeem}>Redeem</button>
            );
        } else if (getSessionState.data?.userData === null){
            return(
                <button className="bg-primary text-white py-3 w-full uppercase border border-white rounded" onClick={loginToRedeem}>Login to Redeem</button>
            );
        }
    }
    


    return(
        <>
            <section className='bg-primaryDark relative min-h-screen flex flex-col'>
                <HeaderNav serviceReached={true} active='POPCLUB' sticky></HeaderNav>
                <div className="text-white text-center font-['Bebas_Neue'] tracking-[4px] pt-2 text-xl">{getDealState.data?.category_name}</div>

                <section className="mx-auto lg:w-[40%] flex-1 flex flex-col">
                    <div className="relative flex w-full flex-1 flex-col bg-primaryDark shadow-lg pb-10 ">
                        { getDealState.data?.original_price && getDealState.data?.promo_price ? 
                            <div className="absolute top-0 left-0">
                                <div className=" text-[14px] bg-yellow-500 pl-2 pr-4 text-white rounded-r-[4px] mt-3 mb-[2px] font-bold">{Math.floor(((getDealState.data?.original_price - getDealState.data?.promo_price) / getDealState.data?.original_price) * 100)}% OFF</div>
                                <div className=" bg-red-500 pl-2 text-white rounded-r-[4px] pr-2 leading-5 py-[3px]">
                                    <div className="text-left text-[14px] font-normal line-through mb-[1px]">₱{getDealState.data?.original_price}</div>
                                    <span className='text-[28px] font-bold'> ₱{getDealState.data?.promo_price}</span>
                                </div>
                            </div> : null }
                        { getDealState.data?.product_image ? 
                            <img src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getDealState.data?.product_image}`} alt='Deals'/> : null
                        }
                        <CountdownTimer></CountdownTimer>
                        <div className="p-4 flex-col space-y-4">
                            <h1 className="text-white whitespace-pre-wrap font-['Bebas_Neue'] tracking-[3px] text-3xl ">{getDealState.data?.name}</h1>
                            <h1 className="text-white text-lg">{getDealState.data?.description}</h1>

                            <div className="text-center">
                                {redeemButton()}
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <VariantsChooserModal open={openVariantChooserModal} onClose={()=>{

            }}></VariantsChooserModal>
        </>
    );
}