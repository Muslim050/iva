import React from 'react'
import SelectUI from 'src/components/UI/SelectUI/SelectUI'
import style from './ModalInventory.module.scss'
import { ButtonModal } from 'src/components/UI/ButtonUI/ButtonUI'

function InventoryForm({
  channelModal,
  register,
  errors,
  videoModal,
  format,
  timeC,
  Controller,
  control,
  isValid,
  cId,
  watchVideo,
}) {
  const user = localStorage.getItem('role')

  return (
    <>
      {user === 'publisher' || user === 'channel' ? (
        <SelectUI
          label="Канал"
          options={channelModal}
          register={register('channelID', {
            required: 'Поле обязательно для заполнения',
          })}
          error={errors?.channelID?.message}
          inputWidth
        />
      ) : (
        ''
      )}
      {!cId ? (
        <div
          style={{
            background: '#f6f7fb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '15px',
            color: 'var(--text-color)',
          }}
        >
          Выберите канал
        </div>
      ) : videoModal && videoModal.length === 0 ? (
        <div
          style={{
            background: '#f6f7fb',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '15px',
            color: 'var(--text-color)',
          }}
        >
          Видео отсуствует, создайте новое видео!
        </div>
      ) : (
        <SelectUI
          label="Видео"
          options={Array.isArray(videoModal) ? videoModal : []}
          register={register('video', {
            required: 'Поле обязательно для заполнения',
          })}
          error={errors?.video?.message}
          inputWidth
        />
      )}

      <div className="modalWindow__wrapper_input">
        <div
          style={{
            width: '210px',
            marginRight: '10px',
            marginBottom: '24px',
          }}
        >
          <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
            Выбрать Формат
          </label>
          <select
            id="countries"
            className={style.select__select}
            style={{ padding: '12px' }}
            {...register('formatv', {
              required: 'Поле обязательно для заполнения',
            })}
          >
            <option value="">Выбрать Формат</option>

            {format &&
              format.map((option, index) => (
                <>
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                </>
              ))}
          </select>

          <span className={style.error}>
            {errors?.formatv && (
              <p style={{ lineHeight: '16px' }}>{errors?.formatv?.message}</p>
            )}
          </span>
        </div>

        <div style={{ width: '210px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
            Тайм код рекламы
          </label>
          <input
            className={style.input}
            type="time"
            step="1"
            inputmode="numeric"
            onChange={timeC}
            defaultValue="00:00:00"
          />
          <span className={style.error}>
            {errors?.timecod && <p>{errors?.timecod?.message}</p>}
          </span>
        </div>
      </div>

      <div className="modalWindow__wrapper_input">
        <div style={{ width: '210px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
            Хрон рекламы (ceк)
          </label>
          <div style={{ marginBottom: '24px' }}>
            <input
              className={style.input}
              type="number"
              {...register('videotiming', {
                required: 'Поле обязательно для заполнения',
              })}
            />

            <span className={style.error}>
              {errors?.videotiming && <p>{errors?.videotiming?.message}</p>}
            </span>
          </div>
        </div>

        <div style={{ width: '210px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>
            Прогноз показов
          </label>
          <Controller
            name="numberview"
            control={control}
            rules={{ required: 'Поле обязательно к заполнению' }}
            defaultValue=""
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <input
                className={style.input}
                type="text"
                value={value.toLocaleString('en-US')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '')
                  const newValue = rawValue ? parseInt(rawValue, 10) : ''
                  onChange(newValue)
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
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <ButtonModal
          isValid={isValid && cId && watchVideo}
          disabled={!isValid || !cId || !watchVideo}
        >
          Создать
        </ButtonModal>
      </div>
    </>
  )
}

export default InventoryForm
