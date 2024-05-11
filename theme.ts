import { extendTheme } from '@pigment-css/react/utils'
import { colorSchemes, tokens } from './theme/index'

const theme = extendTheme({
  colorSchemes,
  ...tokens,
  getSelector: function getSelector(colorScheme, css) {
    return colorScheme === 'light' ? ':root' : '.theme-dark'
  },
})

export default theme
