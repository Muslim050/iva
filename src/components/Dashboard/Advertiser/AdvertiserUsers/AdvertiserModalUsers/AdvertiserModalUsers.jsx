import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { hideModalAdvertiserUser } from "src/redux/modalSlice";
import SelectUI from "src/components/UI/SelectUI/SelectUI";
import InputUI from "src/components/UI/InputUI/InputUI";
import { toastConfig } from "src/utils/toastConfig";
import { addAdvertiserUsers } from "src/redux/advertiserUsers/advertiserUsersSlice";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";
import backendURL from "src/utils/url";

export default function AdvertiserModalUsers() {
  const dispatch = useDispatch();

  const [advertiserModal, setAdvertiserModal] = React.useState([]);

  const fetchAdvertiser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendURL}/advertiser/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAdvertiserModal(response.data.data);
  };
  React.useEffect(() => {
    fetchAdvertiser();
  }, []);

  const handleButtonClick = () => {
    dispatch(hideModalAdvertiserUser());
  };

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
      advertiser: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const advertiser = dispatch(addAdvertiserUsers({ data }));
    if (advertiser) {
      toast.success("Пользователь рекламодателя успешно создан!", toastConfig);
      dispatch(hideModalAdvertiserUser());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
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
              placeholder="UserName"
              autoComplete="off"
              register={register}
              name="username"
              errors={errors.username}
              marginRight="10px"
            />

            <InputUI
              type="text"
              placeholder="Номер телефона"
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
              label="Рекломадателя"
              options={advertiserModal}
              register={register("advertiser", {
                required: "Поле обязательно",
              })}
              error={errors?.advertiser?.message}
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
