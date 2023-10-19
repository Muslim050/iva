import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import style from "./EditVideoModal.module.scss";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import { ReactComponent as Delete } from "src/assets/Table/Delete.svg";
import {
  deleteInventory,
  fetchInventory,
} from "src/redux/inventory/inventorySlice";
import { toastConfig } from "src/utils/toastConfig";
import { fetchEditVideo, fetchVideos } from "src/redux/video/videoSlice";

// Функция для преобразования секунд в формат "часы:минуты:секунды"
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}
// Функция для преобразования времени в секунды
function timeToSeconds(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
const categoryC = [
  { id: 1, text: "Шоу" },
  { id: 2, text: "Драмма" },
  { id: 3, text: "Клип" },
];
export default function EditVideoModal({
  setShowModalEditAdmin,
  currentOrder,
}) {
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
  const [startAtInSeconds, setStartAtInSeconds] = React.useState(
    currentOrder.duration
  );
  const [isOrderCreated, setIsOrderCreated] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState([]);
  console.log("currentOrder", currentOrder);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      name: currentOrder.name,
      category: currentOrder.category,
      stardate: currentOrder.publication_time,
      start_at: secondsToTime(currentOrder.duration),
      link_to_video: currentOrder.link_to_video,
      video_id: currentOrder.video_id,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        duration: startAtInSeconds,
      };
      const response = await dispatch(
        fetchEditVideo({ id: currentOrder.id, data: dataToSend })
      );
      if (response && !response.error) {
        toast.success("Изминения успешно обновлены!", toastConfig);
        setShowModalEditAdmin(false);
        dispatch(fetchVideos());
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
      dispatch(deleteInventory({ id: currentOrder.id }))
        .then(() => {
          toast.success("Инвентарь успешно удален", toastConfig);
          setShowModalEditAdmin(false);
          dispatch(fetchInventory());
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          dispatch(fetchInventory());
        });
    } else {
      toast.info("Операция отменена", toastConfig);
    }
  };

  const handleTimeBlur = (event) => {
    const time = event.target.value;
    const seconds = timeToSeconds(time);
    setStartAtInSeconds(seconds);
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
          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: "15px" }}
          >
            <div style={{ display: "grid", width: "100%" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Название Видео
              </label>
              <input
                type="text"
                className={style.modalWindow__inputU}
                {...register("name", {
                  required: "Название Видео обезательно",
                })}
              />
            </div>
          </div>

          <div
            className="modalWindow__wrapper_input"
            style={{ marginBottom: "18px" }}
          >
            <div style={{ display: "grid" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Формат
              </label>
              <select
                id="countries"
                style={{ padding: "12px", width: "200px" }}
                {...register("category", {
                  required: "Поле обязательно",
                })}
                className={style.modalWindow__inputU}
              >
                <option value="">Выбрать Формат</option>

                {categoryC.map((option, index) => (
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

            <div style={{ display: "grid", marginLeft: "10px" }}>
              <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                Тайм код рекламы
              </label>
              <input
                style={{ padding: "12px", width: "200px" }}
                className={style.modalWindow__inputU}
                type="time"
                step="1"
                inputMode="numeric"
                {...register("start_at")}
                onBlur={handleTimeBlur} // Обработчик onBlur для преобразования времени в секунды
              />
              <span className={style.error}>
                {errors?.start_at && <p>{errors?.start_at?.message}</p>}
              </span>
            </div>
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
                name="publication_time"
                control={control}
                defaultValue={
                  currentOrder.publication_time
                    ? currentOrder.publication_time.substring(0, 10)
                    : ""
                }
                render={({ field: { onChange, value } }) => (
                  <input
                    className={style.modalWindow__inputU}
                    type="date"
                    onChange={onChange}
                    value={value}
                    style={{ padding: "12px", width: "200px" }}
                  />
                )}
              />
            </div>
          </div>

          {currentOrder.link_to_video && (
            <div style={{ marginBottom: "15px" }}>
              <div style={{ display: "grid", marginBottom: "18px" }}>
                <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                  Ссылка на видео
                </label>
                <input
                  type="text"
                  className={style.modalWindow__inputU}
                  {...register("link_to_video", {
                    required: "Название рекламной кампании обезательно",
                  })}
                />
              </div>

              <div style={{ display: "grid", marginBottom: "18px" }}>
                <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
                  Видео ID v=
                </label>
                <input
                  type="text"
                  className={style.modalWindow__inputU}
                  {...register("video_id", {
                    required: "Название рекламной кампании обезательно",
                  })}
                />
              </div>
            </div>
          )}

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
              // disabled={!isValid || isOrderCreated}
              className={style.btn__wrapper__btn}
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
