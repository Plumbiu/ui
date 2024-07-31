import { useContext } from 'react'
import { clsx } from 'clsx'
import CalendarContext from './context'
import { activeCeilCls, ceilCls, ceilHoverCls, tdH50, w60m } from './styles'
import { CalendarMode } from './types'

interface MonthProps {
  num: number
}

const Month: React.FC<MonthProps> = ({ num }) => {
  const { activeMonth, setActiveMonth, setMode } = useContext(CalendarContext)!
  const isActive = activeMonth === num
  return (
    <td
      className={tdH50}
      onClick={() => {
        setMode(CalendarMode.Day)
        setActiveMonth(num)
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
