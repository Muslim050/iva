import axios from "axios";
import React from "react";
import style from "./ModalSent.module.scss";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import backendURL from "src/utils/url";
import {ButtonModal} from "src/components/UI/ButtonUI/ButtonUI";
import InputUI from "../../../../UI/InputUI/InputUI";
import {toastConfig} from "../../../../../utils/toastConfig";
import SelectUI from "../../../../UI/SelectUI/SelectUI";
import {useDispatch} from "react-redux";
import {fetchInventory} from "../../../../../redux/inventory/inventorySlice";

const categoryC = [
  {id: 1, text: "Шоу"},
  {id: 2, text: "Драмма"},
  {id: 3, text: "Клип"},
];
const format = [
  {value: 'preroll', text: 'Pre-roll'},
  {value: 'mixroll', text: 'Mix-roll'},
]

export default function AddVideo ({setOpenPopoverIndex, item}) {
  const [channelModal, setChannelModal] = React.useState ([]);
  const [selectedTimer, setSelectedTimer] = React.useState ("");
  const [selectedTimervideo_duration, setSelectedTimervideo_duration] = React.useState ("");
  const dispatch = useDispatch ()

  const id = Number (localStorage.getItem ("channelId"));
  const user = localStorage.getItem ("role");
  const fetchChannel = async () => {
    const token = localStorage.getItem ("token");
    const response = await axios.get (
      `${backendURL}/publisher/channel/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setChannelModal (response.data.data);
  };

  React.useEffect (() => {
    fetchChannel ();
  }, []);

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setValue,
    control
  } = useForm ({
    defaultValues: {
      expected_number_of_views: '',
      format: item.format,
      promo_start_at: 0,
      promo_duration: "",
      order_id: item.id,
      channel_id: user === 'channel' ? "" : id,
      video_name: "",
      category: "",
      video_duration: 0,
      publication_time: "",
    },
    mode: "onBlur",
  });

  const timeC = (event) => {
    const time = event.target.value;
    if (time === "") {
      setSelectedTimer ("00:00:00");
      setValue ("promo_start_at", 0);
    } else {
      setSelectedTimer (time);
      const [hours, minutes, seconds] = time.split (":").map (Number);
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      setValue ("promo_start_at", timeInSeconds);
    }
  };
  const timevideo_duration = (event) => {
    const time = event.target.value;
    if (time === "") {
      setSelectedTimervideo_duration ("00:00:00");
      setValue ("video_duration", 0);
    } else {
      setSelectedTimervideo_duration (time);
      const [hours, minutes, seconds] = time.split (":").map (Number);
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      setValue ("video_duration", timeInSeconds);
    }
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem ('token');

    try {
      const response = await axios.post (
        `${backendURL}/inventory/assign-to-order-with-new-video`,
        {
          expected_number_of_views: data.expected_number_of_views,
          format: data.format,
          promo_start_at: data.promo_start_at,
          promo_duration: data.promo_duration,
          order_assignment_id: data.order_id,
          channel_id: data.channel_id,
          video_name: data.video_name,
          category: data.category,
          video_duration: data.video_duration,
          publication_time: data.publication_time,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Debug log to inspect response

      if (response.data) {
        toast.success ("Видео успешно создано!", toastConfig);
        setOpenPopoverIndex (null);
        dispatch (fetchInventory ({orderAssignmentId: item.id}))
        // dispatch (fetchOnceListSentToPublisher ({is_deactivated: false}))
      } else {
        throw new Error ('Unexpected response payload');
      }
    } catch (error) {
      const errorData = error.response.data.error;
      let index = 1;
      const errorMessages = Object.keys (errorData).map ((key) => {
        let message = '';
        if (Array.isArray (errorData[key])) {
          message = errorData[key].map ((item) => `${index++}: ${item}`).join ('; ');
        } else {
          message = `${index++}: ${errorData[key]}`;
        }
        return `${key}:    ${message}`;
      }).join ('\n'); // Use '\n' to add a new line between each error message
      toast.error (errorMessages, toastConfig);
      setOpenPopoverIndex (null);
    }
  };
  const getThreeDaysAgo = () => {
    const today = new Date ();
    today.setDate (today.getDate () - 3);
    const year = today.getFullYear ();
    let month = today.getMonth () + 1;
    let day = today.getDate ();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };


  return (
    <>
      <form onSubmit={handleSubmit (onSubmit)}>
        {user === "publisher" ? (
          <SelectUI
            label="Канал"
            options={channelModal}
            register={register ('channel_id', {
              required: 'Поле обязательно для заполнения',
            })}
            error={errors?.channelID?.message}
            inputWidth
          />
        ) : (
          ""
        )}

        <InputUI
          label="Название видео"
          type="text"
          placeholder="Название видео"
          autoComplete="off"
          register={register}
          name="video_name"
          errors={errors.namevideo}
          inputWidth
        />
        <div style={{display: "flex", gap: "5px"}}>
          <div style={{display: 'grid', width: "100%"}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Выбрать Формат
            </label>
            <select
              id="countries"
              className={style.select__select}
              style={{border: errors?.expected_number_of_views ? "1px solid red" : "", padding: '12px'}}
              disabled={item.format === 'preroll'}
              {...register ('format', {
                required: 'Поле обязательно',
              })}
            >
              <option value="">Выбрать Формат</option>
              {format.map ((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <span className={style.select__error}>
                {errors?.format && (
                  <p style={{lineHeight: '16px'}}>
                    {errors?.format?.message}
                  </p>
                )}
              </span>
          </div>
          <div style={{width: '100%'}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Тайм код рекламы </label>
            <input
              className={style.input}
              type="time"
              step="1"
              inputMode="numeric"
              onChange={timeC}
              defaultValue="00:00:00"
              style={{border: errors?.promo_start_at ? "1px solid red" : ""}}

            />

          </div>
        </div>
        <div style={{display: "flex", gap: "5px", marginTop: "8px"}}>
          <div style={{width: "100%"}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Прогноз показов
            </label>
            <Controller
              name="expected_number_of_views"
              control={control}
              rules={{required: 'Поле обязательно к заполнению'}}
              defaultValue=""
              render={({field: {onChange, onBlur, value, name, ref}}) => (
                <input
                  className={style.input}
                  type="text"
                  value={value.toLocaleString ('en-US')}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace (/\D/g, '')
                    const newValue = rawValue ? parseInt (rawValue, 10) : ''
                    onChange (newValue)
                  }}
                  onBlur={onBlur}
                  style={{border: errors?.expected_number_of_views ? "1px solid red" : ""}}

                  name={name}
                  ref={ref}
                  placeholder="Прогноз показов"
                  autoComplete="off"
                  step="1000"
                />
              )}
            />

          </div>
          <div style={{display: "block", width: "100%"}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Дата публикаций
            </label>
            <input
              className={style.input}
              style={{border: errors?.publication_time ? "1px solid red" : ""}}
              type="date"
              min={getThreeDaysAgo ()}
              {...register ("publication_time", {
                required: "Поле обезательно",
              })}

            />
            <span className={style.inputError}>
              {errors?.startdate && <p>{errors?.startdate?.message}</p>}
            </span>
          </div>
        </div>


        <div style={{display: "flex", gap: "5px", marginTop: "8px"}}>
          <div style={{width: "100%"}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Выбрать категорию
            </label>
            <select
              id="countries"
              className={style.select__select}
              style={{border: errors?.video_duration ? "1px solid red" : "", padding: "12px"}}
              {...register ("category", {
                required: "Поле обезательно",
              })}
            >
              <option value="">Выбрать категорию</option>
              {categoryC.map ((option, index) => (
                <option key={index} value={option.text}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>


          <div style={{width: '100%'}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Хрон видео
            </label>
            <div>
              <input
                className={style.input}
                type="time"
                step="1"
                inputMode="numeric"
                onChange={timevideo_duration}
                defaultValue="00:00:00"
                style={{border: errors?.video_duration ? "1px solid red" : ""}}
              />
            </div>
          </div>
        </div>

        <div style={{display: "flex", gap: "5px", marginTop: "8px"}}>
          <div style={{width: '100%'}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Хрон рекламы (сек)
            </label>
            <div>
              <input
                className={style.input}
                style={{border: errors?.promo_duration ? "1px solid red" : ""}}

                type="number"
                {...register ('promo_duration', {
                  required: 'Поле обязательно для заполнения',
                })}
              />
            </div>
          </div>


          <div style={{display: "inline-flex", justifyContent: "end", width: "100%", alignItems: "end"}}>
            <ButtonModal isValid={true} disabled={!isValid}>
              Создать
            </ButtonModal>
          </div>
        </div>


      </form>
    </>
  );
}
