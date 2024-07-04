import { format, parseISO, isValid } from 'date-fns'

export function formatDate(input) {
  if (!input || typeof input !== 'string') {
    return '' // Возвращаем пустую строку, если входной параметр отсутствует или не является строкой
  }

  try {
    const date = parseISO(input)
    if (!isValid(date)) {
      throw new Error('Некорректная дата')
    }
    return format(date, 'dd-MM-yyyy')
  } catch (error) {
    console.error('Ошибка при парсинге или форматировании даты:', error)
    return '' // Обрабатываем ошибку и возвращаем пустую строку или другое значение по умолчанию
  }
}
