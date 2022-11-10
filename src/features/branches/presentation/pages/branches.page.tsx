import { useAppDispatch } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";
import { useEffect } from "react";
import { BranchesList } from "../component/branches-list";

export function Branches() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(storeReset());
  }, [dispatch]);

  return (
    <>
      <HeaderNav
        activeUrl="BRANCHES"
        className="hidden lg:block"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.png",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />
      <BranchesList />
      <FooterNav activeUrl="BRANCHES" />
    </>
  );
}
