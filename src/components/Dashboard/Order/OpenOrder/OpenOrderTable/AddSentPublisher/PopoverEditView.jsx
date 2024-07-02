import {Controller, useForm} from "react-hook-form";
import style from "./AddSendPublisherModal/AddSendPublisherModal.module.scss";
import React from "react";
import {ReactComponent as Close} from 'src/assets/Modal/Close.svg'
import axios from "axios";
import backendURL from "../../../../../../utils/url";
import {toast} from "react-toastify";
import {toastConfig} from "../../../../../../utils/toastConfig";
import {fetchOnceListSentToPublisher} from "../../../../../../redux/order/SentToPublisher";
import {useDispatch} from "react-redux";

const PopoverEditView = ({openOrder, setOpenPopoverIndex, item, expandedRows, onceOrder}) => {
  const [cpm, setCpm] = React.useState ([])
  const dispatch = useDispatch ();
  const [budgett, setBudgett] = React.useState (0)

  const fetchCpm = async () => {
    const token = localStorage.getItem ('token')

    const response = await axios.get (
      `${backendURL}/order/cpm/?advertiser=${onceOrder.advertiser.id}`,

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
  console.log (item)
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
      channel: item.channel?.id,
      format: item.format,
      startdate: item.start_date ? item.start_date.substring (0, 10) : "",
      enddate: item.end_date ? item.end_date.substring (0, 10) : "",
      ordered_number_of_views: '',
      budget: budgett,
      age_range: item.age_range,
      content_language: item.content_language,
      country: item.country,
      notes_text: item.notes_text,
      notes_url: item.notes_url,

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
        setOpenPopoverIndex (null);
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
  const calculateBudget = () => {
    let newBudget = 0
    if (onceOrder.target_country) {
      const uzFormat = `${selectedFormat}_uz`
      if (cpm[uzFormat]) {
        newBudget = (expectedView / 1000) * cpm[uzFormat]
      }
    } else if (cpm[selectedFormat]) {
      newBudget = (expectedView / 1000) * cpm[selectedFormat]
    }
    setBudgett (newBudget)
  }
  React.useEffect (() => {
    calculateBudget ()
  }, [selectedFormat, expectedView])

  React.useEffect (() => {
    setValue ('budgett', budgett)
  }, [budgett, setValue, onceOrder])
  React.useEffect (() => {
    fetchCpm ()
  }, [onceOrder])
  return (
    <div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px"}}>
        <div style={{fontWeight: "500"}}>Редактировать показы</div>
        <Close
          className="modalWindow__title__button"
          onClick={(e) => {
            e.stopPropagation ();
            setOpenPopoverIndex (null);
          }}
        />
      </div>
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

      <input
        className={style.input}
        type="text"
        value={budgett.toLocaleString ('en-US')}
        placeholder="Бюджет"
        autoComplete="off"
        disabled={true}
        style={{marginBottom: "10px"}}
      />

      <button disabled={!isValid} onClick={handleSubmit (onSubmit)}
              className={`${isValid ? style.ok_btn : style.ok_btndis}`}>
        Обновить
      </button>
    </div>
  )
}

export default PopoverEditView