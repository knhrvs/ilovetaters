import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useAppDispatch } from "features/config/hooks";
import { getLatestUnexpiredRedeem } from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";

import { useEffect } from "react";

export function Shop() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Taters | Snackshop</title>
      </Helmet>

      <HeaderNav
        activeUrl="SNACKSHOP"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-snackshop-logo.webp",
          alt: "Taters Logo",
          className: "w-[90px] lg:w-[100px]",
        }}
      />

      <Outlet />

      <FooterNav activeUrl="SNACKSHOP" />
    </>
  );
}
