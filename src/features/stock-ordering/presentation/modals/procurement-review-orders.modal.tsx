import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TableRow } from "features/stock-ordering/core/domain/table-row.model";
import {
  getProductData,
  selectGetProductData,
} from "../slices/get-product-data.slice";
import {
  orderID,
  updateStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { updateReviewOrders } from "../slices/update-review-order.slice";
import { InitializeModal, InitializeProductData } from "../components";

interface ProcurementReviewOrdersModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function ProcurementReviewOrdersModal(
  props: ProcurementReviewOrdersModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [isCommitedTextFieldAvailable, setIsCommitedTextFieldAvailable] =
    useState(false);

  const [isHidden, setHidden] = useState(false);

  const [rows, setRows] = useState<TableRow>({
    order_information: {
      store_name: "",
      order_number: "",
      requested_delivery_date: "",
      commited_delivery_date: "",
      order_reviewed_date: "",
      order_confirmation_date: "",
      view_delivery_receipt: "",
      dispatch_date: "",
      order_enroute: "",
      actual_delivery_date: "",
      view_updated_delivery_receipt: "",
      billing_information_ready: false,
      view_payment_details: "",
      payment_confirmation: "",
      transport_route: "",
    },
    product_data: [],
  });

  InitializeModal({
    setRows: setRows,
    id: props.id,
    open: props.open,
  });

  InitializeProductData({
    setRows: setRows,
    productData: getProductDataState.data
      ? getProductDataState.data
      : undefined,
  });

  const handleOrderReviewed = async () => {
    const reviewOrdersParamData: updateStatus = {
      id: props.id,
    };

    await dispatch(updateReviewOrders(reviewOrdersParamData));

    props.onClose();
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">
              Procurement Review Orders
            </span>
            <button
              className="text-2xl text-white"
              onClick={() => {
                document.body.classList.remove("overflow-hidden");
                props.onClose();
              }}
            >
              <IoMdClose />
            </button>
          </div>

          <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            <StockOrderTable
              isCommitedTextFieldAvailable={isCommitedTextFieldAvailable}
              isStore={false}
              activeTab={props.currentTab}
              setRows={setRows}
              rowData={rows}
              isDeliveredQtyAvailable={false}
            />

            <div className="flex justify-end px-5">
              {getProductDataState.data?.order_information?.reviewed_date !==
              null ? null : (
                <Button
                  onClick={() => handleOrderReviewed()}
                  variant="contained"
                >
                  Order Reviewed
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
