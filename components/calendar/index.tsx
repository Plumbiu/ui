import { memo, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Day from './day'
import { ceilCls, tableCls } from './styles'
import { CalendarProps } from './types'
import { getDaysOfMonth } from './utils'
import CalendarContext from './context'

const CalendarHeader = memo(() => {
  const headNum = ['一', '二', '三', '四', '五', '六', '七']
  return (
    <thead>
      <tr>
        {headNum.map((num) => (
          <th key={num}>
            <div className={ceilCls}>{num}</div>
          </th>
        ))}
      </tr>
    </thead>
  )
})

const Calendar: React.FC<CalendarProps> = () => {
  const now = dayjs()
  const [activeTime, setActiveTime] = useState<Dayjs>(now)
  const arr = useMemo(() => getDaysOfMonth(activeTime), [activeTime])
  return (
    <CalendarContext.Provider
      value={{
        activeTime,
        setActiveTime,
      }}
    >
      <div className={tableCls}>
        <div>
          {activeTime.year()} - {activeTime.month()}
        </div>
        <table>
          <CalendarHeader />
          <tbody>
            {arr.map((item, idx) => (
              <tr key={idx}>
                {item.map(({ day, step }, subIdx) => (
                  <Day key={subIdx} index={subIdx} step={step} num={day} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CalendarContext.Provider>
  )
}

export default Calendar

export type { CalendarProps } from './types'
