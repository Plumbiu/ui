import { Dayjs } from 'dayjs'
import { createContext } from 'react'
import { CalendarMode, CalendarProps } from './types'
import { SetState } from '@/types'

const CalendarContext = createContext<{
  activeTime: Dayjs
  setActiveTime: SetState<Dayjs>
  onChange: CalendarProps['onChange']
  mode: CalendarMode
  setMode: SetState<CalendarMode>
} | null>(null)

export default CalendarContext
