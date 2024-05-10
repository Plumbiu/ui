import type { ThemeArgs } from '@pigment-css/react/build/theme'

export type TSize = 'sm' | 'md' | 'lg'

export type THexColor = `#${string}`

export type TBaseColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type TColor = TBaseColor | THexColor

export type CommonThemeFn = (theme: ThemeArgs['theme']) => React.CSSProperties
