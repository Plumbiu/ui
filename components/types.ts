import type { ThemeArgs } from '@pigment-css/react/build/theme'

export type TSize = 'sm' | 'md' | 'lg'

export type TSimpleHexColor = `#${string}`

export type TBaseColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type TColor = TBaseColor | TSimpleHexColor

export type CommonThemeFn = (theme: ThemeArgs['theme']) => React.CSSProperties
