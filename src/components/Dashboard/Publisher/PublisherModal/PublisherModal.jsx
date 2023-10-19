import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addPublisher } from "../../../../redux/publisher/publisherSlice";
import { useForm } from "react-hook-form";
import { toastConfig } from "../../../../utils/toastConfig";
import InputUI from "../../../UI/InputUI/InputUI";
import { ReactComponent as Close } from "src/assets/Modal/Close.svg";
import { hideModalPablisher } from "src/redux/modalSlice";
import { ButtonModal } from "src/components/UI/ButtonUI/ButtonUI";

export default function PublisherModal() {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      startdate: "",
      enddate: "",
      expectedView: "",
      budget: "",
      format: "",
      selectedFile: null,
    },
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    const order = dispatch(addPublisher({ data }));
    if (order) {
      toast.success("Паблишер успешно создан!", toastConfig);

      dispatch(hideModalPablisher());
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Что то пошло не так!", toastConfig);
    }
  };
  const handleButtonClick = () => {
    dispatch(hideModalPablisher());
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modalWindow__title">
          Cоздать паблишера
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
