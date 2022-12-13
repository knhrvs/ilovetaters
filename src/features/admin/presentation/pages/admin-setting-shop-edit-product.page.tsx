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
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AdminHead } from "../components";
import {
  getAdminProductCategories,
  selectGetAdminProductCategories,
} from "../slices/get-admin-product-categories.slice";
import {
  getAdminSettingShopProduct,
  GetAdminSettingShopProductState,
  resetGetAdminSettingShopProductState,
  selectGetAdminSettingShopProduct,
} from "../slices/get-admin-setting-shop-product.slice";
import {
  getAdminStores,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  editAdminSettingShopProduct,
  EditAdminSettingShopProductState,
  resetEditAdminSettingShopProductState,
  selectEditAdminSettingShopProduct,
} from "../slices/edit-admin-setting-shop-product.slice";
import {
  deleteAdminSettingShopProduct,
  DeleteAdminSettingShopProductState,
  resetDeleteAdminSettingShopProductState,
  selectDeleteAdminSettingShopProduct,
} from "../slices/delete-admin-setting-shop-product.slice";
import { MessageModal } from "features/shared/presentation/modals";

export interface Variant {
  name: string;
  options: Array<VariantOption>;
}

interface VariantOption {
  name: string;
  sku: string | null;
  price: string | null;
}

export function AdminSettingShopEditProduct() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [openDeleteMessageModal, setOpenDeleteMessageModal] = useState(false);

  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );
  const getAdminStoresState = useAppSelector(selectGetAdminStores);
  const getAdminSettingShopProductState = useAppSelector(
    selectGetAdminSettingShopProduct
  );
  const editAdminSettingShopProductState = useAppSelector(
    selectEditAdminSettingShopProduct
  );

  const deleteAdminSettingShopProductState = useAppSelector(
    selectDeleteAdminSettingShopProduct
  );

  useEffect(() => {
    if (
      deleteAdminSettingShopProductState.status ===
      DeleteAdminSettingShopProductState.success
    ) {
      navigate("/admin/setting/product");
      dispatch(resetDeleteAdminSettingShopProductState());
    }
  }, [deleteAdminSettingShopProductState, dispatch, navigate, id]);

  useEffect(() => {
    if (
      editAdminSettingShopProductState.status ===
      EditAdminSettingShopProductState.success
    ) {
      navigate("/admin/setting/product");
      dispatch(resetEditAdminSettingShopProductState());
    }
  }, [editAdminSettingShopProductState, dispatch, navigate, id]);

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

  useEffect(() => {
    dispatch(getAdminProductCategories());
    dispatch(getAdminStores());
    if (id) {
      dispatch(resetGetAdminSettingShopProductState());
      dispatch(getAdminSettingShopProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (
      getAdminSettingShopProductState.status ===
        GetAdminSettingShopProductState.success &&
      getAdminSettingShopProductState.data
    ) {
      setFormState({
        name: getAdminSettingShopProductState.data.name,
        description: getAdminSettingShopProductState.data.description,
        deliveryDetails: getAdminSettingShopProductState.data.delivery_details,
        addDetails: getAdminSettingShopProductState.data.add_details,
        price: getAdminSettingShopProductState.data.price.toString(),
        category: getAdminSettingShopProductState.data.category.toString(),
        uom: getAdminSettingShopProductState.data.uom,
        variants:
          JSON.parse(
            JSON.stringify(getAdminSettingShopProductState.data.variants)
          ) ?? [],
        stores: getAdminSettingShopProductState.data.stores ?? [],
        numFlavor: getAdminSettingShopProductState.data.num_flavor.toString(),
        image500x500: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${getAdminSettingShopProductState.data.product_image}`,
        image250x250: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${getAdminSettingShopProductState.data.product_image}`,
        image150x150: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/150/${getAdminSettingShopProductState.data.product_image}`,
        image75x75: `${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getAdminSettingShopProductState.data.product_image}`,
      });
    }
  }, [getAdminSettingShopProductState]);

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
              price: null,
              sku: null,
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
      price: null,
      sku: null,
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

    if (id) {
      dispatch(
        editAdminSettingShopProduct({
          id,
          ...formState,
          stores: JSON.stringify(formState.stores),
          variants: JSON.stringify(formState.variants),
        })
      );
    }
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
              name: "Edit Product",
              url: "/admin/setting/product/" + id,
            },
          ],
        }}
      />
      <section className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Product
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
            {formState.variants ? (
              <>
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
                            copyVariants[variantIndex].options[
                              optionIndex
                            ].name = e.target.value;
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
                        {option.sku !== null ? (
                          <MaterialInput
                            size="small"
                            required
                            colorTheme="blue"
                            onChange={(e) => {
                              const copyVariants = [...formState.variants];
                              copyVariants[variantIndex].options[
                                optionIndex
                              ].sku = e.target.value;
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
                        {option.price !== null ? (
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
                      onClick={() =>
                        handleAddProductVariantOption(variantIndex)
                      }
                      className="flex items-center space-x-1 text-[#003399]"
                    >
                      <AiOutlinePlus className="text-sm" />
                      <span className="text-sm font-semibold">
                        Add Product Variant Option
                      </span>
                    </button>
                  </div>
                ))}
              </>
            ) : null}
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
                image={formState.image500x500}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image500x500: file,
                  });
                }}
                description="500x500"
              />
              <UploadFile
                image={formState.image250x250}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image250x250: file,
                  });
                }}
                description="250x250"
              />
              <UploadFile
                image={formState.image150x150}
                onChange={(file) => {
                  setFormState({
                    ...formState,
                    image150x150: file,
                  });
                }}
                description="150x150"
              />
              <UploadFile
                image={formState.image75x75}
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
                  className="text-sm cursor-pointer"
                  htmlFor={store.store_id.toString()}
                >
                  {store.name}
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-lg bg-button w-fit"
          >
            Edit Product
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenDeleteMessageModal(true);
            }}
            className="px-4 py-2 text-white rounded-lg bg-button w-fit"
          >
            Delete Product
          </button>
        </div>
      </form>

      <MessageModal
        open={openDeleteMessageModal}
        onClose={() => {
          setOpenDeleteMessageModal(false);
        }}
        onYes={() => {
          if (id) {
            dispatch(deleteAdminSettingShopProduct(id));
          }
        }}
        message={`Are you sure you want to delete ${getAdminSettingShopProductState.data?.name} product?`}
      />
    </>
  );
}
