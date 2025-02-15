import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { StockOrderTable } from "../components/stock-order-table";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UploadDeliveryRecieptModal } from "./upload-delivery-reciepts.modal";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import {
  dispatchOrderParam,
  updateCancelledStatus,
} from "features/stock-ordering/core/stock-ordering.params";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateDispatchOrders } from "../slices/update-dispatch-order.slice";
import { InitializeModal, InitializeProductData } from "../components";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AiOutlineDownload } from "react-icons/ai";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";
import { PopupModal } from "./popup.modal";

interface SupplierDispatchOrderModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierDispatchOrderModal(
  props: SupplierDispatchOrderModalProps
) {
  const dispatch = useAppDispatch();
  const getProductDataState = useAppSelector(selectGetProductData);

  const [openUploadDeliveryRecieptModal, setOpenUploadDeliveryRecieptModal] =
    useState(false);

  const [transport, setTransport] = useState("");
  const [dispatchedDelivery, setDispachedDelivery] = useState<string | null>(
    null
  );
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");
  const [preview, setPreview] = useState(false);
  const [uploadButton, setuploadButton] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

  const isValidFile = (file: string | File | undefined): boolean => {
    if (!file) {
      return false;
    }

    if (typeof file === "string") {
      return true;
    }

    // const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xls", "xlsx"];
    const allowedExtensions = ["xls", "xlsx"];

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension =
      fileExtension && allowedExtensions.includes(fileExtension);

    if (!isValidExtension) {
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return false;
    }

    return true;
  };

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 3) {
        result = true;
      }
    });

    return result;
  };

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

  useEffect(() => {
    setUploadedReciept("");
    setDispachedDelivery(null);
    setTransport("");
    setRemarks("");
    setuploadButton(true);
    setPreview(false);
    setOpenPopUp(false);
  }, [props.open]);

  const handleDispatchOrder = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dispatchedOrdersProductDataParam: dispatchOrderParam["product_data"] =
      rows.product_data.map((product) => ({
        id: product.id,
        productId: product.productId,
        dispatchedQuantity: product.dispatchedQuantity,
      }));

    const dispatchOrdersParamData: dispatchOrderParam = {
      id: props.id,
      deliveryReceipt: uploadedReceipt,
      dispatchDeliveryDate:
        dayjs(dispatchedDelivery).format("hh:mm:ss a") ?? null,
      transport: transport,
      remarks: remarks,
      product_data: dispatchedOrdersProductDataParam,
    };

    await dispatch(updateDispatchOrders(dispatchOrdersParamData));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  const handleCancelOrder = () => {
    setOpenPopUp(true);
  };

  const isQuantityEmpty = () => {
    let empty = false;
    rows.product_data.map((product) => {
      if (
        product.commitedQuantity === "" ||
        product.commitedQuantity === null
      ) {
        empty = true;
      }
    });

    return empty;
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
            <span className="text-2xl text-white">Supplier Dispatch Order</span>
            <div className="space-x-3">
              <button
                className="text-2xl text-white"
                onClick={() => {
                  //Waiting for download endpoint

                  document.body.classList.remove("overflow-hidden");
                  props.onClose();
                }}
              >
                <AiOutlineDownload />
              </button>

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
          </div>

          <form onSubmit={handleDispatchOrder}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <StockOrderTable
                isCommitedTextFieldAvailable={false}
                isStore={false}
                activeTab={props.currentTab}
                setRows={setRows}
                rowData={rows}
                isDeliveredQtyAvailable={false}
                isDispatchedQtyAvailable={false}
                isUpdateBilling={false}
              />
              {setEnabled() ? (
                <div className="flex flex-col px-3 space-y-3">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-x-3">
                    <FormControl
                      sx={{
                        flexBasis: { md: "50%" },
                        alignSelf: { md: "flex-end" },
                      }}
                      disabled={preview}
                      required
                    >
                      <FormLabel id="transport-route-label">
                        Transport Route
                      </FormLabel>

                      <RadioGroup
                        onChange={(event, value) => setTransport(value)}
                        value={transport}
                        row
                        aria-labelledby="transport-route"
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio size="small" />}
                          label="Ground"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio size="small" />}
                          label="Ocean"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio size="small" />}
                          label="Air"
                        />
                      </RadioGroup>
                    </FormControl>

                    <div className="flex flex-col space-y-2 md:basis-1/2">
                      <span>Dispatched Delivery Date: </span>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          disabled={preview}
                          label="Dispatch Time Picker"
                          value={dispatchedDelivery}
                          onChange={(date) => {
                            setDispachedDelivery(date);
                          }}
                          renderInput={(params) => (
                            <TextField required {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2">
                    <span>Remarks: </span>
                    <TextField
                      value={remarks}
                      onChange={(event) => setRemarks(event.target.value)}
                      inputProps={{ maxLength: 512 }}
                      multiline
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <ButtonGroup fullWidth size="small">
                      <Button
                        sx={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                        onClick={() => {
                          setOpenUploadDeliveryRecieptModal(true);
                        }}
                        variant="contained"
                      >
                        Upload Sales Invoice
                      </Button>

                      {preview ? (
                        <Button
                          sx={{
                            color: "white",
                            backgroundColor: "#CC5801",
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Dispatch Order
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            color: "white",
                            backgroundColor: "#CC5801",
                          }}
                          disabled={
                            !isValidFile(uploadedReceipt) ||
                            transport === "" ||
                            isQuantityEmpty() ||
                            dispatchedDelivery === null
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            setuploadButton(false);
                            setPreview(true);
                          }}
                          variant="contained"
                        >
                          Preview
                        </Button>
                      )}
                    </ButtonGroup>
                    <ButtonGroup
                      sx={{ justifyContent: "flex-end" }}
                      size="small"
                      variant="text"
                    >
                      <Button
                        sx={{ flexBasis: "25%" }}
                        onClick={handleCancelOrder}
                      >
                        <span className="text-primary underline">
                          Cancel Order
                        </span>
                      </Button>

                      {preview && (
                        <Button
                          sx={{ flexBasis: "25%" }}
                          onClick={() => setPreview(false)}
                        >
                          <span className="text-primary underline">
                            Re-edit
                          </span>
                        </Button>
                      )}
                    </ButtonGroup>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      <UploadDeliveryRecieptModal
        open={openUploadDeliveryRecieptModal}
        onClose={() => setOpenUploadDeliveryRecieptModal(false)}
        setUploadedReciept={setUploadedReciept}
        isButtonAvailable={uploadButton}
      />

      <PopupModal
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        title={"Cancel Order"}
        message={"Are you sure you want to cancel your order?"}
        remarks={remarks}
        id={props.id}
        orderCancelled={(isCancelled: boolean) =>
          isCancelled && props.onClose()
        }
      />
    </>
  );
}
