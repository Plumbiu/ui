/* eslint-disable @stylistic/indent */
import { memo, useContext, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Day from './day'
import { tableCls } from './styles'
import { CalendarMode, CalendarProps } from './types'
import { getDaysOfMonth, getYears } from './utils'
import CalendarContext from './context'
import { ActionHeader, CalendarHeader } from './header'
import { monthArr } from './constant'
import Month from './month'
import Year from './year'

const Days = memo(() => {
  const { activeTime } = useContext(CalendarContext)!
  const data = useMemo(() => {
    return getDaysOfMonth(activeTime.year(), activeTime.month())
  }, [activeTime.year(), activeTime.month()])
  return data.map((item, idx) => (
    <tr key={idx}>
      {item.map(({ day, step }, subIdx) => (
        <Day key={subIdx} step={step} num={day} />
      ))}
    </tr>
  ))
})

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
  const [activeTime, setActiveTime] = useState<Dayjs>(now)
  const [mode, setMode] = useState(CalendarMode.Day)

  return (
    <CalendarContext.Provider
      value={{
        activeTime,
        setActiveTime,
        onChange,
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
              <Days />
            ) : mode === CalendarMode.Month ? (
              <Months />
            ) : (
              <Years year={activeTime.get('y')} />
            )}
          </tbody>
        </table>
      </div>
    </CalendarContext.Provider>
  )
}

export default Calendar

export type { CalendarProps } from './types'
