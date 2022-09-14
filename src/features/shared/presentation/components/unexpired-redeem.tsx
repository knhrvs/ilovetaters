import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getLatestUnexpiredRedeem,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect } from "react";
import { CountdownTimerLatestRedeem } from "features/popclub/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { selectFacebookLogout } from "../slices/facebook-logout.slice";

export function UnExpiredRedeem() {
  const dispatch = useAppDispatch();
  const { hash } = useParams();

  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const getSessionState = useAppSelector(selectGetSession);

  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch, getLatestUnexpiredRedeemState]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
  }, [facebookLogoutState, dispatch]);

  return (
    <>
      {getLatestUnexpiredRedeemState.data ? (
        <div
          className={`fixed z-[2003] bottom-[70px]  ${
            getSessionState.data &&
            getSessionState.data.cache_data &&
            getSessionState.data.customer_address &&
            getSessionState.data.cache_data.store_name
              ? "sm:top-[80px] lg:top-[100px]"
              : "sm:top-[70px] lg:top-[80px]"
          } h-[90px] w-full ${
            hash === getLatestUnexpiredRedeemState.data.deal_hash
              ? "hidden"
              : ""
          }`}
        >
          <div className="container flex items-start justify-end h-full">
            <Link
              to={
                "/popclub/deal/" + getLatestUnexpiredRedeemState.data.deal_hash
              }
              className="text-white block w-full sm:w-[400px]"
            >
              <div className="flex h-full justify-start items-start">
                <div className="flex flex-col items-stretch flex-1 max-h-[75px] sm:max-h-fit min-h-[75px]  rounded-l-xl shadow-lg bg-secondary">
                  <div className="flex-1 px-4 py-2 text-xs h-full overflow-auto sm:overflow-hidden">
                    <span
                      className="font-bold"
                      dangerouslySetInnerHTML={{
                        __html: getLatestUnexpiredRedeemState.data.remarks,
                      }}
                    />
                  </div>
                  <div>
                    <CountdownTimerLatestRedeem />
                  </div>
                </div>
                <img
                  className="object-contain rounded-r-xl h-[75px] w-[75px]"
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getLatestUnexpiredRedeemState.data.product_image}`}
                  alt="Deals"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
