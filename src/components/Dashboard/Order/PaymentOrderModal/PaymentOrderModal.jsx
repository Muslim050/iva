import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmPayment, fetchOrder } from "../../../../redux/order/orderSlice";
import { toastConfig } from "../../../../utils/toastConfig";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { hideModalPayment } from "src/redux/modalSlice";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";

export default function PaymentOrderModal({ advert }) {
  const dispatch = useDispatch();

  const { paymentData } = useSelector((state) => state.modal);

  const handleConfirmPayment = (id) => {
    dispatch(confirmPayment({ id }))
      .then(() => {
        dispatch(fetchOrder());
        dispatch(hideModalPayment());
      })
      .catch((error) => {
        toast.error("Произошла ошибка при подтверждении оплаты!", toastConfig);
      });
  };

  console.log("open");
  return (
    <>
      <div>
        <div className="modalWindow__title">
          Подвердить статус оплаты
          <Close
            className="modalWindow__title__button"
            onClick={() => dispatch(hideModalPayment())}
          />
        </div>

        <div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "15px" }}>
              <ButtonModal
                isValid={true}
                onClick={() => handleConfirmPayment(paymentData.id)}
              >
                Да
              </ButtonModal>
            </div>

            <ButtonModal
              isValid={true}
              onClick={() => dispatch(hideModalPayment())}
            >
              Нет
            </ButtonModal>
          </div>
        </div>
      </div>
    </>
  );
}
