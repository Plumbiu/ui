import { useContext } from 'react'
import { clsx } from 'clsx'
import CalendarContext from './context'
import { activeCeilCls, ceilCls, ceilHoverCls, tdH50, w60m } from './styles'
import { CalendarMode } from './types'

interface MonthProps {
  num: number
}

const Month: React.FC<MonthProps> = ({ num }) => {
  const { setActiveTime, activeTime, setMode } =
    useContext(CalendarContext)!
  const isActive = activeTime.month() === num

  console.log('month')

  return (
    <td
      className={tdH50}
      onClick={() => {
        const newDay = activeTime.set('month', num)
        setMode(CalendarMode.Day)
        setActiveTime(newDay)
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
}

export default Month
