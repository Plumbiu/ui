import { useContext } from 'react'
import { clsx } from 'clsx'
import CalendarContext from './context'
import { activeCeilCls, ceilCls, ceilHoverCls, tdH50, w60m } from './styles'
import { CalendarMode } from './types'

interface YearProps {
  num: number
}

const Year: React.FC<YearProps> = ({ num }) => {
  const { setActiveYear, activeYear, setMode } = useContext(CalendarContext)!
  const isActive = activeYear === num

  return (
    <td
      className={tdH50}
      onClick={() => {
        setMode(CalendarMode.Month)
        setActiveYear(num)
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
