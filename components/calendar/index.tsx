import { memo, useContext, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Day from './day'
import { ceilCls, tableCls, actionHeadCls } from './styles'
import { CalendarProps } from './types'
import { getDaysOfMonth } from './utils'
import CalendarContext from './context'
import {
  IcRoundKeyboardDoubleArrowLeft,
  IcRoundKeyboardDoubleArrowRight,
  IconWrap,
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsChevronRightRounded,
} from '@/icon'

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

const ActionHeader = memo(() => {
  const { activeTime, setActiveTime } = useContext(CalendarContext)!
  return (
    <div className={actionHeadCls}>
      <IconWrap color="info">
        <IcRoundKeyboardDoubleArrowLeft
          onClick={() => setActiveTime(activeTime.add(-1, 'year'))}
          fontSize={20}
        />
      </IconWrap>
      <IconWrap color="info">
        <MaterialSymbolsChevronLeftRounded
          onClick={() => setActiveTime(activeTime.add(-1, 'month'))}
          fontSize={20}
        />
      </IconWrap>
      <div>
        {activeTime.year()}年 {activeTime.month() + 1}月
      </div>
      <IconWrap color="info">
        <MaterialSymbolsChevronRightRounded
          onClick={() => setActiveTime(activeTime.add(1, 'month'))}
          fontSize={20}
        />
      </IconWrap>
      <IconWrap color="info">
        <IcRoundKeyboardDoubleArrowRight
          onClick={() => setActiveTime(activeTime.add(1, 'year'))}
          fontSize={20}
        />
      </IconWrap>
    </div>
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
        <ActionHeader />
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
