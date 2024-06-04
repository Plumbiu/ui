import type { ExtendTheme } from '@pigment-css/react/theme'
import { colorSchemes, tokens } from './theme'

declare module '@pigment-css/react/theme' {
  type IColor = typeof colorSchemes.dark

  interface ThemeTokens {
    // the structure of your theme
    colors: IColor
    bg: IColor
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark'
      tokens: typeof tokens
    }>
  }
}
