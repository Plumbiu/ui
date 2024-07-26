import { Dayjs } from 'dayjs'
import { createContext } from 'react'
import { CalendarProps } from './types'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

const CalendarContext = createContext<{
  activeTime: Dayjs
  setActiveTime: SetState<Dayjs>
  onChange: CalendarProps['onChange']
} | null>(null)

export default CalendarContext
