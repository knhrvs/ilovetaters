import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  removeItemFromCartShop,
  RemoveItemFromCartShopState,
  resetRemoveItemFromCartShop,
  selectRemoveItemFromCartShop,
} from "features/shop/presentation/slices/remove-item-from-cart-shop.slice";
import { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { getSession, selectGetSession } from "../slices/get-session.slice";

export function CartListItem() {
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeItemFromCartShopState = useAppSelector(
    selectRemoveItemFromCartShop
  );

  useEffect(() => {
    if (
      removeItemFromCartShopState.status === RemoveItemFromCartShopState.success
    ) {
      dispatch(getSession());
      dispatch(resetRemoveItemFromCartShop());
    }
  }, [removeItemFromCartShopState, dispatch]);

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

  return (
    <>
      <div className="pb-2">
        <div>
          {(getSessionState.data?.orders === undefined ||
            getSessionState.data?.orders == null ||
            getSessionState.data?.orders.length <= 0) &&
          (getSessionState.data?.deals === undefined ||
            getSessionState.data?.deals == null ||
            getSessionState.data?.deals.length <= 0) ? (
            <div className="flex flex-row items-center justify-center px-10 pt-2 space-x-5 space-y-2">
              <BsCartX className="text-2xl text-secondary" />
              <span className="text-secondary text-md font-['Bebas_Neue'] tracking-[2px]">
                Cart Empty
              </span>
            </div>
          ) : (
            <div>
              <div className="flex flex-row items-center justify-center px-10 pt-2 space-x-5 space-y-2">
                <span className="text-secondary text-md font-['Bebas_Neue']">
                  My Cart
                </span>
              </div>
              <hr className="mt-1 mb-1 border-t-1 border-secondary" />

              <div className="space-y-6 overflow-y-auto max-h-[400px] px-2 py-2">
                {getSessionState.data?.orders !== undefined &&
                getSessionState.data?.orders !== null &&
                getSessionState.data?.orders.length > 0 ? (
                  <>
                    {getSessionState.data.orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex bg-secondary rounded-[10px] relative pr-10"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="w-full text-sm font-bold leading-4">
                            {order.prod_size} {order.prod_name}
                          </h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {order.prod_qty}
                            </span>
                          </h3>
                          {order.prod_flavor ? (
                            <h3 className="text-xs">
                              Flavor:{" "}
                              <span className="text-tertiary">
                                {order.prod_flavor}
                              </span>
                            </h3>
                          ) : null}

                          {order.prod_multiflavors ? (
                            <h3 className="text-xs">
                              Flavor:
                              <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: order.prod_multiflavors,
                                }}
                              />
                            </h3>
                          ) : null}

                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={order.prod_calc_amount.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                        <button
                          className="absolute text-white top-2 right-4 "
                          onClick={() => {
                            dispatch(removeItemFromCartShop(i));
                          }}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    ))}
                  </>
                ) : null}

                {getSessionState.data?.deals !== undefined &&
                getSessionState.data?.deals !== null &&
                getSessionState.data?.deals.length > 0 ? (
                  <>
                    {getSessionState.data?.deals.map((deal, i) => (
                      <div
                        key={i}
                        className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px] relative"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${deal.deal_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="w-full text-sm font-bold leading-4">
                            {deal.deal_name}
                          </h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {deal.deal_qty}
                            </span>
                          </h3>

                          {deal.deal_remarks ? (
                            <h3 className="text-xs">
                              Flavor:
                              <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: deal.deal_remarks,
                                }}
                              />
                            </h3>
                          ) : null}

                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={deal.deal_promo_price.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                        <button
                          className="absolute text-white top-2 right-4 "
                          onClick={() => {
                            dispatch(removeItemFromCartShop(i));
                          }}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>

              <hr className="mt-1 mb-1 border-t-1 border-secondary" />

              <div className="px-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-secondary">Total:</span>
                  <span className="font-bold text-secondary">
                    {calculateOrdersPrice()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    // props.onClose();
                    navigate("/delivery/checkout");
                  }}
                  className="w-full py-2 text-lg text-white border rounded-lg bg-button border-secondary"
                >
                  Process Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
