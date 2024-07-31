import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { memo, useContext, useMemo, useRef } from 'react'
import { activeCeilCls, ceilCls, ceilHoverCls } from './styles'
import { MonthStep } from './constant'
import CalendarContext from './context'
import { DayArr } from './utils'

interface DayProps {
  num: number
  step: MonthStep
  isToday: boolean
  clickHandler: (e: React.MouseEvent) => void
}

interface DaysProps {
  data: DayArr[][]
}

const fadeColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
}))

const todayCls = css(({ theme }) => ({
  borderColor: theme['primary'],
}))

const Days: React.FC<DaysProps> = memo(({ data }) => {
  const { setActiveMonth, setActiveDate, activeMonth, activeYear, now } =
    useContext(CalendarContext)!
  const ref = useRef<any>(null)

  const node = useMemo(() => {
    return data.map((item, idx) => (
      <tr key={idx}>
        {item.map(({ day, step }, subIdx) => (
          <Day
            isToday={
              day === now.date() &&
              activeMonth === now.month() &&
              activeYear === now.year()
            }
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
  }, [data])

  return node
})

const Day: React.FC<DayProps> = memo(({ num, step, clickHandler, isToday }) => {
  return (
    <td>
      <div
        onClick={(e) => {
          clickHandler(e)
        }}
        className={clsx(ceilCls, ceilHoverCls, {
          [fadeColor]: step !== MonthStep.curr,
          [todayCls]: isToday,
        })}
      >
        {num}
      </div>
    </td>
  )
})

export default Days
