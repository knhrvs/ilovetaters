import { useAppDispatch } from "features/config/hooks";
import { useNavigate } from "react-router-dom";

import { FormEvent, useState } from "react";

export function BSCCreateAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<{
    firstName: string;
    lastName: string;
    designation: string;
    company: number | null;
    store: number | null;
    email: string;
    phoneNumber: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    designation: "",
    company: null,
    store: null,
    email: "",
    phoneNumber: "",
    password: "",
  });

  function handleInputChange(evt: any) {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="flex items-center justify-center h-screen bg-paper">
      <div
        className="bg-secondary w-[90%] sm:w-[400px] mx-auto p-6 px-6 
          font-['Varela_Round'] text-sm text-center rounded-3xl shadow-md"
      >
        <div className="pt-1 login-body">
          <form onSubmit={handleOnSubmit}>
            <p className="mb-3 text-2xl font-bold text-left text-white">
              Create an Account
            </p>
            <p className="text-xs text-left text-white">
              {" "}
              Enter the following information to register.{" "}
            </p>
            <div className="pt-4 space-y-4">
              <div className="flex space-x-2">
                {/* <BSCFirstNameTextField />
                <BSCLastNameTextField /> */}
              </div>
              {/* <BSCDesignationField />
              <BSCCompanySelect />
              <BSCStoreSelect />
              <BSCEmailTextField />
              <BSCContactField />
              <BSCPasswordTextField /> */}
            </div>

            <div className="flex justify-between mt-6 mb-2 text-white text-[12px]">
              <p className="mx-auto">
                <input className="mr-2" type="checkbox" /> I agree to the Terms
                of Service and Privacy Policy.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 my-3 text-white bg-button rounded-3xl"
            >
              CREATE ACCOUNT
            </button>
            <p className="my-1 text-xs text-center text-white">
              {" "}
              Already have an account?{" "}
              <span
                // onClick={navigatetoLogin}
                className="cursor-pointer text-button hover:underline"
              >
                {" "}
                Log in here.{" "}
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
