import { Dayjs } from 'dayjs'

export interface CalendarProps {
  type?: 'month' | 'week' | 'day'
  onChange?: (date: Dayjs, dateString: string) => void
}
