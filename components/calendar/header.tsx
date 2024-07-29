import { memo, useContext } from 'react'
import CalendarContext from './context'
import { ceilCls, actionHeadCls, actionModeCls } from './styles'
import { CalendarMode } from './types'
import {
  IconWrap,
  IcRoundKeyboardDoubleArrowLeft,
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsChevronRightRounded,
  IcRoundKeyboardDoubleArrowRight,
} from '@/icon'

export const CalendarHeader = memo(() => {
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

const CenterNode = memo(() => {
  const { activeYear, setMode, mode, activeMonth } =
    useContext(CalendarContext)!

  if (mode === CalendarMode.Year) {
    return (
      <>
        <span
          className={actionModeCls}
          onClick={() => setMode(CalendarMode.Year)}
        >
          {activeYear - 5}年
        </span>
        <span>-</span>
        <span
          className={actionModeCls}
          onClick={() => setMode(CalendarMode.Month)}
        >
          {activeYear + 6}年
        </span>
      </>
    )
  }
  return (
    <>
      <span
        className={actionModeCls}
        onClick={() => setMode(CalendarMode.Year)}
      >
        {activeYear}年{' '}
      </span>
      {mode !== CalendarMode.Month && (
        <span
          className={actionModeCls}
          onClick={() => setMode(CalendarMode.Month)}
        >
          {activeMonth + 1}月
        </span>
      )}
    </>
  )
})

export const ActionHeader = memo(() => {
  const { setActiveYear, setActiveMonth, mode } = useContext(CalendarContext)!
  const isDay = mode === CalendarMode.Day

  return (
    <div className={actionHeadCls}>
      <IconWrap color="info">
        <IcRoundKeyboardDoubleArrowLeft
          onClick={() => setActiveYear((prev) => prev - 1)}
          fontSize={20}
        />
      </IconWrap>
      {isDay && (
        <IconWrap color="info">
          <MaterialSymbolsChevronLeftRounded
            onClick={() => setActiveMonth(-1, true)}
            fontSize={20}
          />
        </IconWrap>
      )}
      <div>
        <CenterNode />
      </div>
      {isDay && (
        <IconWrap color="info">
          <MaterialSymbolsChevronRightRounded
            onClick={() => setActiveMonth(1, true)}
            fontSize={20}
          />
        </IconWrap>
      )}
      <IconWrap color="info">
        <IcRoundKeyboardDoubleArrowRight
          onClick={() => setActiveYear((prev) => prev + 1)}
          fontSize={20}
        />
      </IconWrap>
    </div>
  )
})
