import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "features/config/store";
import { DealProductVariantsModel } from "features/popclub/core/domain/deal_product_variants.model";
import { PlatformModel } from "features/popclub/core/domain/platform.model";
import { ProductVariantModel } from "features/popclub/core/domain/product_variant.model";
import { RedeemDealModel } from "features/popclub/core/domain/redeem_deal.model";
import { GetDealProductVariantsParam, RedeemDealParam } from "features/popclub/core/popclub.params";
import { GetAllPlatformRepository, GetAllPlatformRepositoryResponse, GetDealProductVariantsRepository, GetDealProductVariantsResponse, RedeemDealRepository, RedeemDealResponse } from "features/popclub/data/repository/popclub.repository";

export enum RedeemDealSite{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: RedeemDealSite,
    data: RedeemDealModel | null | undefined
} = {
    status: RedeemDealSite.initial,
    data: undefined,
}

export const redeemDeal = createAsyncThunk('redeemDeal',
    async (param: RedeemDealParam) => {
        const response : RedeemDealResponse = await RedeemDealRepository(param);
        return response.data;
    }
)

/* Main Slice */
export const redeemDealSlice = createSlice({
    name:'redeemDeal',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(redeemDeal.pending, (state: any)=>{
            state.status = RedeemDealSite.inProgress;
        }).addCase(redeemDeal.fulfilled, (state: any, action : PayloadAction<{message: string, data: RedeemDealModel}> ) => {
            const data = action.payload.data;

            console.log(action.payload.message);
            
            
            state.data = data;
            state.status = RedeemDealSite.success;
        })
    }
});



export const selectRedeemDeal = (state : RootState) => state.redeemDeal;

export default redeemDealSlice.reducer;