import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  FooterNav,
  HeaderNav,
  MaterialDateInput,
  MaterialInput,
} from "features/shared/presentation/components";
import { useEffect, useState, FormEvent } from "react";
import { Helmet } from "react-helmet";

import {
  selectGetSurvey,
  getSurvey,
  GetSurveyState,
} from "features/survey/presentation/slices/get-survey.slice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  insertCustomerSurveyResponse,
  InsertCustomerSurveyResponseState,
  resetInsertCustomerSurveyResponse,
  selectInsertCustomerSurveyResponse,
} from "../slices/insert-customer-survey-response.slice";
import { CustomerSurveyQuestionResponseAnswer } from "features/survey/core/survey.interface";
import { useNavigate } from "react-router-dom";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import {
  getAllStores,
  GetAllStoresState,
  selectGetAllStores,
} from "features/shared/presentation/slices/get-all-stores.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { SurveyRating } from "../components";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";

export function Survey() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] =
    useState<CustomerSurveyQuestionResponseAnswer>({});

  const [orderedDate, setOrderedDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [selectedStore, setSelectedStore] = useState<
    | {
        store_id: number;
        name: string;
        menu_name: string;
      }
    | undefined
  >();

  const [surveySection, setSurveySection] = useState(0);

  const getSurveyState = useAppSelector(selectGetSurvey);
  const insertCustomerSurveyResponseState = useAppSelector(
    selectInsertCustomerSurveyResponse
  );
  const getAllStoresState = useAppSelector(selectGetAllStores);
  const getSessionState = useAppSelector(selectGetSession);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.userData === null
    ) {
      navigate("/feedback");
    }
  }, [getSessionState, navigate]);

  useEffect(() => {
    dispatch(getSurvey());
    dispatch(getAllStores());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [surveySection]);

  useEffect(() => {
    if (
      insertCustomerSurveyResponseState.status ===
      InsertCustomerSurveyResponseState.success
    ) {
      dispatch(getNotifications());
      dispatch(resetInsertCustomerSurveyResponse());
      navigate(
        `/feedback/complete/${insertCustomerSurveyResponseState.data?.hash}`
      );
    }
  }, [dispatch, insertCustomerSurveyResponseState, navigate]);

  useEffect(() => {
    if (
      getAllStoresState.status === GetAllStoresState.success &&
      getAllStoresState.data &&
      getAllStoresState.data.length > 0
    ) {
      setSelectedStore(getAllStoresState.data[0]);
    }
  }, [getAllStoresState]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const increasedSurveySection = surveySection + 1;

    if (
      getSurveyState.status === GetSurveyState.success &&
      getSurveyState.data &&
      getSurveyState.data.length > 0
    ) {
      if (increasedSurveySection < getSurveyState.data.length) {
        setSurveySection(increasedSurveySection);
      } else {
        dispatch(
          insertCustomerSurveyResponse({
            answers: formState,
            orderedDate,
            invoiceNo,
            storeId: selectedStore?.store_id,
          })
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Taters | Customer Satisfaction Survey</title>
      </Helmet>

      <main className="min-h-screen bg-paper">
        <HeaderNav
          activeUrl="HOME"
          homePageUrl="/"
          logoProps={{
            src:
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shared/logo/taters-logo.png",
            alt: "Taters Logo",
            className: "w-[150px] lg:w-[120px]",
          }}
        />
        {getSurveyState.data && getSurveyState.data.length > 0 ? (
          <section className="container pt-4 pb-24 mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h1 className='text-secondary text-6xl font-["Bebas_Neue"]'>
                Taters CUSTOMER SATISFACTION SURVEY
              </h1>

              <p className="text-base text-secondary ">
                Welcome and thank you for your continued patronage. In our
                desire to serve you better, please assist us by answering this
                survey. We value your time and effort in completing this
                endeavor.
              </p>

              <div className="space-y-4">
                {surveySection === 0 ? (
                  <div className="py-4 space-y-4">
                    {getAllStoresState.status === GetAllStoresState.success &&
                    getAllStoresState.data ? (
                      <MaterialInputAutoComplete
                        label="Select store"
                        colorTheme="black"
                        size="small"
                        required
                        options={getAllStoresState.data}
                        value={selectedStore ?? ""}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => {
                          if (value) {
                            setSelectedStore(value);
                          }
                        }}
                      />
                    ) : null}

                    <MaterialDateInput
                      colorTheme="black"
                      label="Order Date"
                      openTo="year"
                      size="small"
                      required
                      views={["year", "month", "day"]}
                      value={orderedDate}
                      onChange={(newValue: any) => {
                        setOrderedDate(newValue);
                      }}
                    />
                    <MaterialInput
                      colorTheme="black"
                      label="Invoice Number"
                      value={invoiceNo}
                      required
                      onChange={(event) => {
                        setInvoiceNo(event.target.value);
                      }}
                      size="small"
                      fullWidth
                      name="invoiceNumber"
                    />
                  </div>
                ) : null}

                <div className='text-4xl font-bold text-center text-secondary font-["Bebas_Neue"]'>
                  {getSurveyState.data[surveySection].section_name}
                </div>
                {getSurveyState.data[surveySection].surveys.map((survey) => (
                  <div className="pb-4">
                    <span className="text-xl font-bold text-secondary">
                      {survey.description}
                    </span>
                    <div className="flex flex-col">
                      {survey.answers.length > 0 ? (
                        <FormControl>
                          <RadioGroup
                            value={
                              formState[survey.id.toString()]
                                ?.surveyQuestionAnswerId ?? ""
                            }
                            name={survey.id.toString()}
                            onChange={(e) => {
                              if (getSurveyState.data) {
                                const surveyQuestionAnswerId = e.target.value;
                                const surveyQuestionId = survey.id;

                                setFormState({
                                  ...formState,
                                  [e.target.name]: {
                                    surveyQuestionAnswerId,
                                    surveyQuestionId,
                                  },
                                });
                              }
                            }}
                          >
                            {survey.answers.map((answer) => (
                              <FormControlLabel
                                value={answer.id}
                                control={
                                  <Radio
                                    required
                                    size="small"
                                    color="secondary"
                                  />
                                }
                                label={answer.text}
                              />
                            ))}
                            {survey.others ? (
                              <FormControlLabel
                                value="others"
                                control={
                                  <Radio
                                    required
                                    size="small"
                                    color="secondary"
                                  />
                                }
                                label={
                                  <MaterialInput
                                    variant="standard"
                                    colorTheme="black"
                                    label="Others"
                                    onFocus={() => {
                                      const surveyQuestionId = survey.id;
                                      setFormState({
                                        ...formState,
                                        [survey.id.toString()]: {
                                          surveyQuestionAnswerId: "others",
                                          surveyQuestionId,
                                        },
                                      });
                                    }}
                                    required={
                                      formState[survey.id.toString()]
                                        ?.surveyQuestionAnswerId === "others"
                                    }
                                    value={
                                      formState[survey.id.toString()]?.others ??
                                      ""
                                    }
                                    onChange={(e) => {
                                      const others = e.target.value;
                                      const surveyQuestionId = survey.id;
                                      setFormState({
                                        ...formState,
                                        [e.target.name]: {
                                          surveyQuestionAnswerId: "others",
                                          others,
                                          surveyQuestionId,
                                        },
                                      });
                                    }}
                                    fullWidth
                                    name={survey.id.toString()}
                                    className="!mb-4"
                                  />
                                }
                              />
                            ) : null}
                          </RadioGroup>
                        </FormControl>
                      ) : (
                        <>
                          {survey.is_text_area ? (
                            <MaterialInput
                              colorTheme="black"
                              type={survey.is_email ? "email" : "text"}
                              value={
                                formState[survey.id.toString()]?.text ?? ""
                              }
                              onChange={(e) => {
                                const text = e.target.value;
                                const surveyQuestionId = survey.id;
                                setFormState({
                                  ...formState,
                                  [e.target.name]: {
                                    text,
                                    surveyQuestionId,
                                  },
                                });
                              }}
                              name={survey.id.toString()}
                              multiline
                              rows={4}
                              fullWidth
                              required
                            />
                          ) : null}
                          {survey.is_text_field ? (
                            <MaterialInput
                              colorTheme="black"
                              type={survey.is_email ? "email" : "text"}
                              value={
                                formState[survey.id.toString()]?.text ?? ""
                              }
                              onChange={(e) => {
                                const text = e.target.value;
                                const surveyQuestionId = survey.id;
                                setFormState({
                                  ...formState,
                                  [e.target.name]: {
                                    text,
                                    surveyQuestionId,
                                  },
                                });
                              }}
                              name={survey.id.toString()}
                              fullWidth
                              required
                            />
                          ) : null}
                        </>
                      )}
                      {survey.ratings.length > 0 ? (
                        <div className="flex flex-col w-full space-y-8 sm:items-center sm:justify-center ">
                          {survey.ratings.map((rating, i) => (
                            <SurveyRating
                              key={i}
                              surveyName={
                                survey.id.toString() +
                                "_" +
                                rating.id.toString()
                              }
                              rate={
                                formState[
                                  survey.id.toString() +
                                    "_" +
                                    rating.id.toString()
                                ]?.rate ?? ""
                              }
                              onRateSelect={(rate) => {
                                const surveyQuestionId = survey.id;

                                setFormState({
                                  ...formState,
                                  [survey.id.toString() +
                                  "_" +
                                  rating.id.toString()]: {
                                    surveyQuestionId,
                                    surveyQuestionRatingId:
                                      rating.id.toString(),
                                    rate,
                                  },
                                });
                              }}
                              rating={rating}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col items-center justify-end pb-1 space-y-2 lg:space-y-0 lg:flex-row">
                  <button
                    type="submit"
                    className={`text-white border border-secondary order-1 lg:order-2 lg:ml-2 text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px]  rounded-lg shadow-lg`}
                  >
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      {getSurveyState.data.length - 1 === surveySection
                        ? "Submit"
                        : "Continue"}
                    </span>
                  </button>

                  {surveySection > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSurveySection(surveySection - 1);
                      }}
                      className={`text-white border order-2 lg:order-1 border-secondary text-xl flex space-x-2 justify-center items-center bg-secondary py-2 w-full lg:w-[300px] rounded-lg shadow-lg`}
                    >
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Go Back
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>
            </form>
          </section>
        ) : null}

        <FooterNav activeUrl="HOME" />
      </main>
    </>
  );
}
