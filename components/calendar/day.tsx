import { css } from '@pigment-css/react'
import { clsx } from 'clsx'
import { memo } from 'react'
import { activeCeilCls, ceilCls, ceilHoverCls } from './styles'
import { MonthStep } from './constant'

interface DayProps {
  num: number
  step: MonthStep
  isActive: boolean
  clickHandler: () => void
}

const fadeColor = css(({ theme }) => ({
  color: theme.vars['text-4'],
}))

const Day: React.FC<DayProps> = memo(
  ({ num, step, isActive, clickHandler }) => {
    console.log(1)

    return (
      <td onClick={clickHandler}>
        <div
          className={clsx(ceilCls, {
            [fadeColor]: step !== MonthStep.curr,
            [activeCeilCls]: isActive,
            [ceilHoverCls]: !isActive,
          })}
        >
          {num}
        </div>
      </td>
    )
  },
)

export default Day
