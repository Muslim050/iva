import React from 'react'
import style from './InputUI.module.scss'

const InputUI = ({
  type,
  placeholder,
  autoComplete,
  register,
  name,
  errors,
  pattern,
  message,
  inputWidth,
  minLength,
  marginRight,
  marginLeft,
  endAdornment,
}) => {
  const containerStyle = {
    width: inputWidth ? '100%' : '210px',
    marginBottom: '24px',
    position: 'relative',
    marginRight: marginRight || 0,
    marginLeft: marginLeft || 0,
  }

  const [errorVisible, setErrorVisible] = React.useState(false)

  React.useEffect(() => {
    setErrorVisible(!!errors) // Отображать ошибку, если есть ошибки
  }, [errors])

  return (
    <div style={containerStyle}>
      <input
        className={`${style.input} ${errorVisible ? style.show : ''}`}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, {
          required: 'Поле обязательно',
          ...(pattern && { pattern: pattern }),
          ...(minLength && {
            minLength: {
              value: minLength.value,
              message: minLength.message,
            },
          }),
        })}
      />
      <span className={`${style.inputError} ${errorVisible ? style.show : ''}`}>
        {errors?.message && <p>{errors?.message}</p>}
        {errors?.type === 'pattern' && <p>{message}</p>}
      </span>
      {endAdornment && (
        <div className={style.endAdornmentStyle}>{endAdornment}</div>
      )}
    </div>
  )
}

export default InputUI
