import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { getSession, GetSessionState, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { ShopProductsCarousel } from "../carousels";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { getCategoryProducts, GetCategoryProductsState, selectGetCategoryProducts } from "../slices/get-category-products.slice";

export function ShopProducts(){

    const getSessionState = useAppSelector(selectGetSession);
    const getCategoryProductsState = useAppSelector(selectGetCategoryProducts);

    const dispatch = useAppDispatch();
  

    useEffect(()=>{
        dispatch(getSession());
    },[dispatch]);

    useEffect(()=>{
        if(getSessionState.status === GetSessionState.success && getSessionState.data){
            if(getSessionState.data.cache_data?.region_id){
                dispatch(getCategoryProducts({
                    region_id: getSessionState.data.cache_data.region_id,
                }));
            }
        }
    },[dispatch,getSessionState]);
    

    return (
        <main className="bg-primary pb-20 min-h-screen">
            <ShopHeaderNav/>

            <section className="container">
                <img className="sm:hidden" src={REACT_APP_UPLOADS_URL + "images/shop/hero/mobile/snackshop_delivered.webp"} alt="The best pop corn in town"></img>
                <img className="hidden sm:block" src={REACT_APP_UPLOADS_URL + "images/shop/hero/desktop/snackshop_delivered.webp"} alt="The best pop corn in town"></img>
                <img className="hidden sm:block" src={REACT_APP_UPLOADS_URL + "images/shop/instructions/snackshop_instructions.webp"} alt="The best pop corn in town"></img>
            </section>

            {
                getCategoryProductsState.data?.map((category, i)=>{ 


                    return(
                        <section key={i} className="lg:h-[620px] container lg:flex space-y-3 lg:space-y-0 mb-4">
                            
                            <div 
                                style={{
                                    backgroundImage : `url('https://ilovetaters.com/shop/assets/img/categories/${category.category_image}')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                                className={`bg-secondary ${i % 2 === 0 ? 'mr-1' : 'order-2 ml-1'} flex-none w-[455px] shadow-tertiary shadow-md rounded-[10px] mb-6 p-10 hidden lg:block relative`}>
                                
                                <h1 className="text-white text-center lg:text-start text-2xl lg:text-5xl py-3 font-['Bebas_Neue'] font-light tracking-[3px]">{category.category_name}</h1>
                            </div>
                            <div 
                            className="bg-secondary shadow-tertiary shadow-md rounded-[10px] mb-6 lg:p-10  lg:hidden">
                                <h1 className="text-white text-center lg:text-start text-2xl lg:text-5xl py-3 font-['Bebas_Neue'] font-light tracking-[3px]">{category.category_name}</h1>
                            </div>
                            
                            <div className={`flex-1 ${i % 2 === 0 ? 'lg:-mr-1' : 'lg:-ml-1'} m-0 ml-[-12px] lg:ml-0`}>
                                <ShopProductsCarousel products={category.category_products} parentIndex={i} />
                            </div>
                        </section>
                    )
                }
                )
            }



            <FooterNav/>
        </main>
    );
}