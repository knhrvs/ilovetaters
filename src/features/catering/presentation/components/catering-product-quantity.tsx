import { useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CateringProductQuantityProps {
  min: number;
  quantity: number;
  onChange: (action: "plus" | "minus") => void;
}

let timeout: any;
let interval: any;

export function CateringProductQuantity(props: CateringProductQuantityProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);

  const quantityOnPressed = (action: "plus" | "minus", isTouch = false) => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (isTouch === false) props.onChange(action);

    timeout = setTimeout(function () {
      let counter = props.quantity;
      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (counter > props.min) {
          props.onChange(action);
        } else {
          clearTimeout(timeout);
          clearInterval(interval);
        }
      }, 100);
    }, 500);
  };

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <>
      <div className="h-[60px] w-full">
        <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() => quantityOnPressed("minus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityOnPressed("minus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] rounded-l cursor-pointer outline-none flex justify-center items-center bg-primary ${
              props.quantity === 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <AiOutlineMinus className="text-3xl" />
          </button>

          <input
            value={props.quantity}
            readOnly
            type="number"
            min="1"
            max="10"
            className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityOnPressed("plus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] rounded-r cursor-pointer flex justify-center items-center bg-primary`}
          >
            <AiOutlinePlus className="text-3xl" />
          </button>
        </div>
      </div>

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}
