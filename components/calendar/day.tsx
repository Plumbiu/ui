import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { useContext } from 'react'
import dayjs from 'dayjs'
import { ceilCls, ceilHoverCls } from './styles'
import CalendarContext from './context'
import { MonthStep } from './constant'

interface DayProps {
  num: number
  step: MonthStep
  index: number
}

const activedayCls = css(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme['primary'],
}))

const fadeColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
}))

const Day: React.FC<DayProps> = ({ num, step }) => {
  const { activeTime, setActiveTime } = useContext(CalendarContext)!
  const isActive = dayjs(activeTime).date() === num && step === MonthStep.curr
  return (
    <td
      onClick={() => {
        const newDay = dayjs(activeTime.set('date', num))
        if (step === MonthStep.curr) {
          setActiveTime(newDay)
        } else {
          setActiveTime(newDay.set('month', activeTime.month() + step))
        }
      }}
    >
      <div
        className={clsx(ceilCls, {
          [fadeColor]: step !== MonthStep.curr,
          [activedayCls]: isActive,
          [ceilHoverCls]: !isActive,
        })}
      >
        {num}
      </div>
    </td>
  )
}

export default Day
