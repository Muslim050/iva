import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPublisherUsers } from "../../../../../redux/publisherUsers/publisherUsersSlice";
import { useForm } from "react-hook-form";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";

import InputUI from "../../../../UI/InputUI/InputUI";
import SelectUI from "../../../../UI/SelectUI/SelectUI";
import { toastConfig } from "../../../../../utils/toastConfig";
import { hideModalPablisherUser } from "src/redux/modalSlice";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";
import backendURL from "src/utils/url";

export default function PublisherModalUsers({ setShowModal }) {
  const dispatch = useDispatch();

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
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      publisher: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const pubUser = dispatch(addPublisherUsers({ data }));
    if (pubUser) {
      toast.success("Пользователь паблишера успешно создан!", toastConfig);

      dispatch(hideModalPablisherUser());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };
  const handleButtonClick = () => {
    dispatch(hideModalPablisherUser());
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
              placeholder=" Имя"
              autoComplete="off"
              register={register}
              name="firstname"
              errors={errors.firstname}
              marginRight="10px"
            />

            <InputUI
              type="text"
              placeholder=" Фамилия"
              autoComplete="off"
              register={register}
              name="lastname"
              errors={errors.lastname}
            />
          </div>

          <InputUI
            type="text"
            placeholder=" Email"
            autoComplete="off"
            register={register}
            name="email"
            errors={errors.email}
            inputWidth
          />

          <div className="modalWindow__wrapper_input">
            <InputUI
              type="text"
              placeholder="Логин"
              autoComplete="off"
              register={register}
              name="username"
              errors={errors.username}
            />

            <InputUI
              type="text"
              placeholder=" 998()###-##-##"
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
            />

            <SelectUI
              label="Паблишера"
              options={publisherModal}
              register={register("publisher", {
                required: "Поле обязательно для заполнения",
              })}
              error={errors?.publisher?.message}
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
