import React from 'react'
import {useDispatch} from 'react-redux'
import style from './TableLinkedVideo.module.scss'
import {toast} from 'react-toastify'
import {inventoryPublish} from '../../../../../redux/inventory/inventorySlice'
import {useForm} from 'react-hook-form'
import {toastConfig} from '../../../../../utils/toastConfig'
import {hideModalVideoLinked,} from 'src/redux/modalSlice'
import {ReactComponent as Close} from 'src/assets/Modal/Close.svg'
import {ButtonModal} from 'src/components/UI/ButtonUI/ButtonUI'

export default function TableLinkedVideo ({
                                            setShowModalSelectingInventory,
                                            selectedId,
                                          }) {
  const dispatch = useDispatch ()
  const [publisherModal, setPublisherModal] = React.useState ([])

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm ({
    defaultValues: {
      selectedId,
      linkvideo: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      const videoLinkResponse = await dispatch (
        inventoryPublish ({data}),
      ).unwrap ()
      toast.success ('Ссылка на видео приклеплена!', toastConfig)
      dispatch (hideModalVideoLinked ())
      setTimeout (() => {
        window.location.reload ()
      }, 1500)
    } catch (error) {
      // toast.error('Что-то пошло не так!', toastConfig)
    }
  }
  const handleButtonClick = () => {
    dispatch (hideModalVideoLinked ())
  }
  return (
    <>
      <form onSubmit={handleSubmit (onSubmit)}>
        <div className="modalWindow__title">
          Прикрепить Видео
          <Close
            className="modalWindow__title__button"
            onClick={handleButtonClick}
          />
        </div>

        <div className="modalWindow">
          <div style={{width: '400px', marginBottom: '30px'}}>
            <input
              className={style.input}
              type="text"
              placeholder="Ссылка на Видео"
              autoComplete="off"
              {...register ('linkvideo', {
                required: 'Поле обезательно к заполнению',
              })}
            />
            <span className={style.modalWindow__input_error}>
              {errors?.namevideo && <p>{errors?.namevideo?.message}</p>}
            </span>
          </div>
          <div style={{display: 'flex', justifyContent: 'end'}}>
            <ButtonModal isValid={true} disabled={!isValid}>
              Прикрепить
            </ButtonModal>
          </div>
        </div>
      </form>
    </>
  )
}
