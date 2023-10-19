import React from "react";
import { useDispatch } from "react-redux";
import style from "./TableLinkedVideo.module.scss";
import { toast } from "react-toastify";
import { inventoryPublish } from "../../../../../redux/inventory/inventorySlice";
import { useForm } from "react-hook-form";
import { toastConfig } from "../../../../../utils/toastConfig";
import {
  hideModalVideoLinked,
  showModalVideoLinked,
} from "src/redux/modalSlice";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";

export default function TableLinkedVideo({
  setShowModalSelectingInventory,
  selectedId,
}) {
  const dispatch = useDispatch();
  const [publisherModal, setPublisherModal] = React.useState([]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      selectedId,
      linkvideo: "",
      videoId: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const videolink = dispatch(inventoryPublish({ data }));
    if (videolink) {
      toast.success("Ссылка на видео приклеплена!", toastConfig);

      dispatch(hideModalVideoLinked());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };
  const handleButtonClick = () => {
    dispatch(hideModalVideoLinked());
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Прикрепить Видео
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>

        <div className="modalWindow">
          <div style={{ width: "400px", marginBottom: "30px" }}>
            <input
              className={style.input}
              type="text"
              placeholder="Ссылка на Видео"
              autoComplete="off"
              {...register("linkvideo", {
                required: "Поле обезательно к заполнению",
              })}
            />
            <span className={style.modalWindow__input_error}>
              {errors?.namevideo && <p>{errors?.namevideo?.message}</p>}
            </span>
          </div>

          <div style={{ width: "400px", marginBottom: "30px" }}>
            <input
              className={style.input}
              type="text"
              placeholder="Видео ID v="
              autoComplete="off"
              {...register("videoId", {
                required: "Поле обезательно к заполнению",
              })}
            />
            <span className={style.modalWindow__input_error}>
              {errors?.namevideo && <p>{errors?.namevideo?.message}</p>}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <ButtonModal isValid={true} disabled={!isValid}>
              Прикрепить
            </ButtonModal>
          </div>
        </div>
      </form>
    </>
  );
}
