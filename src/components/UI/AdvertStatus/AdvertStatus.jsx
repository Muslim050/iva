import React from "react";
import style from "./AdvertStatus.module.scss";

const statusTexts = {
  sent: "Отправлено",
  in_review: "Рассматривается",
  confirmed: "Подтверждён",
  in_progress: "Активен",
  accepted: "Получен",
  confirmed_by_channel: "",
  open: "Доступный",
  pre_booked: "Пре_бронь",
  booked: "Бронь",
  in_use: "Активный",
  unused: "Не продан",
  inactive: "Завершен",
  finished: "Завершен",
};

const AdvertStatus = ({ status, children }) => {
  const statusText = statusTexts[status] || "Неизвестный статус";

  return (
    <div className={`${style.wrapper__status} ${style[status]}`}>
      {statusText}

      {children}
    </div>
  );
};

export default AdvertStatus;
