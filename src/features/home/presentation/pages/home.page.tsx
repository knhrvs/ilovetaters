import { FooterNav, HeaderNav } from "features/shared/presentation/components";
import { useEffect, useRef, useState } from "react";
import {
  REACT_APP_DOMAIN_URL,
  SERVICES_DESKTOP,
  SERVICES_MOBILE,
} from "features/shared/constants";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "features/config/hooks";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { storeReset } from "features/shared/presentation/slices/store-reset.slice";

export function Home() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(storeReset());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <main className="min-h-screen bg-primary">
      <HeaderNav
        activeUrl="HOME"
        className="hidden lg:block"
        logoProps={{
          src:
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shared/logo/taters-logo.webp",
          alt: "Taters Logo",
          className: "w-[150px] lg:w-[120px]",
        }}
      />

      <section
        style={{
          backgroundImage: `url('${REACT_APP_DOMAIN_URL}api/assets/images/home/hero/mobile/taters_entertainment_snacks.webp')`,
          backgroundSize: "contain",
          backgroundPositionX: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative items-end justify-center sm:hidden "
      >
        <img
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/home/hero/mobile/taters_entertainment_snacks.webp"
          }
          alt="The best pop corn in town"
          style={{ visibility: "hidden" }}
        ></img>
      </section>
      <img
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/home/hero/desktop/taters_entertainment_snacks_black.webp"
        }
        className="hidden w-full sm:block"
        alt="The best pop corn in town"
      ></img>
      <section className="container lg:mx-auto pb-[100px] grid-cols-3 gap-4 pt-4 hidden sm:grid">
        {SERVICES_DESKTOP.map(function (service_desktop, i) {
          return (
            <div key={i}>
              <div className=" sm:h-[300px] lg:h-[500px] text-white">
                <a href={service_desktop.url} key={i}>
                  <div
                    style={{
                      backgroundImage: `url("${
                        REACT_APP_DOMAIN_URL + service_desktop.image
                      }")`,
                      backgroundPosition: service_desktop.backgroundPosition,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                    className=" h-full flex items-end bg-gray-400 cursor-pointer rounded-[1rem] shadow-md shadow-[#ffcd17]"
                  >
                    <div
                      className="w-full px-6 pt-14 pb-3 rounded-b-[1rem]"
                      style={{
                        background: `linear-gradient(transparent 0%, ${service_desktop.color} 45%, ${service_desktop.color} 100%)`,
                        lineHeight: "14px",
                        color: service_desktop.textColor,
                      }}
                    >
                      <h4 className="text-lg leading-3 font-['Bebas_Neue'] tracking-[1px] ">
                        {service_desktop.title}
                      </h4>
                      <p className="text-xs">{service_desktop.subtitle}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <section className="container grid grid-cols-2 gap-4 pt-4 sm:hidden pb-[90px]">
        {SERVICES_MOBILE.map(function (service_mobile, i) {
          return (
            <div key={i}>
              <div key={i} className="h-[250px] sm:h-[300px] text-white">
                <Link to={service_mobile.url}>
                  <div
                    style={{
                      backgroundImage: `url("${
                        REACT_APP_DOMAIN_URL + service_mobile.image
                      }")`,
                      backgroundPosition: service_mobile.backgroundPosition,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      position: "relative",
                    }}
                    className="shadow-md shadow-[#ffcd17] h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]"
                  >
                    <div
                      className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem] "
                      style={{
                        background: `linear-gradient(transparent 0%, ${service_mobile.color} 45%, ${service_mobile.color} 100%)`,
                        lineHeight: "14px",
                        color: service_mobile.textColor,
                      }}
                    >
                      <h4 className="text-[20px] font-['Bebas_Neue'] tracking-[1px]">
                        {service_mobile.title}
                      </h4>
                      <p className="text-[10px] font-semibold">
                        {service_mobile.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      <FooterNav activeUrl="HOME"></FooterNav>
    </main>
  );
}
