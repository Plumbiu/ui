import type { ExtendTheme } from '@pigment-css/react/theme'
import { colorSchemes, tokens } from './theme'

declare module '@pigment-css/react/theme' {
  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: string
      tokens: typeof tokens
    }>
  }
}
