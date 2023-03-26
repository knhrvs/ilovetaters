import { InfluencerPromoModel } from "./influencer-promo.model";

export interface GetAdminSettingInfluencerPromosModel {
  pagination: {
    total_rows: number;
    per_page: number;
  };
  influencer_promos: Array<InfluencerPromoModel>;
}
