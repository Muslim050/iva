import React from "react";
import { useForm } from "react-hook-form";
import style from "./BuisnessModel.module.scss";
import axios from "axios";
import FormAdv from "src/assets/Site/formadv.png";

function LeftForm() {
  const [isLogin, setIsLogin] = React.useState(false);

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api.sendgrid.com/v3/mail/send",
        {
          personalizations: [
            {
              to: [
                {
                  email: "recipient_email@example.com", // Замените на адрес получателя
                },
              ],
            },
          ],
          from: {
            email: "your_email@example.com", // Замените на свой адрес электронной почты
          },
          subject: "Запрос от рекламодателя",
          content: [
            {
              type: "text/plain",
              value: `Имя: ${data.name}\nEmail: ${data.email}\nТелефон: ${data.phone}\nКомпания: ${data.company}`,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "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", // Замените на ваш API-ключ SendGrid
          },
        }
      );

      if (response.status === 202) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Email error: " + error);
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.login__wrapper}>
        <div className={style.login__wrapper__table_header}>
          <div className={style.login__wrapper__table_title}>
            <img src={FormAdv} alt="" />
            Заказать рекламу
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
              style={{ display: "flex", alignItems: "center" }}
              type="submit"
              disabled={!isValid || isLogin}
              className={
                isValid && !isLogin
                  ? style.btn__wrapper__btn
                  : style.btn__wrapper__disabled
              }
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
    </form>
  );
}

export default LeftForm;