import React from "react";
import style from "./BuisnessModel.module.scss";
import { useForm } from "react-hook-form";
import FormPub from "src/assets/Site/formpub.png";

function RightForm() {
  const [isLoginP, setIsLoginP] = React.useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      link: "",
    },
  });

  const onSubmitPublisher = async (data) => {
    try {
      setIsLoginP(true);

      setIsLoginP(false);
    } catch (error) {
      setIsLoginP(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitPublisher)}>
      <div className={style.login__wrapper}>
        <div className={style.login__wrapper__table_header}>
          <div className={style.login__wrapper__table_title}>
            <img src={FormPub} alt="" />
            Монетизировать контент
          </div>
          <div className={style.login__wrapper__table_subtitle}>
            Если вы владелец канала
          </div>
        </div>

        <div>
          <div className={style.modalWindow}>
            <div className={style.inputContainer}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#FF5621",
                  fontWeight: "600",
                  marginBottom: "3px",
                }}
              >
                Имя
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                autoComplete="off"
                {...register("name", {
                  required: "Поле обезательно к заполнению",
                })}
              />
            </div>
          </div>

          <div className={style.modalWindow}>
            <div className={style.inputContainer}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#FF5621",
                  fontWeight: "600",
                  marginBottom: "3px",
                }}
              >
                Email
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                autoComplete="off"
                {...register("email", {
                  required: "Поле обезательно к заполнению",
                })}
              />
            </div>
          </div>
          <div className={style.modalWindow}>
            <div className={style.inputContainer}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#FF5621",
                  fontWeight: "600",
                  marginBottom: "3px",
                }}
              >
                Телефон
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                autoComplete="off"
                {...register("phone", {
                  required: "Поле обезательно к заполнению",
                })}
              />
            </div>
          </div>

          <div className={style.modalWindow}>
            <div className={style.inputContainer}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#FF5621",
                  fontWeight: "600",
                  marginBottom: "3px",
                }}
              >
                Ссылка на канал
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                autoComplete="off"
                {...register("link", {
                  required: "Поле обезательно к заполнению",
                })}
              />
            </div>
          </div>
          <div className={style.btn__wrapper}>
            <button
              style={{ display: "flex", alignItems: "center" }}
              type="submit"
              disabled={!isValid || isLoginP}
              className={
                isValid && !isLoginP
                  ? style.btn__wrapper__btn
                  : style.btn__wrapper__disabled
              }
            >
              {isLoginP ? (
                <>
                  <span>Отправить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Отправить</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RightForm;
