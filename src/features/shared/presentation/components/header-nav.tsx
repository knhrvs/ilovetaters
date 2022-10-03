import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { TABS } from "features/shared/constants";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { ShopCartModal } from "../../../shop/presentation/modals";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import NumberFormat from "react-number-format";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  facebookLogout,
  selectFacebookLogout,
} from "features/shared/presentation/slices/facebook-logout.slice";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "features/popclub/presentation/slices/get-all-platform.slice";
import { CateringCartModal } from "features/catering/presentation/components/catering-cart.modal";
import { MdLocationPin } from "react-icons/md";
import { FaShoppingBag, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { MessageModal } from "../modals";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { ListItemIcon, ListItemText } from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { GiPopcorn } from "react-icons/gi";

interface HeaderNavProps {
  className?: string;
  activeUrl:
    | "PROFILE"
    | "SNACKSHOP"
    | "CATERING"
    | "POPCLUB"
    | "HOME"
    | "BRANCHES"
    | "FRANCHISING";
  logoProps: {
    src: string;
    alt: string;
    className: string;
  };
}

export function HeaderNav(props: HeaderNavProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [openShopCartModal, setOpenShopCartModal] = useState(false);
  const [openCateringCartModal, setOpenCateringCartModal] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const getSessionState = useAppSelector(selectGetSession);
  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const dispatch = useAppDispatch();

  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openPlatformChooserModal) dispatch(getAllPlatform());
  }, [dispatch, openPlatformChooserModal]);

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
    setOpen(false);

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

  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(event.currentTarget);
    setOpenProfileMenu(event.currentTarget);
  };

  const handleMyProfile = () => {
    setOpenProfileMenu(null);
    navigate("/profile");
  };

  const handleSnackshopOrders = () => {
    setOpenProfileMenu(null);
    navigate("/profile/snackshop-orders");
  };

  const handleCateringBooking = () => {
    setOpenProfileMenu(null);
    navigate("/profile/catering-bookings");
  };

  const handlePopClubRedeem = () => {
    setOpenProfileMenu(null);
    navigate("/profile/popclub-redeems");
  };

  const handleLogout = () => {
    setOpenProfileMenu(null);

    if (currentLocation.pathname === "/profile") {
      dispatch(facebookLogout());
      navigate("/");
    } else {
      dispatch(facebookLogout());
    }
  };

  useEffect(() => {
    dispatch(getSession());
  }, [facebookLogoutState, dispatch]);

  const handleCart = () => {
    switch (props.activeUrl) {
      case "SNACKSHOP":
        setOpenShopCartModal(true);
        break;
      case "POPCLUB":
        setOpenShopCartModal(true);
        break;
      case "PROFILE":
        setOpenShopCartModal(true);
        break;
      case "CATERING":
        setOpenCateringCartModal(true);
        break;
    }
  };

  const calculateCartQuantity = () => {
    let calculatedQuantity = 0;

    if (getSessionState.data?.orders) {
      calculatedQuantity += getSessionState.data.orders.length;
    }

    if (getSessionState.data?.deals) {
      calculatedQuantity += getSessionState.data.deals.length;
    }

    return calculatedQuantity;
  };

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;
    const deals = getSessionState.data?.deals;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
    }

    if (deals) {
      for (let i = 0; i < deals.length; i++) {
        calculatedPrice += deals[i].deal_promo_price;
      }
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const profileMenu = [
    {
      id: 1,
      text:
        getSessionState.data?.userData.first_name +
        " " +
        getSessionState.data?.userData.last_name,
      icon: <FaUserAlt />,
      action: handleMyProfile,
    },
    {
      id: 2,
      text: "Snack Shop Orders",
      icon: <FaShoppingBag />,
      action: handleSnackshopOrders,
    },
    {
      id: 3,
      text: "Catering Bookings",
      icon: <RiShoppingBag3Fill />,
      action: handleCateringBooking,
    },
    {
      id: 4,
      text: "Popclub Redeems",
      icon: <GiPopcorn />,
      action: handlePopClubRedeem,
    },
    {
      id: 5,
      text: " Logout",
      icon: <BiLogOut />,
      action: handleLogout,
    },
  ];

  const menuList = profileMenu.map((item) => {
    const { text, icon, action, id } = item;

    return (
      <>
        <MenuItem onClick={action} className="bg-secondary">
          <ListItemIcon className="text-[20px] sm:text-xl">{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </MenuItem>
        {id === 1 || id === 4 ? <hr /> : null}
      </>
    );
  });

  return (
    <>
      <header className={`sticky w-full top-0 z-20 ${props.className}`}>
        <div className={` w-full bg-primary shadow-2xl`}>
          <nav
            className={`flex justify-between items-center container py-2 h-[64px]`}
          >
            <Link to={"/"}>
              <img {...props.logoProps} alt="Taters Logo" />
            </Link>

            <div className="flex items-center justify-center pt-3 space-x-4">
              <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden lg:flex">
                <li
                  className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                    "HOME" === props.activeUrl ? "text-tertiary" : "text-white"
                  }`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleSwitchTab({
                        url: "/",
                        tabName: "HOME",
                      });
                    }}
                  >
                    Home
                  </div>
                </li>

                <li
                  className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                    "BRANCHES" === props.activeUrl
                      ? "text-tertiary"
                      : "text-white"
                  }`}
                >
                  <Link
                    to="/branches"
                    className="cursor-pointer"
                    onClick={() => {
                      handleSwitchTab({
                        url: "/",
                        tabName: "BRANCHES",
                      });
                    }}
                  >
                    Branches
                  </Link>
                </li>

                <li className="flex items-center justify-center px-4 pb-1">
                  <button
                    ref={anchorRef}
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    className={`font-['Bebas_Neue'] tracking-[4px] ${
                      "HOME" !== props.activeUrl &&
                      "BRANCHES" !== props.activeUrl
                        ? "text-tertiary"
                        : "text-white"
                    } text-lg font-light`}
                    onMouseEnter={handleToggle}
                    onMouseLeave={handleToggle}
                    onClick={handleToggle}
                  >
                    Services
                  </button>
                  <Popper
                    open={open}
                    onMouseEnter={handleToggle}
                    onMouseLeave={handleToggle}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={() => {
                              setOpen(false);
                            }}
                          >
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              {TABS.map((tab, i) => {
                                return (
                                  <>
                                    {tab.name === "POPCLUB" ? (
                                      <MenuItem
                                        onClick={() => {
                                          handleSwitchTab({
                                            onYes: () => {
                                              setOpenPlatformChooserModal(true);
                                            },
                                            tabName: "popclub",
                                          });
                                        }}
                                      >
                                        {tab.name}
                                      </MenuItem>
                                    ) : (
                                      <MenuItem
                                        onClick={() => {
                                          handleSwitchTab({
                                            url: tab.url,
                                            tabName: tab.name.toLowerCase(),
                                          });
                                        }}
                                      >
                                        {tab.name}
                                      </MenuItem>
                                    )}
                                  </>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </li>
              </ul>
              {/* <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden lg:flex">
                {TABS.map((tab, i) => {
                  return (
                    <li
                      key={i}
                      className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                        tab.name === props.activeUrl
                          ? "text-tertiary"
                          : "text-white"
                      }`}
                    >
                      {tab.name === "POPCLUB" ? (
                        <div
                          className="tracking-[4px] cursor-pointer"
                          onClick={() => {
                            handleSwitchTab({
                              onYes: () => {
                                setOpenPlatformChooserModal(true);
                              },
                              tabName: "popclub",
                            });
                          }}
                        >
                          {tab.name}
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            handleSwitchTab({
                              url: tab.url,
                              tabName: tab.name.toLowerCase(),
                            });
                          }}
                        >
                          {tab.name}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul> */}
              <div className="flex items-center justify-center space-x-3 lg:space-x-6">
                {getSessionState.data?.userData ? (
                  <div>
                    <button
                      aria-controls={
                        Boolean(openProfileMenu) ? "basic-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        Boolean(openProfileMenu) ? "true" : undefined
                      }
                      onClick={handleProfileMenuClick}
                      className="flex flex-col items-center justify-center pb-2 space-y-1 "
                    >
                      {getSessionState.data?.userData.login_type ===
                      "mobile" ? (
                        <FaUserCircle className="text-2xl text-white" />
                      ) : (
                        <img
                          src={getSessionState.data?.userData.picture}
                          alt="Profile pic"
                          className="rounded-full mt-[2px]"
                          width={30}
                        />
                      )}
                      {/* <span className="text-xs font-light text-white">
                        {getSessionState.data?.userData.first_name}{" "}
                        {getSessionState.data?.userData.last_name}
                      </span> */}
                    </button>
                    <Menu
                      anchorEl={openProfileMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(openProfileMenu)}
                      onClose={() => setOpenProfileMenu(null)}
                    >
                      {menuList}
                      {/* <MenuItem
                        onClick={handleMyProfile}
                        className="bg-secondary"
                      >
                        My Profile
                      </MenuItem>
                    
                      <MenuItem onClick={handleLogout} 
                      className="bg-secondary">
                        
                        Logout
                      </MenuItem> */}
                    </Menu>
                  </div>
                ) : getSessionState.data?.userData === null ? (
                  <>
                    <button
                      onClick={() => setOpenLoginChooserModal(true)}
                      className="flex flex-col items-center justify-center mt-1 space-y-1 text-white rounded-xl"
                    >
                      <AiOutlineUser className="text-2xl " />
                      <span className="tracking-[2px] text-xs font-light">
                        Sign In
                      </span>
                    </button>
                  </>
                ) : null}
                {getSessionState.data?.cache_data &&
                (props.activeUrl === "CATERING" ||
                  props.activeUrl === "SNACKSHOP") ? (
                  <button
                    onClick={handleCart}
                    className="flex flex-col items-center justify-center mt-1 space-y-1"
                  >
                    <div className="flex items-center justify-center">
                      <div className="relative flex flex-col items-center justify-center w-8 space-y-1 text-white rounded-xl">
                        <BsCart4 className="text-2xl text-white" />
                        <span className="absolute rounded-full bg-red-500 h-[1rem] w-[1rem] -top-2 -right-1 flex justify-center items-center text-[10px]">
                          {calculateCartQuantity()}
                        </span>
                      </div>
                    </div>
                    <h5 className="text-xs font-light text-white">
                      {calculateOrdersPrice()}
                    </h5>
                  </button>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
        {getSessionState.data &&
        getSessionState.data.cache_data &&
        getSessionState.data.customer_address &&
        getSessionState.data.cache_data.store_name &&
        (props.activeUrl === "CATERING" || props.activeUrl === "SNACKSHOP") ? (
          <div className="w-full py-1 text-white bg-secondary">
            <div className="container flex">
              <div className="truncate w-full lg:w-[400px]">
                {" "}
                <strong>
                  {props.activeUrl === "CATERING" ? "Event Address" : "Address"}
                  :{" "}
                </strong>{" "}
                {getSessionState.data.customer_address}
              </div>
              <div className="flex-1"></div>
              <div className="items-center justify-center hidden space-x-2 lg:flex">
                {" "}
                <MdLocationPin className="text-lg" />
                <Link
                  to={props.activeUrl === "CATERING" ? "/shop" : "/delivery"}
                >
                  <strong> Store: </strong>{" "}
                  {getSessionState.data.cache_data?.store_name}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <CateringCartModal
        open={openCateringCartModal}
        onClose={() => {
          setOpenCateringCartModal(false);
        }}
      />

      <ShopCartModal
        open={openShopCartModal}
        onClose={() => {
          setOpenShopCartModal(false);
        }}
      />

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />

      <PlatformChooserModal
        hasCloseButton={true}
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
      />

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
