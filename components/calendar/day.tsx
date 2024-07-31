import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { memo, useContext, useRef } from 'react'
import { activeCeilCls, ceilCls, ceilHoverCls } from './styles'
import { MonthStep } from './constant'
import CalendarContext from './context'
import { DayArr } from './utils'

interface DayProps {
  num: number
  step: MonthStep
  clickHandler: (e: React.MouseEvent) => void
}

interface DaysProps {
  data: DayArr[][]
}

const fadeColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
}))

const todayCls = css(({ theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme['primary'],
}))

const Days: React.FC<DaysProps> = memo(({ data }) => {
  const { setActiveMonth, setActiveDate } = useContext(CalendarContext)!
  const ref = useRef<any>(null)

  return data.map((item, idx) => (
    <tr key={idx}>
      {item.map(({ day, step }, subIdx) => (
        <Day
          clickHandler={(e) => {
            if (step !== MonthStep.curr) {
              setActiveMonth(step, true)
            }
            setActiveDate(day)
            // handle active
            const refCurrent = ref.current
            if (refCurrent) {
              refCurrent.classList.remove(activeCeilCls)
            }

            if (step !== MonthStep.curr) {
              ref.current = null
              return
            }
            const target = e.target as any
            target.classList.add(activeCeilCls)
            target.classList.remove(ceilHoverCls)
            ref.current = target
          }}
          key={subIdx}
          step={step}
          num={day}
        />
      ))}
    </tr>
  ))
})

const Day: React.FC<DayProps> = memo(({ num, step, clickHandler }) => {
  return (
    <td>
      <div
        onClick={(e) => {
          clickHandler(e)
        }}
        className={clsx(ceilCls, ceilHoverCls, todayCls, {
          [fadeColor]: step !== MonthStep.curr,
        })}
      >
        {num}
      </div>
    </td>
  )
})

export default Days
