import axios from "axios";
import React from "react";
import style from "./ModalSent.module.scss";
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import backendURL from "src/utils/url";
import {ButtonModal} from "src/components/UI/ButtonUI/ButtonUI";
import {toastConfig} from "../../../../../utils/toastConfig";
import SelectUI from "../../../../UI/SelectUI/SelectUI";
import {fetchOnceListSentToPublisher} from "../../../../../redux/order/SentToPublisher";

const categoryC = [
  {id: 1, text: "Шоу"},
  {id: 2, text: "Драмма"},
  {id: 3, text: "Клип"},
];
const format = [
  {value: 'preroll', text: 'Pre-roll'},
  {value: 'mixroll', text: 'Mix-roll'},
]

export default function SelectedVideo ({setOpenPopoverIndex, item}) {
  const dispatch = useDispatch ();
  const [channelModal, setChannelModal] = React.useState ([]);
  const [selectedTimer, setSelectedTimer] = React.useState ("");
  const [tabs, setTabs] = React.useState ('1');
  const channelid = Number (localStorage.getItem ("channelId"));
  const user = localStorage.getItem ("role");
  const [videoModal, setVideoModal] = React.useState ([])
  console.log (item)
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


  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setValue,
    control,
    watch
  } = useForm ({
    defaultValues: {
      expected_number_of_views: '',
      format: item.format,
      promo_start_at: 0,
      promo_duration: "",
      order_id: item.id,
      video_id: '',
      channel_id: ""
    },
    mode: "onBlur",
  });
  const cId = watch ('channel_id')
  const onSubmit = async (data) => {
    const token = localStorage.getItem ('token');

    try {
      const response = await axios.post (
        `${backendURL}/inventory/assign-to-order-with-existing-video`,
        {
          expected_number_of_views: data.expected_number_of_views,
          format: data.format,
          promo_start_at: data.promo_start_at,
          promo_duration: data.promo_duration,
          order_assignment_id: data.order_id,
          video_id: data.video_id,

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
        dispatch (fetchOnceListSentToPublisher ({}))
        setOpenPopoverIndex (null);
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

  const getCurrentDate = () => {
    const today = new Date ();
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

  const fetchChannel = async () => {
    const token = localStorage.getItem ('token')
    const response = await axios.get (
      `${backendURL}/publisher/channel/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setChannelModal (response.data.data)
  }

  React.useEffect (() => {
    // if (user === 'channel') {
    //   fetchVideo ()
    // }
    if (cId) {
      fetchVideo ()

    }
    fetchVideo ()
  }, [dispatch])

  React.useEffect (() => {
    fetchChannel ()
  }, [dispatch])


  const fetchVideo = async () => {
    try {
      const token = localStorage.getItem ('token')
      const response = await axios.get (
        `${backendURL}/inventory/video/?channel_id=${cId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setVideoModal (
        // response.data.data
        response.data.data,
      )
    } catch (error) {
      console.error ('Error fetching video:', error)
    }
  }


  return (
    <>
      <div>


        {/*body*/}
        <div className="modalWindow">

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

            <SelectUI
              label="Видео"
              options={Array.isArray (videoModal) ? videoModal : []}
              register={register ('video_id', {
                required: 'Поле обязательно для заполнения',
              })}
              error={errors?.video?.message}
              inputWidth
            />
            <div style={{display: "flex", gap: "5px", marginTop: "-15px"}}>

              <div style={{width: '100%', display: 'grid'}}>
                <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
                  Выбрать Формат
                </label>
                <select
                  id="countries"
                  disabled={item.format === 'preroll'}
                  className={style.select__select}
                  style={{padding: '12px'}}
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
                />
                <span className={style.error}>
                  {errors?.timecod && <p>{errors?.timecod?.message}</p>}
                </span>
              </div>


            </div>


            <div style={{display: "flex", gap: "5px", marginTop: "8px"}}>
              <div style={{width: '100%'}}>
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
                      name={name}
                      ref={ref}
                      placeholder="Прогноз показов"
                      autoComplete="off"
                      step="1000"
                    />
                  )}
                />
                <span className={style.error}>
            {errors?.numberview && <p>{errors?.numberview?.message}</p>}
          </span>
              </div>

              <div style={{width: '100%'}}>
                <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
                  Хрон рекламы (сек)
                </label>
                <div style={{marginBottom: '24px'}}>
                  <input
                    className={style.input}
                    type="number"
                    {...register ('promo_duration', {
                      required: 'Поле обязательно для заполнения',
                    })}
                  />

                  <span className={style.error}>
              {errors?.videotiming && <p>{errors?.videotiming?.message}</p>}
            </span>
                </div>
              </div>
            </div>


            <div style={{display: "flex", justifyContent: "end"}}>
              <ButtonModal isValid={true} disabled={!isValid}>
                Создать
              </ButtonModal>
            </div>
          </form>


        </div>
      </div>
    </>
  );
}
