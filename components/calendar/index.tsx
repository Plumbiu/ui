import { memo, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import Days from './day'
import { tableCls } from './styles'
import { CalendarMode, CalendarProps } from './types'
import { getDaysOfMonth, getYears } from './utils'
import CalendarContext from './context'
import { ActionHeader, CalendarHeader } from './header'
import { monthArr, TIME_FORMAT } from './constant'
import Month from './month'
import Year from './year'

const Months = memo(
  () => {
    return monthArr.map((item, idx) => (
      <tr key={idx}>
        {item.map((num, subIdx) => (
          <Month key={subIdx} num={num} />
        ))}
      </tr>
    ))
  },
  () => true,
)

const Years = memo((props: { year: number }) => {
  const years = getYears(props.year)
  return years.map((item, idx) => (
    <tr key={idx}>
      {item.map((num, subIdx) => (
        <Year key={subIdx} num={num} />
      ))}
    </tr>
  ))
})

const Calendar: React.FC<CalendarProps> = ({ onChange }) => {
  const now = dayjs()
  const [activeDate, setActiveDate] = useState<number>(now.date())
  const [activeMonth, setActiveMonth] = useState<number>(now.month())
  const [activeYear, setActiveYear] = useState<number>(now.year())
  const [mode, setMode] = useState(CalendarMode.Day)

  const _setActiveMonth = (num: number, isStep = false) => {
    setActiveMonth((prev) => {
      if (!isStep) {
        return num
      }
      if (prev === 0 && num < 0) {
        setActiveYear((prev) => prev - 1)
        return 11
      }

      if (prev === 11 && num > 0) {
        setActiveYear((prev) => prev + 1)
        return 0
      }

      return prev + num
    })
  }

  useEffect(() => {
    const date = dayjs(`${activeYear}-${activeMonth + 1}-${activeDate}`)
    onChange && onChange(date, date.format(TIME_FORMAT))
  }, [activeDate])

  const daysData = useMemo(() => {
    console.log(123)

    if (mode !== CalendarMode.Day) {
      return []
    }

    return getDaysOfMonth(activeYear, activeMonth)
  }, [mode, activeYear, activeMonth])

  return (
    <CalendarContext.Provider
      value={{
        now,
        onChange,
        activeMonth,
        setActiveMonth: _setActiveMonth,
        activeDate,
        setActiveDate,
        activeYear,
        setActiveYear,
        mode,
        setMode,
      }}
    >
      <div className={tableCls}>
        <ActionHeader />
        <table>
          {mode === CalendarMode.Day && <CalendarHeader />}
          <tbody>
            {mode === CalendarMode.Day ? (
              <Days data={daysData} />
            ) : mode === CalendarMode.Month ? (
              <Months />
            ) : (
              <Years year={activeYear} />
            )}
          </tbody>
        </table>
      </div>
    </CalendarContext.Provider>
  )
}

export default Calendar

export type { CalendarProps } from './types'
