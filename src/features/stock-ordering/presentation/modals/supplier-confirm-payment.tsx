import { IoMdClose } from "react-icons/io";
import { StockOrderTable } from "../components/stock-order-table";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import { InitializeModal, InitializeProductData } from "../components";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { selectGetProductData } from "../slices/get-product-data.slice";
import { updateStatus } from "features/stock-ordering/core/stock-ordering.params";
import { updateConfirmPayment } from "../slices/update-confirm-payment.slice";
import { ViewImageModal } from "./view-image.modal";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { productDataInitialState } from "features/stock-ordering/core/productDataInitialState";

interface SupplierConfirmModalProps {
  open: boolean;
  onClose: () => void;
  currentTab: number;
  id: string;
}

export function SupplierConfirmModal(props: SupplierConfirmModalProps) {
  const [openPayBillingModal, setOpenPayBillingModal] = useState(false);
  const [uploadedReceipt, setUploadedReciept] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const getProductDataState = useAppSelector(selectGetProductData);
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<StockOrderingInformationModel>(
    productDataInitialState
  );

  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const setEnabled = () => {
    const user = getAdminSessionState.data?.admin?.user_details?.sos_groups;

    let result = false;

    user?.map((user_group) => {
      if (user_group.id === 8) {
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

  const handleValidate = async (status: string) => {
    const updateConfirmPaymentParam: updateStatus = {
      id: props.id,
      remarks: remarks,
      status: status,
    };

    await dispatch(updateConfirmPayment(updateConfirmPaymentParam));

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  useEffect(() => {
    setUploadedReciept(rows.order_information.view_payment_details);
  }, [rows.order_information.view_payment_details]);

  useEffect(() => {
    setRemarks("");
  }, [props.open]);

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
            <span className="text-2xl text-white">Confirm Payment</span>
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
              <div className="space-y-2">
                <div className="flex flex-col mt-2 ">
                  <span>Remarks: </span>
                  <TextField
                    value={remarks}
                    onChange={(event) => setRemarks(event.target.value)}
                    inputProps={{ maxLength: 512 }}
                    multiline
                  />
                </div>
                <div className="flex flex-col space-y-2 ">
                  {/* <div className="basis-full">
                    <Button
                      onClick={() => setOpenPayBillingModal(true)}
                      fullWidth
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#CC5801",
                      }}
                    >
                      View payment information
                    </Button>
                  </div> */}

                  <div className="flex space-x-4">
                    <ButtonGroup fullWidth variant="contained">
                      <Button
                        onClick={() => handleValidate("7")}
                        sx={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                      >
                        Return to Tei Finance
                      </Button>

                      <Button
                        onClick={() => handleValidate("9")}
                        sx={{
                          color: "white",
                          backgroundColor: "#CC5801",
                        }}
                      >
                        Validate
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ViewImageModal
        isDownloadable={true}
        open={openPayBillingModal}
        onClose={() => setOpenPayBillingModal(false)}
        image={uploadedReceipt}
      />
    </>
  );
}
