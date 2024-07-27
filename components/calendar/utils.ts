import dayjs, { Dayjs } from 'dayjs'
import { MonthStep } from './constant'

interface DayArr {
  day: number
  step: MonthStep
}

export const getDaysOfMonth = (dayInstance: Dayjs) => {
  const year = dayInstance.year()
  const month = dayInstance.month()
  const dayjsDate = dayjs(`${year}-${month + 1}-1`)
  const lastDayjsMonthNum = dayjs(`${year}-${month}-1`).daysInMonth()
  const dayNum = dayjsDate.daysInMonth()
  const day = dayjsDate.date()
  const arr: DayArr[][] = [[]]
  let idx = 0
  let current = arr[idx]
  for (let i = 0; i < 6 - day; i++) {
    current.unshift({ day: lastDayjsMonthNum - i, step: MonthStep.prev })
  }

  function updateCurrent(day: number, step: MonthStep) {
    if (current.length === 7) {
      const currentIdx = ++idx
      arr[currentIdx] = []
      current = arr[currentIdx]
    }
    current.push({ day, step })
  }
  for (let i = 1; i <= dayNum; i++) {
    updateCurrent(i, MonthStep.curr)
  }

  let i = 0
  do {
    updateCurrent(++i, MonthStep.next)
    console.log(arr.length)
  } while (current.length % 7 !== 0 || arr.length <= 5)

  return arr
}

export function getYears(year: number) {
  year = year - 5
  const result: number[][] = []
  for (let i = 0; i < 4; i++) {
    result.push([])
    for (let j = 0; j < 3; j++) {
      result[i].push(year++)
    }
  }

  return result
}