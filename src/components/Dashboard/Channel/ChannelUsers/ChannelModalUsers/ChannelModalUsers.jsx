import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

// import style from "./ChannelModalUsers.module.scss";
import { addChannelUsers } from "../../../../../redux/channelUsers/channelUsersSlice";
import InputUI from "../../../../UI/InputUI/InputUI";
import SelectUI from "../../../../UI/SelectUI/SelectUI";
import { toastConfig } from "../../../../../utils/toastConfig";
import { hideModalChannelUser } from "src/redux/modalSlice";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";
import backendURL from "src/utils/url";

export default function ChannelModalUsers({ setShowModal }) {
  const dispatch = useDispatch();

  const [channelModal, setChannelModal] = React.useState([]);

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
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      channel: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const pubUser = dispatch(addChannelUsers({ data }));
    if (pubUser) {
      toast.success("Пользователь паблишера успешно создан!", toastConfig);

      dispatch(hideModalChannelUser());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };
  const handleButtonClick = () => {
    dispatch(hideModalChannelUser());
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать пользователя
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>

        <div className="modalWindow">
          <div className="modalWindow__wrapper_input">
            <InputUI
              type="text"
              placeholder="Имя"
              autoComplete="off"
              register={register}
              name="firstname"
              errors={errors.firstname}
              marginRight="10px"
            />

            <InputUI
              type="text"
              placeholder="Фамилия"
              autoComplete="off"
              register={register}
              name="lastname"
              errors={errors.lastname}
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
          <div className="modalWindow__wrapper_input">
            <InputUI
              type="text"
              placeholder="Логин"
              autoComplete="off"
              register={register}
              name="username"
              errors={errors.username}
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
          <div className="modalWindow__wrapper_input">
            <InputUI
              type="text"
              placeholder="Пароль"
              autoComplete="off"
              register={register}
              name="password"
              errors={errors.password}
              marginRight="10px"
            />

            <SelectUI
              label="канал"
              options={channelModal}
              register={register("channel", {
                required: "Поле обязательно для заполнения",
              })}
              error={errors?.channel?.message}
            />
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
