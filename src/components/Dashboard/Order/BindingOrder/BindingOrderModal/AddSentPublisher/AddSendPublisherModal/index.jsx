import {useDispatch, useSelector} from "react-redux";
import React from "react";
import axios from "axios";
import backendURL from "../../../../../../../utils/url";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../../../../utils/toastConfig";
import {addRecord, fetchOnceListSentToPublisher} from "../../../../../../../redux/order/SentToPublisher";
import {fetchPublisher} from "../../../../../../../redux/publisher/publisherSlice";
import style from "./AddSendPublisherModal.module.scss";
import 'react-datepicker/dist/react-datepicker.css'

const format = [
  {value: 'preroll', text: 'Pre-roll'},
  {value: 'mixroll', text: 'Mix-roll'},
]

const AddSendPublisherModal = ({setViewNote, expandedRows}) => {
  const dispatch = useDispatch ();
  const [channelModal, setChannelModal] = React.useState ([]);
  const {publisher} = useSelector ((state) => state.publisher);
  const [publisherID, setPublisherID] = React.useState ('');
  const [cpm, setCpm] = React.useState ([])
  const [budgett, setBudgett] = React.useState (0)


  const selectedPublisher = (event) => {
    setPublisherID (event.target.value);
  };
  const fetchChannel = async () => {
    const token = localStorage.getItem ("token");
    const response = await axios.get (
      `${backendURL}/publisher/channel/${publisherID || ''}`,

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
  const onSubmit = async (data) => {
    try {
      const response = await dispatch (addRecord ({data}));

      // Debug log to inspect response
      console.log ('Response:', response);

      if (response.payload) {
        toast.success ("Видео успешно создано!", toastConfig);
        setViewNote (false)
        await dispatch (fetchOnceListSentToPublisher ({expandedRows}));
      } else {
        // Handle case where payload is not as expected
        throw new Error ('Unexpected response payload');
      }
    } catch (error) {
      // Debug log to inspect error
      console.error ('Error:', error);
      toast.error ("Произошла ошибка при создании записи!", toastConfig);
    }
  };
  const calculateBudget = () => {
    let newBudget = 0

    if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }

    setBudgett (newBudget)
  }
  const fetchCpm = async () => {
    const token = localStorage.getItem ('token')

    const response = await axios.get (
      `${backendURL}/order/cpm/?advertiser`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCpm (response.data.data)
  }
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setValue,
    watch,
    control
  } = useForm ({
    defaultValues: {
      order: expandedRows,
      channel: "",
      format: "",
      startdate: "",
      enddate: "",
      ordered_number_of_views: '',
      budget: budgett,
      age_range: '',
      content_language: '',
      country: '',
      notes_text: '',
      notes_url: '',
    },
    mode: "onBlur",
  });
  const selectedFormat = watch ('format')
  const expectedView = watch ('ordered_number_of_views')


  React.useEffect (() => {
    calculateBudget ()
  }, [selectedFormat, expectedView])
  React.useEffect (() => {
    setValue ('budgett', budgett)
  }, [budgett, setValue])
  React.useEffect (() => {
    fetchCpm ()
  }, [])
  React.useEffect (() => {
    dispatch (fetchPublisher ())
  }, [dispatch])
  React.useEffect (() => {
    fetchChannel ();
  }, [publisherID]);


  return (

    <>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <select
          id="countries"
          className={style.select__select}
          onChange={selectedPublisher}
        >
          <option value="">Выбрать Паблишера</option>
          {
            publisher?.map ((option, index) => (
              <>
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              </>
            ))}
        </select>

      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <select
          id="countries"
          className={style.select__select}
          {...register ('channel', {
            required: 'Поле обязательно для заполнения',
          })}
          style={{border: errors?.channel ? "1px solid red" : ""}}
        >
          <option value="">Выбрать канал</option>
          {
            Array.isArray (channelModal)
              ? channelModal.map ((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))
              : (
                <option value={channelModal.id}>
                  {channelModal.name}
                </option>
              )
          }
        </select>
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <select
          id="countries"
          className={style.select__select}
          {...register ('format', {
            required: 'Поле обязательно',
          })}
          style={{border: errors?.format ? "1px solid red" : ""}}
        >
          <option value="">Выбрать Формат</option>

          {format.map ((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </td>
      <td style={{display: "flex", padding: "2px", paddingTop: "0"}}>
        <div style={{display: "grid"}}>
          <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
            Начало
          </label>
          <input
            className={style.input}
            type="date"
            {...register ('startDate', {
              required: 'Поле обязательно к заполнению',
            })}
            style={{border: errors?.startDate ? "1px solid red" : ""}}
          />
        </div>

        <div style={{display: "grid"}}>
          <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
            Конец
          </label>
          <input
            className={style.input}
            type="date"
            style={{border: errors?.enddate ? "1px solid red" : ""}}
            {...register ('enddate', {
              required: 'Поле обязательно к заполнению',
            })}

          />
        </div>
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div style={{display: 'grid'}}>
            <Controller
              name="ordered_number_of_views"
              control={control}
              rules={{
                required: 'Поле обязательно к заполнению',
              }}
              defaultValue=""
              render={({field: {onChange, onBlur, value, name, ref}}) => (
                <input
                  className={style.input}
                  type="text"
                  value={value.toLocaleString ('en-US')}
                  style={{border: errors?.ordered_number_of_views ? "1px solid red" : ""}}

                  onChange={(e) => {
                    const rawValue = e.target.value.replace (/\D/g, '')
                    const newValue = rawValue ? parseInt (rawValue, 10) : ''
                    onChange (newValue)
                  }}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                  placeholder="Количество показов"
                  autoComplete="off"
                  step="1000"
                  disabled={!selectedFormat}
                />
              )}
            />
            <span className={style.modalWindow__input_error}>
            {errors?.expectedView && (
              <p style={{width: '240px', lineHeight: '1.4'}}>
                {errors?.expectedView?.message}
              </p>
            )}
          </span>
          </div>
        </div>
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <input
          className={style.input}
          type="text"
          value={budgett.toLocaleString ('en-US')}
          placeholder="Бюджет"
          autoComplete="off"
          disabled={true}
        />

      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <input
          className={style.input}
          type="text"
          placeholder="age_range"
          style={{border: errors?.age_range ? "1px solid red" : ""}}
          {...register ('age_range', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <input
          className={style.input}
          style={{border: errors?.content_language ? "1px solid red" : ""}}
          type="text"
          placeholder="content_language"
          {...register ('content_language', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <div style={{display: 'flex'}}>
          <input
            className={style.input}
            type="text"
            style={{border: errors?.notes_text ? "1px solid red" : ""}}

            placeholder="notes_text"
            {...register ('notes_text', {
              required: 'Поле обязательно к заполнению',
            })}
          />
          <input
            className={style.input}
            type="text"
            placeholder="notes_url"
            style={{border: errors?.notes_url ? "1px solid red" : ""}}

            {...register ('notes_url', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </div>
      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <input
          className={style.input}
          type="text"
          style={{border: errors?.country ? "1px solid red" : ""}}
          placeholder="country"
          {...register ('country', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>

      <td>
        <div style={{display: "flex", justifyContent: "end"}}>
          <button disabled={!isValid} onClick={handleSubmit (onSubmit)}
                  className={`${isValid ? style.ok_btn : style.ok_btndis}`}>
            Создать
          </button>
        </div>
      </td>
    </>

  );
}
export default AddSendPublisherModal
