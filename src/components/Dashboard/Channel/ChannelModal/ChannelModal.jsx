import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addChannel } from "../../../../redux/channel/channelSlice";
import { toastConfig } from "../../../../utils/toastConfig";
import SelectUI from "../../../UI/SelectUI/SelectUI";
import InputUI from "../../../UI/InputUI/InputUI";
import { hideModalChannel } from "src/redux/modalSlice";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";
import backendURL from "src/utils/url";

export default function ChannelModal({ setShowModal }) {
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = React.useState(true);

  const [publisherModal, setPublisherModal] = React.useState([]);

  const fetchPubl = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendURL}/publisher/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPublisherModal(response.data.data);
  };

  React.useEffect(() => {
    fetchPubl();
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      publisher: "",
      name: "",
      email: "",
      phone: "",
      channelId: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const order = dispatch(addChannel({ data }));
    if (order) {
      toast.success("Канал успешно создан!", toastConfig);
      dispatch(hideModalChannel());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      setShowModal(false);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };
  const handleButtonClick = () => {
    dispatch(hideModalChannel());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать канал
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>
        <div className="modalWindow">
          <SelectUI
            label="Паблишера"
            options={publisherModal}
            register={register("publisher")}
            error={errors?.publisher?.message}
            inputWidth
          />

          <div className="modalWindow__wrapper_input">
            <InputUI
              type="text"
              placeholder="Название канала"
              autoComplete="off"
              register={register}
              name="name"
              errors={errors.name}
              marginRight="10px"
            />

            <InputUI
              type="text"
              placeholder="998()###-##-##"
              autoComplete="off"
              register={register}
              name="phone"
              errors={errors.phone}
            />
          </div>

          <InputUI
            type="text"
            placeholder="Email"
            autoComplete="off"
            register={register}
            name="email"
            errors={errors.email}
            inputWidth="inputSmall"
          />

          <InputUI
            type="text"
            placeholder="Channel Id"
            autoComplete="off"
            register={register}
            name="channelId"
            errors={errors.channelId}
            inputWidth="inputSmall"
            minLength={{
              value: 10,
              message:
                "1.Войдите в аккаунт YouTube, 2.Нажмите на фото профиля в правом верхнем углу страницы Настройки, 3.В меню слева выберите Расширенные настройки, 4.Откроется страница с идентификаторами пользователя и канала скопируйте 'Идентификатор канала'.",
            }}
          />

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
