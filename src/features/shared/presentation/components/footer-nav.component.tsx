import { useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import { selectGetAllPlatform } from "features/popclub/presentation/slices/get-all-platform.slice";
import MoreDrawer from "./more-drawer.component";
import { MessageModal } from "../modals";
import { selectGetSession } from "../slices/get-session.slice";

interface FooterNavProps {
  activeUrl: "SNACKSHOP" | "CATERING" | "POPCLUB" | "BRANCHES" | "HOME";
}

export function FooterNav(props: FooterNavProps) {
  const navigate = useNavigate();
  const getAllPlatformState = useAppSelector(selectGetAllPlatform);
  const getSessionState = useAppSelector(selectGetSession);

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);

  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);

  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  const [
    openMessageModalWhenSwitchingTabWhenCacheDataExist,
    setOpenMessageModalWhenSwitchingTabWhenCacheDataExist,
  ] = useState<{
    status: boolean;
    message: string;
    url?: string;
    onYes?: () => void;
  }>({
    status: false,
    message: "",
  });

  const handleSwitchTab = (param: {
    url?: string;
    tabName: string;
    onYes?: () => void;
  }) => {
    if (
      getSessionState.data &&
      getSessionState.data.cache_data &&
      getSessionState.data.customer_address
    ) {
      setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
        status: true,
        url: param.url,
        onYes: param.onYes,
        message: `This would remove all your cart items, store selection and send you to the ${param.tabName} home page. Are you sure you want to proceed?`,
      });
    } else {
      if (param.url) navigate(param.url);
      if (param.onYes) param.onYes();
    }
  };

  return (
    <>
      <section className="fixed bottom-0 z-[2003]  w-full">
        <footer className="w-full shadow-l-2xl lg:hidden bg-secondary">
          <nav className="mx-auto ">
            <ul className="flex items-stretch h-full py-1 text-white md:px-10">
              <li className="flex-1">
                <div
                  onClick={() => handleSwitchTab({ url: "/", tabName: "home" })}
                  className="flex flex-col items-center justify-center h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/home${
                      props.activeUrl === "HOME" ? "-active" : ""
                    }.webp`}
                    className="w-[28px] sm:w-[40px]"
                    alt="Tater home icon"
                  />
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "HOME"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Home
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() => {
                    handleSwitchTab({
                      onYes: () => {
                        setOpenPlatformChooserModal(true);
                      },
                      tabName: "popclub",
                    });
                  }}
                  className="flex flex-col items-center justify-center h-full pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/popclub${
                      props.activeUrl === "POPCLUB" ? "-active" : ""
                    }.webp`}
                    className="w-[20px] sm:w-[24px]"
                    alt="Tater home icon"
                  />
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "POPCLUB"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Popclub
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/shop", tabName: "snackshop" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/snackshop${
                      props.activeUrl === "SNACKSHOP" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "SNACKSHOP"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Snackshop
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/catering", tabName: "catering" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/catering${
                      props.activeUrl === "CATERING" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "CATERING"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Catering
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/branches", tabName: "branches" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-1"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/branches${
                      props.activeUrl === "BRANCHES" ? "-active" : ""
                    }.webp`}
                    className="w-[18px] sm:w-[25px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "BRANCHES"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Branches
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <MoreDrawer />
              </li>
            </ul>
          </nav>
        </footer>
      </section>

      <PlatformChooserModal
        platforms={getAllPlatformState.data}
        onSelectedPlatform={(platform: string) => {
          switch (platform) {
            case "store-visit":
              setOpenStoreVisitStoreChooserModal(true);
              break;
            case "online-delivery":
              setOpenStoreChooserModal(true);
              break;
          }
        }}
        open={openPlatformChooserModal}
        onClose={() => {
          setOpenPlatformChooserModal(false);
        }}
      />

      <StoreChooserModal
        open={openStoreChooserModal}
        onClose={() => {
          setOpenStoreChooserModal(false);
        }}
      ></StoreChooserModal>

      <StoreVisitStoreChooserModal
        open={openStoreVisitStoreChooserModal}
        onClose={() => {
          setOpenStoreVisitStoreChooserModal(false);
        }}
      />

      <MessageModal
        open={openMessageModalWhenSwitchingTabWhenCacheDataExist.status}
        onClose={() => {
          setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
            status: false,
            message: "",
            url: undefined,
            onYes: undefined,
          });
        }}
        onYes={() => {
          setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
            status: false,
            message: "",
            url: undefined,
            onYes: undefined,
          });
          if (openMessageModalWhenSwitchingTabWhenCacheDataExist.url)
            navigate(openMessageModalWhenSwitchingTabWhenCacheDataExist.url);

          if (openMessageModalWhenSwitchingTabWhenCacheDataExist.onYes)
            openMessageModalWhenSwitchingTabWhenCacheDataExist.onYes();
        }}
        message={openMessageModalWhenSwitchingTabWhenCacheDataExist.message}
      />
    </>
  );
}
