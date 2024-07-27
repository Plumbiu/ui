import { useContext } from 'react'
import { clsx } from 'clsx'
import CalendarContext from './context'
import { TIME_FORMAT } from './constant'
import { activeCeilCls, ceilCls, ceilHoverCls, tdH50, w60m } from './styles'
import { CalendarMode } from './types'

interface YearProps {
  num: number
}

const Year: React.FC<YearProps> = ({ num }) => {
  const { setActiveTime, onChange, activeTime, setMode } =
    useContext(CalendarContext)!
  const isActive = activeTime.month() === num

  return (
    <td
      className={tdH50}
      onClick={() => {
        const newDay = activeTime.set('year', num)
        setMode(CalendarMode.Month)
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
        {num}年
      </div>
    </td>
  )
}

export default Year
