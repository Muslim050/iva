import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteOrder,
  fetchEditOrder,
  fetchOrder,
} from "../../../../redux/order/orderSlice";
import { toastConfig } from "../../../../utils/toastConfig";
import "react-datepicker/dist/react-datepicker.css";
import style from "./EditOrderModal.module.scss";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { ReactComponent as File } from "src/assets/Table/file.svg";
import backendURL from "src/utils/url";
import axios from "axios";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import { ReactComponent as Delete } from "src/assets/Table/Delete.svg";

const format = [
  { value: "preroll", text: "Pre-roll" },
  { value: "mixroll", text: "Mix-roll" },
];
export default function EditOrderModal({
  setShowModalEditAdmin,
  currentOrder,
}) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [cpm, setCpm] = React.useState([]);
  const [budgett, setBudgett] = React.useState(0);
  const role = localStorage.getItem("role");

  const cpms = cpm.map((cp) => cp.rate);

  const [isOrderCreated, setIsOrderCreated] = React.useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      format: currentOrder.format,
      selectedFile: null,
      expectedView: currentOrder.expected_number_of_views,
      budgett: 0,
    },
    mode: "onBlur",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const editName = watch("name");
  // const viewValue = watch("view");
  const selectedFormat = watch("format");
  const expectedView = watch("expectedView");

  const calculateBudget = () => {
    let newBudget = 0;
    if (selectedFormat === "preroll") {
      newBudget = (expectedView / 1000) * cpms[1];
    } else if (selectedFormat === "mixroll") {
      newBudget = (expectedView / 1000) * cpms[0];
    }
    setBudgett(newBudget);
  };

  const fetchCpm = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${backendURL}/order/cpm-rate/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCpm(response.data.data);
  };
  React.useEffect(() => {
    calculateBudget();
  }, [selectedFormat, expectedView]);
  React.useEffect(() => {
    fetchCpm();
  }, []);

  React.useEffect(() => {
    setValue("budgett", budgett);
  }, [budgett, setValue]);
  const onSubmit = async (data) => {
    console.log("dataonSubmit", data);
    try {
      setIsOrderCreated(true);
      const response = await dispatch(
        fetchEditOrder({ id: currentOrder.id, data })
      );
      console.log("response", response);

      if (response && !response.error) {
        toast.success("Изминения успешно обновлены!", toastConfig);
        setShowModalEditAdmin(false);
        dispatch(fetchOrder());
      } else if (response.error.message) {
        toast.error(
          "Что-то пошло не так!" + response.error.message,
          toastConfig
        );
        setShowModalEditAdmin(false);
      }
    } catch (error) {
      setIsOrderCreated(false);
      if (error.message) {
        toast.error(`Ошибка : ${error.message}`, toastConfig);
      } else {
        toast.error("Что-то пошло не так: " + error.message, toastConfig);
      }
    }
  };

  const handleRemoveInventory = () => {
    console.log("currentOrdercurrentOrder", currentOrder);
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить?");
    if (confirmDelete) {
      dispatch(deleteOrder({ id: currentOrder.id }))
        .then(() => {
          toast.success("Инвентарь успешно удален", toastConfig);
          setShowModalEditAdmin(false);
          dispatch(fetchOrder());
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          dispatch(fetchOrder());
        });
    } else {
      toast.info("Операция отменена", toastConfig);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Редактировать Заказ
          <Close
            className="modalWindow__title__button"
            onClick={() => setShowModalEditAdmin(false)}
          />
        </div>

        <div className="modalWindow">
          <div style={{ display: "grid", marginBottom: "18px" }}>
            <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
              Название рекламной кампании
            </label>
            <input
              type="text"
              className={
                role === "admin"
                  ? style.modalWindow__inputU
                  : style.modalWindow__input
              }
              {...register("name", {
                required: "Название рекламной кампании обезательно",
              })}
              disabled={role !== "admin"}
            />
            <span className={style.modalWindow__input_error}>
              {errors?.name && <p>{errors?.name?.message}</p>}
            </span>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: "18px" }}
          >
            <div style={{ display: "grid", marginRight: "10px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Начало
              </label>
              <Controller
                name="startdate"
                control={control}
                defaultValue={
                  currentOrder.expected_start_date
                    ? currentOrder.expected_start_date.substring(0, 10)
                    : ""
                }
                render={({ field: { onChange, value } }) => (
                  <input
                    // className={style.input}
                    className={
                      role === "admin"
                        ? style.modalWindow__inputU
                        : style.modalWindow__input
                    }
                    disabled={role !== "admin"}
                    type="date"
                    onChange={onChange}
                    value={value}
                    style={{
                      width: "210px",
                    }}
                  />
                )}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.startdate && <p>{errors?.startdate?.message}</p>}
              </span>
            </div>

            <div style={{ display: "grid" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Конец
              </label>
              <Controller
                name="enddate"
                control={control}
                defaultValue={
                  currentOrder.expected_end_date
                    ? currentOrder.expected_end_date.substring(0, 10)
                    : ""
                }
                render={({ field: { onChange, value } }) => (
                  <input
                    className={
                      role === "admin"
                        ? style.modalWindow__inputU
                        : style.modalWindow__input
                    }
                    disabled={role !== "admin"}
                    type="date"
                    onChange={onChange}
                    value={value}
                    style={{
                      width: "210px",
                    }}
                  />
                )}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.startdate && <p>{errors?.startdate?.message}</p>}
              </span>
            </div>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: "15px" }}
          >
            <div style={{ width: "175px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Формат
              </label>
              <select
                id="countries"
                style={{ padding: "12px" }}
                {...register("format", {
                  required: "Поле обязательно",
                })}
                className={
                  role === "admin"
                    ? style.modalWindow__inputU
                    : style.modalWindow__input
                }
                disabled={role !== "admin"}
              >
                <option value="">Выбрать Формат</option>

                {format.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <span className={style.select__error}>
                {errors?.format && (
                  <p style={{ lineHeight: "16px" }}>
                    {errors?.format?.message}
                  </p>
                )}
              </span>
            </div>

            <div style={{ display: "grid", marginTop: "5px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Количество показов
              </label>
              <Controller
                name="expectedView"
                control={control}
                rules={{
                  required: "Поле обязательно к заполнению",
                }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <input
                    className={style.modalWindow__inputU}
                    type="text"
                    value={value.toLocaleString("en-US")}
                    style={{
                      width: "245px",
                    }}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      const newValue = rawValue ? parseInt(rawValue, 10) : "";
                      onChange(newValue);
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                    placeholder="Количество показов"
                    autoComplete="off"
                    step="1000"
                    disabled={!selectedFormat}
                  />
                )}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.expectedView && (
                  <p style={{ width: "240px", lineHeight: "1.4" }}>
                    {errors?.expectedView?.message}
                  </p>
                )}
              </span>
            </div>
          </div>
          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: "15px", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                  Тякущий ролик:
                </label>
                <a
                  href={currentOrder.promo_file}
                  target="_blank"
                  className={style.fileWrapper}
                >
                  Ролик
                  <File
                    style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                  />
                </a>
              </div>
            </div>

            <div style={{ display: "grid" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Бюджет ($)
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                style={{
                  width: "150px",
                }}
                value={
                  isNaN(budgett)
                    ? currentOrder.budget.toLocaleString("en-US")
                    : budgett.toLocaleString("en-US")
                }
                placeholder="Бюджет"
                autoComplete="off"
                disabled={true}
              />
            </div>
          </div>

          <div className="modalWindow__wrapper_input">
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Загрузить новый ролик
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className={style.modalWindow__file}
                {...register("selectedFile")}
              />
              <span className={style.modalWindow__input_error}>
                {errors?.selectedFile && <p>{errors?.selectedFile?.message}</p>}
              </span>
            </div>
          </div>
          <div className={style.btn__wrapper}>
            {role === "admin" ? (
              <ButtonBorder
                onClick={() => {
                  handleRemoveInventory();
                }}
              >
                <Delete
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "10px",
                  }}
                />
                Удалить
              </ButtonBorder>
            ) : null}

            <button
              style={{ display: "flex", alignItems: "center" }}
              type="submit"
              disabled={!isValid || isOrderCreated}
              className={
                isValid && !isOrderCreated
                  ? style.btn__wrapper__btn
                  : style.btn__wrapper__disabled
              }
            >
              {isOrderCreated ? (
                <>
                  <span>Сохранить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Сохранить</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
