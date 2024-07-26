import { memo, useContext } from 'react'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import CalendarContext from './context'
import { TIME_FORMAT } from './constant'
import { activeCeilCls, ceilCls, ceilHoverCls, tdH50, w60m } from './styles'
import { CalendarMode } from './types'

interface MonthProps {
  num: number
}

const Month: React.FC<MonthProps> = memo(({ num }) => {
  const { setActiveTime, onChange, activeTime, setMode } =
    useContext(CalendarContext)!
  const isActive = dayjs(activeTime).month() === num

  return (
    <td
      className={tdH50}
      onClick={() => {
        const newDay = dayjs(activeTime.set('month', num))
        setMode(CalendarMode.Day)
        setActiveTime(newDay)
        onChange && onChange(newDay, newDay.format(TIME_FORMAT))
      }}
    >
      <div
        className={clsx(ceilCls, w60m, {
          [activeCeilCls]: isActive,
          [ceilHoverCls]: !isActive,
        })}
      >
        {num + 1}月
      </div>
    </td>
  )
})

export default Month
