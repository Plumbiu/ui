export type TSize = 'sm' | 'md' | 'lg'

export type TBaseColor = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type TColor = TBaseColor | string

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
