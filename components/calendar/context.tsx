import { createContext } from 'react'
import { CalendarMode, CalendarProps } from './types'
import { SetState } from '@/types'

const CalendarContext = createContext<{
  onChange: CalendarProps['onChange']
  activeDate: number
  setActiveDate: SetState<number>
  activeMonth: number
  setActiveMonth: (num: number, isStep?: boolean) => void
  activeYear: number
  setActiveYear: SetState<number>
  mode: CalendarMode
  setMode: SetState<CalendarMode>
} | null>(null)

export default CalendarContext
