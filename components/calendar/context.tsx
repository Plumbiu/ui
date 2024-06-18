import { Dayjs } from 'dayjs'
import { createContext } from 'react'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

const CalendarContext = createContext<{
  activeTime: Dayjs
  setActiveTime: SetState<Dayjs>
} | null>(null)

export default CalendarContext
