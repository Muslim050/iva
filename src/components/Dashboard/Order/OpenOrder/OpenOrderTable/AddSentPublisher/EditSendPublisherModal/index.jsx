import {useDispatch, useSelector} from "react-redux";
import React from "react";
import axios from "axios";
import backendURL from "../../../../../../../utils/url";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../../../../utils/toastConfig";
import style from "./EditSendPublisherModal.module.scss";
import {fetchOnceListSentToPublisher} from "../../../../../../../redux/order/SentToPublisher";
import 'react-datepicker/dist/react-datepicker.css'
import {fetchPublisher} from "../../../../../../../redux/publisher/publisherSlice";

const format = [
  {value: 'preroll', text: 'Pre-roll'},
  {value: 'mixroll', text: 'Mix-roll'},
]

const EditSendPublisherModal = ({onCancel, expandedRows, item, setCurrentOrder}) => {
  const dispatch = useDispatch ();
  const [channelModal, setChannelModal] = React.useState ([]);
  const {publisher} = useSelector ((state) => state.publisher);

  const [publisherID, setPublisherID] = React.useState ('');
  const [channelID, setChannelID] = React.useState ('');
  const selectedPublisher = (event) => {
    setPublisherID (event.target.value);
  };
  const selectedChannelID = (event) => {
    setChannelID (event.target.value);
  };
  const fetchChannel = async () => {
    if (!publisherID) return; // Skip fetch if publisherID is not set
    const token = localStorage.getItem ("token");
    const response = await axios.get (
      `${backendURL}/publisher/channel/?publisher_id=${publisherID}`,
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
    dispatch (fetchPublisher ())
  }, [dispatch])
  const [cpm, setCpm] = React.useState ([])
  const [budgett, setBudgett] = React.useState (0)

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    setValue,
    watch,
    control,
    trigger
  } = useForm ({
    defaultValues: {
      order: expandedRows,
      channel: '',
      format: item.format,
      startdate: item.start_date ? item.start_date.substring (0, 10) : "",
      enddate: item.enddate,
      ordered_number_of_views: '',
      budgett: item.budgett,
      age_range: '',
      content_language: '',
      country: '',
      notes_text: '',
      notes_url: '',

    },
    mode: "onChange",
  });

  const selectedFormat = watch ('format')
  const expectedView = watch ('ordered_number_of_views')

  const onSubmit = async (data) => {
    const token = localStorage.getItem ('token');
    const requestData = {};


    // Проверьте, что data.selectedFile не равен null, прежде чем добавить promo_file
    if (data.order && data.order !== null) {
      requestData.order = data.order
    }
    if (data.channel && data.channel !== null) {
      requestData.channel = data.channel
    }
    if (data.format && data.format !== null) {
      requestData.format = data.format
    }
    if (data.startdate && data.startdate !== null) {
      requestData.start_date = data.startdate
    }
    if (data.enddate && data.enddate !== null) {
      requestData.end_date = data.enddate
    }
    if (data.ordered_number_of_views && data.ordered_number_of_views !== null) {
      requestData.ordered_number_of_views = data.ordered_number_of_views
    }
    if (data.budgett && data.budgett !== null) {
      requestData.budget = data.budgett
    }
    if (data.age_range && data.age_range !== null) {
      requestData.age_range = data.age_range
    }
    if (data.content_language && data.content_language !== null) {
      requestData.content_language = data.content_language
    }
    if (data.country && data.country !== null) {
      requestData.country = data.country
    }
    if (data.notes_text && data.notes_text !== null) {
      requestData.notes_text = data.notes_text
    }
    if (data.notes_url && data.notes_url !== null) {
      requestData.notes_url = data.notes_url
    }
    try {
      const response = await axios.patch (
        `${backendURL}/order/assignments/${item.id}/`,
        requestData,
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
        console.log ('Response:', response);

        toast.success ("Данные успешно обновлены!", toastConfig);
        onCancel ()
        await dispatch (fetchOnceListSentToPublisher ({expandedRows}));
      } else {
        // Handle case where payload is not as expected
        throw new Error ('Unexpected response payload');
      }
    } catch (error) {
      console.log (error);
      toast.error (error, toastConfig);
    }
  };


  React.useEffect (() => {
    fetchChannel ();
  }, [publisherID]);

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
  const calculateBudget = () => {
    let newBudget = 0
    if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }
    setBudgett (newBudget)
  }
  React.useEffect (() => {
    calculateBudget ()
  }, [selectedFormat, expectedView, cpm])
  React.useEffect (() => {
    setValue ('budgett', budgett)
  }, [budgett, setValue])
  React.useEffect (() => {
    fetchCpm ()
  }, [])
  React.useEffect (() => {
    if (item) {
      setValue ('publisher', item.publisher?.id || '');
      setPublisherID (item.publisher?.id || ''); // Set publisher ID here
      setChannelID (item.channel?.id || "")
      setValue ('channel', item.channel?.id || '');
      setValue ('format', item.format);
      setValue ('startdate', item.start_date ? item.start_date.substring (0, 10) : "");
      setValue ('enddate', item.end_date ? item.end_date.substring (0, 10) : "");
      setValue ('ordered_number_of_views', item.ordered_number_of_views);
      setValue ('budgett', item.budget);
      setValue ('age_range', item.age_range);
      setValue ('content_language', item.content_language);
      setValue ('country', item.country);
      setValue ('notes_text', item.notes_text);
      setValue ('notes_url', item.notes_url);
      trigger (); // Manually trigger validation


    }
  }, [item, setValue, trigger]);

  React.useEffect (() => {
    console.log ("isValid:", isValid);
    console.log ("errors:", errors);
  }, [isValid, errors]);

  React.useEffect (() => {

  }, [setPublisherID, setChannelID])

  return (
    <>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <select
          id="countries"
          className={style.select__select}
          value={publisherID}
          onChange={selectedPublisher}
        >
          <option value="">Выбрать Паблишера</option>
          {
            publisher?.map ((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))
          }
        </select>

      </td>
      <td style={{padding: "2px", paddingTop: "18px"}}>
        <select
          id="countries"
          value={channelID}
          onChange={selectedChannelID}

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
      <td style={{display: "flex", padding: "0px",}}>
        <div style={{display: 'grid', marginRight: '10px'}}>
          <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
            Начало
          </label>
          <Controller
            name="startdate"
            control={control}
            defaultValue={
              item.start_date
                ? item.start_date.substring (0, 10)
                : ''
            }
            render={({field: {onChange, value}}) => (
              <input
                className={style.input}
                type="date"
                onChange={onChange}
                value={value}
                style={{border: errors?.start_date ? "1px solid red" : ""}}
              />
            )}
          />
          <span className={style.modalWindow__input_error}>
                {errors?.startdate && <p>{errors?.startdate?.message}</p>}
              </span>
        </div>

        <div style={{display: "grid"}}>
          <div style={{display: 'grid'}}>
            <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
              Конец
            </label>
            <Controller
              name="enddate"
              control={control}
              defaultValue={
                item.enddate
                  ? item.enddate.substring (0, 10)
                  : ''
              }
              render={({field: {onChange, value}}) => (
                <input
                  className={style.input}
                  type="date"
                  onChange={onChange}
                  value={value}
                  style={{border: errors?.enddate ? "1px solid red" : ""}}
                />
              )}
            />
            <span className={style.modalWindow__input_error}>
                {errors?.startdate && <p>{errors?.startdate?.message}</p>}
              </span>
          </div>


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
                  style={{border: errors?.ordered_number_of_views ? "1px solid red" : ""}}
                  value={value.toLocaleString ('en-US')}
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
          type="text"
          placeholder="content_language"
          style={{border: errors?.content_language ? "1px solid red" : ""}}
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
            placeholder="notes_text"
            style={{border: errors?.notes_text ? "1px solid red" : ""}}
            {...register ('notes_text', {
              required: 'Поле обязательно к заполнению',
            })}
          />
          <input
            className={style.input}
            type="text"
            style={{border: errors?.notes_url ? "1px solid red" : ""}}
            placeholder="notes_url"
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
          placeholder="country"
          style={{border: errors?.country ? "1px solid red" : ""}}
          {...register ('country', {
            required: 'Поле обязательно к заполнению',
          })}
        />
      </td>

      <td style={{
        padding: "0px 10px",
        gap: "5px",

      }}>
        <button disabled={!isValid} onClick={handleSubmit (onSubmit)}
                className={`${isValid ? style.ok_btn : style.ok_btndis}`}>
          Обновить
        </button>
        <button onClick={() => setCurrentOrder (null)} className={style.ok_close}>
          Закрыть
        </button>
        {/*</div>*/}
      </td>
    </>


    // <>
    //
    //   <form onSubmit={handleSubmit (onSubmit)}>
    //     <div className="modalWindow__title">
    //       Добавить запись
    //       <Close
    //         className="modalWindow__title__button"
    //         onClick={handleButtonClick}
    //       />
    //     </div>
    //
    //     <div className="modalWindow">
    //
    //       <div style={{display: "flex"}}>
    //         <div>
    //           <div style={{width: '175px'}}>
    //             <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //               Канал
    //             </label>
    //             <select
    //               id="countries"
    //               style={{padding: '12px'}}
    //               {...register ('channel', {
    //                 required: 'Поле обязательно',
    //               })}
    //
    //               className={style.select__select}
    //             >
    //               <option value="">Выбрать Канал</option>
    //
    //               {channelModal.map ((option, index) => (
    //                 <option key={index} value={option.id}>
    //                   {option.name}
    //                 </option>
    //               ))}
    //             </select>
    //             <span className={style.select__error}>
    //             {errors?.format && (
    //               <p style={{lineHeight: '16px'}}>
    //                 {errors?.format?.message}
    //               </p>
    //             )}
    //           </span>
    //           </div>
    //
    //         </div>
    //
    //
    //       </div>
    //       <div style={{width: '175px'}}>
    //         <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //           Формат
    //         </label>
    //         <select
    //           id="countries"
    //           style={{padding: '12px'}}
    //           {...register ('format', {
    //             required: 'Поле обязательно',
    //           })}
    //           className={style.select__select}
    //         >
    //           <option value="">Выбрать Формат</option>
    //
    //           {format.map ((option, index) => (
    //             <option key={index} value={option.value}>
    //               {option.text}
    //             </option>
    //           ))}
    //         </select>
    //         <span className={style.select__error}>
    //             {errors?.format && (
    //               <p style={{lineHeight: '16px'}}>
    //                 {errors?.format?.message}
    //               </p>
    //             )}
    //           </span>
    //       </div>
    //       <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    //         <div>
    //           <div style={{display: 'grid', marginRight: '10px'}}>
    //             <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //               Начало размещения
    //             </label>
    //             <Controller
    //               name="startdate"
    //               control={control}
    //               render={({field: {onChange, value}}) => (
    //                 <input
    //                   className={style.input}
    //                   type="date"
    //                   onChange={onChange}
    //                   value={value}
    //                   style={{
    //                     width: '210px',
    //                   }}
    //                 />
    //               )}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <div style={{display: 'grid'}}>
    //             <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //               Конец размещения
    //             </label>
    //             <input
    //               className={style.input}
    //               type="date"
    //               // min={getEndDate(watch("startdate"))} // Use watch to get the value of the "startdate" field
    //               {...register ('enddate', {
    //                 required: 'Поле обязательно к заполнению',
    //               })}
    //
    //             />
    //             <span className={style.modalWindow__input_error}>
    //               {errors?.enddate && <p>{errors?.enddate?.message}</p>}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //
    //
    //       <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    //         <div style={{display: 'grid'}}>
    //           <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //             Количество показов
    //           </label>
    //           <Controller
    //             name="ordered_number_of_views"
    //             control={control}
    //             rules={{
    //               required: 'Поле обязательно к заполнению',
    //               // min: {
    //               //   value: 1000000,
    //               //   message: 'Минимальное значение - 1 000 000',
    //               // },
    //             }}
    //             defaultValue=""
    //             render={({field: {onChange, onBlur, value, name, ref}}) => (
    //               <input
    //                 className={style.input}
    //                 type="text"
    //                 value={value.toLocaleString ('en-US')}
    //                 style={{
    //                   width: '210px',
    //                 }}
    //                 onChange={(e) => {
    //                   const rawValue = e.target.value.replace (/\D/g, '')
    //                   const newValue = rawValue ? parseInt (rawValue, 10) : ''
    //                   onChange (newValue)
    //                 }}
    //                 onBlur={onBlur}
    //                 name={name}
    //                 ref={ref}
    //                 placeholder="Количество показов"
    //                 autoComplete="off"
    //                 step="1000"
    //                 disabled={!selectedFormat}
    //               />
    //             )}
    //           />
    //           <span className={style.modalWindow__input_error}>
    //             {errors?.expectedView && (
    //               <p style={{width: '240px', lineHeight: '1.4'}}>
    //                 {errors?.expectedView?.message}
    //               </p>
    //             )}
    //           </span>
    //         </div>
    //         <div style={{display: 'grid'}}>
    //           <label style={{fontSize: '12px', color: 'var(--text-color)'}}>
    //             Бюджет (сум)
    //           </label>
    //           <input
    //             className={style.input}
    //             type="text"
    //             style={{
    //               width: '205px',
    //             }}
    //             value={budgett.toLocaleString ('en-US')}
    //             placeholder="Бюджет"
    //             autoComplete="off"
    //             disabled={true}
    //           />
    //         </div>
    //       </div>
    //
    //       <div className="modalWindow__wrapper_input">
    //
    //         <InputUI
    //           label="age_range"
    //           type="text"
    //           placeholder="age_range"
    //           autoComplete="off"
    //           register={register}
    //           name="age_range"
    //           errors={errors.namevideo}
    //           inputWidth
    //         />
    //
    //       </div>
    //
    //
    //       <div style={{display: 'flex'}}>
    //
    //
    //         <InputUI
    //           label="content_language"
    //           type="text"
    //           placeholder="content_language"
    //           autoComplete="off"
    //           register={register}
    //           name="content_language"
    //           errors={errors.namevideo}
    //           inputWidth
    //         />
    //         <InputUI
    //           label="country"
    //           type="text"
    //           placeholder="country"
    //           autoComplete="off"
    //           register={register}
    //           name="country"
    //           errors={errors.namevideo}
    //           inputWidth
    //         />
    //       </div>
    //       <div style={{display: 'flex'}}>
    //
    //
    //         <InputUI
    //           label="notes_text"
    //           type="text"
    //           placeholder="notes_text"
    //           autoComplete="off"
    //           register={register}
    //           name="notes_text"
    //           errors={errors.namevideo}
    //           inputWidth
    //         />
    //         <InputUI
    //           label="notes_url"
    //           type="text"
    //           placeholder="notes_url"
    //           autoComplete="off"
    //           register={register}
    //           name="notes_url"
    //           errors={errors.namevideo}
    //           inputWidth
    //         />
    //       </div>
    //
    //
    //       <div style={{display: "flex", justifyContent: "end"}}>
    //         <ButtonModal isValid={true} disabled={!isValid}>
    //           Создать
    //         </ButtonModal>
    //       </div>
    //     </div>
    //   </form>
    // </>

  );
}
export default EditSendPublisherModal