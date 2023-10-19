import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toastConfig } from "../../../../../utils/toastConfig";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { inventoryVerify } from "../../../../../redux/inventoryStatus/inventoryStatusSlice";
import { toast } from "react-toastify";
import { fetchOrder } from "../../../../../redux/order/orderSlice";
import { ReactComponent as Linkk } from "src/assets/link.svg";

import style from "./VerifyModal.module.scss";
import { hideModalVerify } from "src/redux/modalSlice";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";

function VerifyModal({
  setShowModalSelectingVerify,
  expandedRows,
  selectedInventoryId,
  videoLink,
}) {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      linkvideo: "",
      inventory: selectedInventoryId,
      order: expandedRows,
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const confirmVerify = window.confirm(
      "Данная ссылка будет прикреплена к данному инвентарю?"
    );
    if (confirmVerify) {
      dispatch(inventoryVerify({ data }))
        .then((response) => {
          // Проверка на наличие ошибки в ответе
          if (!response.error) {
            toast.success("Ссылка успешно прикреплена!", toastConfig);
            setShowModalSelectingVerify(false);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
            fetchOrder();
          }
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
        });
    } else {
      toast.error("Попробуйте еще раз", toastConfig);
    }
  };

  const handleButtonClick = () => {
    dispatch(hideModalVerify());
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modalWindow__title">
            Модерация рекламы
            <Close
              className="modalWindow__title__button"
              onClick={handleButtonClick}
            />
          </div>

          <div className="modalWindow">
            <div style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <div className={style.modalWindow__label}>
                  Ссылка на Видео для проверки: &nbsp;
                </div>
                <div style={{ display: "flex" }}>
                  <a
                    href={
                      videoLink.video_content.link_to_video === null
                        ? null
                        : `${videoLink.video_content.link_to_video}&t=${videoLink.start_at}`
                    }
                    target="_blank"
                    disabled={videoLink === null}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: videoLink === null ? "not-allowed" : "pointer",
                    }}
                    className={
                      videoLink === null
                        ? style.linkWrapper__dis
                        : style.linkWrapper__file
                    }
                    onClick={(e) => {
                      if (videoLink === null) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Ссылка
                    <Linkk
                      style={{
                        width: "18px",
                        height: "18px",
                        marginLeft: "5px",
                      }}
                    />
                  </a>
                </div>
              </div>

              <div style={{ marginTop: "20px", marginBottom: "30px" }}>
                <input
                  className={style.modalWindow__input}
                  type="text"
                  placeholder="Ссылка на Видео"
                  autoComplete="off"
                  {...register("linkvideo", {
                    required: "Поле обезательно к заполнению",
                  })}
                />
                <span className={style.modalWindow__input_error}>
                  {errors?.linkvideo && <p>{errors?.linkvideo?.message}</p>}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <ButtonModal isValid={true} disabled={!isValid}>
                Прикрепить
              </ButtonModal>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default VerifyModal;
