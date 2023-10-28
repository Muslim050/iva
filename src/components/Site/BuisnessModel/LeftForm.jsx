import React from "react";
import { useForm } from "react-hook-form";
import style from "./BuisnessModel.module.scss";
import FormAdv from "src/assets/Site/formadv.png";

function LeftForm() {
  const [isLogin, setIsLogin] = React.useState(false);

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const submitForm = () => {
    const formData = getValues();
    const subject = `Заказ рекламы от ${formData.company}`;
    const emailBody = `Имя: ${formData.name}
    Email: ${formData.email}
    Телефон: ${formData.phone}
    Компания: ${formData.company}`;
    const mailtoLink = `mailto:adtechmediainfo@gmail.com?subject=${subject}
    &body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className={style.login__wrapper}>
        <div className={style.login__wrapper__table_header}>
          <div className={style.login__wrapper__table_title}>
            <img src={FormAdv} alt="" /> Заказать рекламу
          </div>
          <div className={style.login__wrapper__table_subtitle}>
            Если вы рекламодатель
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
                Компания
              </label>
              <input
                className={style.modalWindow__input}
                type="text"
                autoComplete="off"
                {...register("company", {
                  required: "Поле обезательно к заполнению",
                })}
              />
            </div>
          </div>
          <div className={style.btn__wrapper}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
              }}
              type="submit"
              disabled={!isValid || isLogin}
              className={
                isValid && !isLogin
                  ? style.btn__wrapper__btn
                  : style.btn__wrapper__disabled
              }
              onClick={submitForm}
            >
              {isLogin ? (
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
    </div>
  );
}

export default LeftForm;
