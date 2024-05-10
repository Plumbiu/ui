import { THexColor } from '../types'

interface ThemeProps {
  color: THexColor
  dark?: boolean
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProps> = (props) => {
  const { children } = props

  return <div>{children}</div>
}

export default ThemeProvider
