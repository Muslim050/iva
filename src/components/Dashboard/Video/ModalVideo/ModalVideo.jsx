import axios from "axios";
import React from "react";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import style from "./ModalVideo.module.scss";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addVideos } from "../../../../redux/video/videoSlice";
import { toastConfig } from "../../../../utils/toastConfig";
import SelectUI from "../../../UI/SelectUI/SelectUI";
import InputUI from "../../../UI/InputUI/InputUI";
import backendURL from "src/utils/url";
import { hideModalVideo } from "src/redux/modalSlice";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";
const categoryC = [
  { id: 1, text: "Шоу" },
  { id: 2, text: "Драмма" },
  { id: 3, text: "Клип" },
];

export default function ModalVideo({ setShowModal }) {
  const dispatch = useDispatch();
  const [channelModal, setChannelModal] = React.useState([]);
  const [publisherModal, setPublisherModal] = React.useState([]);
  const [selectedTimer, setSelectedTimer] = React.useState("");

  const id = Number(localStorage.getItem("channelId"));
  const user = localStorage.getItem("role");

  const timeC = (event) => {
    const time = event.target.value;
    if (time === "") {
      setSelectedTimer("00:00:00");
      setValue("timecod", 0);
    } else {
      setSelectedTimer(time);
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      setValue("timecod", timeInSeconds);
    }
  };
  const fetchChannel = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendURL}/publisher/channel/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setChannelModal(response.data.data);
  };

  React.useEffect(() => {
    fetchChannel();
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      channelID: id,
      namevideo: "",
      startdate: "",
      category: "",
      timecod: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const video = dispatch(addVideos({ data }));
    if (video) {
      toast.success("Видео успешно создан!", toastConfig);

      dispatch(hideModalVideo());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getThreeDaysAgo = () => {
    const today = new Date();
    today.setDate(today.getDate() - 3);
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleButtonClick = () => {
    dispatch(hideModalVideo());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать Видео
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>

        {/*body*/}
        <div className="modalWindow">
          {user === "publisher" ? (
            <SelectUI
              label="Канал"
              options={channelModal}
              register={register("channelID", {
                required: "Поле обязательно для заполнения",
              })}
              error={errors?.publisher?.message}
              inputWidth
            />
          ) : (
            ""
          )}

          <InputUI
            label="Название видео"
            type="text"
            placeholder="Название видео"
            autoComplete="off"
            register={register}
            name="namevideo"
            errors={errors.namevideo}
            inputWidth
          />

          <div className="modalWindow__wrapper_input">
            <div style={{ width: "100%" }}>
              <select
                id="countries"
                className={style.select__select}
                style={{ padding: "12px" }}
                {...register("category", {
                  required: "Поле обезательно",
                })}
              >
                <option value="">Выбрать категорию</option>

                {categoryC.map((option, index) => (
                  <>
                    <option key={index} value={option.text}>
                      {option.text}
                    </option>
                  </>
                ))}
              </select>
              <span className={style.select__error}>
                {errors?.option && (
                  <p style={{ lineHeight: "16px" }}>
                    {errors?.option?.message}
                  </p>
                )}
              </span>
            </div>

            <div
              style={{ width: "100%", marginLeft: "8px", marginBottom: "25px" }}
            >
              <div style={{ display: "block" }}>
                <input
                  className={style.input}
                  type="date"
                  min={getThreeDaysAgo()}
                  {...register("startdate", {
                    required: "Поле обезательно",
                  })}
                  style={{
                    width: "210px",
                  }}
                />
                <span className={style.inputError}>
                  {errors?.startdate && <p>{errors?.startdate?.message}</p>}
                </span>
              </div>
            </div>
          </div>
          <div style={{ width: "180px" }}>
            <label style={{ fontSize: "12px", color: "var(--text-color)" }}>
              Хрон видео
            </label>
            <input
              className={style.input}
              type="time"
              step="1"
              inputmode="numeric"
              onChange={timeC}
              defaultValue="00:00:00"
            />
            <span className={style.error}>
              {errors?.timecod && <p>{errors?.timecod?.message}</p>}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <ButtonModal isValid={true} disabled={!isValid}>
              Создать
            </ButtonModal>
          </div>
        </div>
      </form>
    </>
  );
}
