import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { AdminStoreModel } from "features/admin/core/domain/admin-store.model";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  MaterialInput,
  UploadFile,
} from "features/shared/presentation/components";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { FormEvent, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlinePlus,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AdminHead } from "../components";
import {
  createAdminSettingShopProduct,
  CreateAdminSettingShopProductState,
  resetCreateAdminSettingShopProductState,
  selectCreateAdminSettingShopProduct,
} from "../slices/create-admin-setting-shop-product.slice";
import {
  getAdminProductCategories,
  selectGetAdminProductCategories,
} from "../slices/get-admin-product-categories.slice";
import {
  getAdminStores,
  GetAdminStoresState,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";

export interface Variant {
  name: string;
  options: Array<VariantOption>;
}

interface VariantOption {
  name: string;
  sku?: string;
  price?: string;
}

export function AdminSettingShopCreateProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    deliveryDetails: string;
    addDetails: string;
    price: string;
    category: string;
    uom: string;
    numFlavor: string;
    variants: Array<Variant>;
    stores: Array<AdminStoreModel>;
    image500x500: File | string;
    image250x250: File | string;
    image150x150: File | string;
    image75x75: File | string;
  }>({
    name: "",
    description: "",
    deliveryDetails: "",
    addDetails: "",
    price: "",
    category: "",
    uom: "",
    variants: [],
    stores: [],
    numFlavor: "",
    image500x500: "",
    image250x250: "",
    image150x150: "",
    image75x75: "",
  });

  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );

  const getAdminStoresState = useAppSelector(selectGetAdminStores);

  const createAdminSettingShopProductState = useAppSelector(
    selectCreateAdminSettingShopProduct
  );

  useEffect(() => {
    if (
      createAdminSettingShopProductState.status ===
      CreateAdminSettingShopProductState.success
    ) {
      navigate("/admin/setting/product");
      dispatch(resetCreateAdminSettingShopProductState());
    }
  }, [createAdminSettingShopProductState, dispatch, navigate]);

  useEffect(() => {
    dispatch(getAdminProductCategories());
    dispatch(getAdminStores());
  }, [dispatch]);

  useEffect(() => {
    const stores = getAdminStoresState.data;
    if (getAdminStoresState.status === GetAdminStoresState.success && stores) {
      setFormState((f) => ({ ...f, stores }));
    }
  }, [getAdminStoresState]);

  const handleAddProductVariant = () => {
    setFormState({
      ...formState,
      variants: [
        ...formState.variants,
        {
          name: "",
          options: [
            {
              name: "",
            },
          ],
        },
      ],
    });
  };

  const handleAddProductVariantOption = (index: number) => {
    const copyVariants = [...formState.variants];

    copyVariants[index].options.push({
      name: "",
    });

    setFormState({
      ...formState,
      variants: copyVariants,
    });
  };
  const handleAddProductVariantOptionWithPrice = (index: number) => {
    const copyVariants = [...formState.variants];

    copyVariants[index].options.push({
      name: "",
      sku: "",
      price: "",
    });

    setFormState({
      ...formState,
      variants: copyVariants,
    });
  };

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formState.image500x500 === "" ||
      formState.image250x250 === "" ||
      formState.image150x150 === "" ||
      formState.image75x75 === ""
    ) {
      dispatch(
        popUpSnackBar({
          message:
            "Please insure that all the required size image has been filled out",
          severity: "error",
        })
      );
      return;
    }

    dispatch(
      createAdminSettingShopProduct({
        ...formState,
        stores: JSON.stringify(formState.stores),
        variants: JSON.stringify(formState.variants),
      })
    );
  };

  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Products", url: "/admin/setting/product" },
            {
              name: "Create Product",
              url: "/admin/setting/product/create-product",
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Create Product
        </span>
      </section>
      <form onSubmit={handleOnSubmit} className="p-4 space-y-3">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-3">
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                name="uom"
                required
                label="UOM"
                select
                value={formState.uom}
                onChange={handleInputChange}
                className="flex-1"
              >
                <MenuItem value="PACK">PACK</MenuItem>
                <MenuItem value="SET">SET</MenuItem>
                <MenuItem value="BAG">BAG</MenuItem>
                <MenuItem value="BUNDLE">BUNDLE</MenuItem>
                <MenuItem value="DOZEN">DOZEN</MenuItem>
                <MenuItem value="CAN">CAN</MenuItem>
                <MenuItem value="BOTTLE">BOTTLE</MenuItem>
              </MaterialInput>
              {getAdminProductCategoriesState.data ? (
                <MaterialInput
                  colorTheme="black"
                  required
                  name="category"
                  label="Category"
                  select
                  value={formState.category}
                  onChange={handleInputChange}
                  className="flex-1"
                >
                  {getAdminProductCategoriesState.data.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </MaterialInput>
              ) : null}
            </div>
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.name}
              name="name"
              label="Name"
              fullWidth
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.description}
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.deliveryDetails}
              name="deliveryDetails"
              label="Delivery Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.addDetails}
              name="addDetails"
              label="Add Details"
              fullWidth
              multiline
              rows={4}
              maxRows={5}
            />
            <MaterialInput
              required
              colorTheme="black"
              onChange={handleInputChange}
              value={formState.price}
              name="price"
              type="number"
              label="Price"
              fullWidth
            />
            <MaterialInput
              required
              colorTheme="black"
              type="number"
              onChange={handleInputChange}
              value={formState.numFlavor}
              name="numFlavor"
              label="Number of Flavor"
              fullWidth
            />

            <h1 className="text-2xl font-bold text-secondary !my-2">
              Product Variant Creator
            </h1>

            {formState.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="space-y-2">
                <div className="flex space-x-2">
                  <MaterialInput
                    colorTheme="green"
                    onChange={(e) => {
                      const copyVariants = [...formState.variants];
                      copyVariants[variantIndex].name = e.target.value;
                      setFormState({
                        ...formState,
                        variants: copyVariants,
                      });
                    }}
                    value={variant.name}
                    name="variant"
                    required
                    label="Variant Name"
                    fullWidth
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      let copyVariants = [...formState.variants];
                      copyVariants = copyVariants.filter(
                        (value, index) => index !== variantIndex
                      );
                      setFormState({
                        ...formState,
                        variants: copyVariants,
                      });
                    }}
                    className="text-2xl"
                  >
                    <AiOutlineClose />
                  </button>
                </div>

                {variant.options.map((option, optionIndex) => (
                  <div className="flex space-x-2" key={optionIndex}>
                    <MaterialInput
                      size="small"
                      required
                      colorTheme="blue"
                      onChange={(e) => {
                        const copyVariants = [...formState.variants];
                        copyVariants[variantIndex].options[optionIndex].name =
                          e.target.value;
                        setFormState({
                          ...formState,
                          variants: copyVariants,
                        });
                      }}
                      value={option.name}
                      name="variant"
                      label="Variant Option Name"
                      fullWidth
                    />
                    {option.sku !== undefined ? (
                      <MaterialInput
                        size="small"
                        required
                        colorTheme="blue"
                        onChange={(e) => {
                          const copyVariants = [...formState.variants];
                          copyVariants[variantIndex].options[optionIndex].sku =
                            e.target.value;
                          setFormState({
                            ...formState,
                            variants: copyVariants,
                          });
                        }}
                        value={option.sku}
                        name="sku"
                        label="SKU"
                        fullWidth
                      />
                    ) : null}
                    {option.price !== undefined ? (
                      <MaterialInput
                        size="small"
                        type="number"
                        required
                        colorTheme="blue"
                        onChange={(e) => {
                          const copyVariants = [...formState.variants];
                          copyVariants[variantIndex].options[
                            optionIndex
                          ].price = e.target.value;
                          setFormState({
                            ...formState,
                            variants: copyVariants,
                          });
                        }}
                        value={option.price}
                        name="price"
                        label="Price"
                        fullWidth
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={(e) => {
                        const copyVariants = [...formState.variants];
                        copyVariants[variantIndex].options = copyVariants[
                          variantIndex
                        ].options.filter(
                          (value, index) => index !== optionIndex
                        );
                        setFormState({
                          ...formState,
                          variants: copyVariants,
                        });
                      }}
                      className="text-2xl"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleAddProductVariantOptionWithPrice(variantIndex)
                  }
                  className="flex items-center text-[#003399] space-x-1"
                >
                  <AiOutlinePlus className="text-sm" />
                  <span className="text-sm font-semibold ">
                    Add Product Variant Option with Price
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddProductVariantOption(variantIndex)}
                  className="flex items-center space-x-1 text-[#003399]"
                >
                  <AiOutlinePlus className="text-sm" />
                  <span className="text-sm font-semibold">
                    Add Product Variant Option
                  </span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProductVariant}
              className="flex items-center space-x-1 text-[#006600]"
            >
              <AiOutlinePlus className="text-sm" />
              <span className="text-sm font-semibold">Add Product Variant</span>
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <UploadFile
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image500x500: file,
                  });
                }}
                description="500x500"
              />
              <UploadFile
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image250x250: file,
                  });
                }}
                description="250x250"
              />
              <UploadFile
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image150x150: file,
                  });
                }}
                description="150x150"
              />
              <UploadFile
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image75x75: file,
                  });
                }}
                description="75x75"
              />
            </div>
            <h4 className="mt-1 text-sm leading-5 text-secondary">
              <strong>Note:</strong> JPG is the only supported file type.
              Maximum file size is 2MB.
            </h4>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-secondary !my-2">
          Store Selection
        </h1>

        <div className="grid grid-cols-5 gap-4">
          {getAdminStoresState.data?.map((store, i) => {
            const isChecked = formState.stores.some((element) => {
              if (element.store_id === store.store_id) {
                return true;
              }

              return false;
            });
            return (
              <div
                key={i}
                className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base"
              >
                <Checkbox
                  id={store.store_id.toString()}
                  color="primary"
                  checked={isChecked}
                  onChange={(event) => {
                    if (isChecked) {
                      const filteredStores = formState.stores.filter(
                        (e) => e.store_id !== store.store_id
                      );

                      setFormState({
                        ...formState,
                        stores: filteredStores,
                      });
                    } else {
                      const copyStores = [...formState.stores];
                      copyStores.push(store);
                      setFormState({
                        ...formState,
                        stores: copyStores,
                      });
                    }
                  }}
                />
                <label
                  className="cursor-pointer text-sm"
                  htmlFor={store.store_id.toString()}
                >
                  {store.name}
                </label>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white rounded-lg bg-button w-fit"
        >
          Create Product
        </button>
      </form>
    </>
  );
}
