// copyed https://github.com/react-component/checkbox/blob/master/LICENSE.md
export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent<HTMLInputElement>['nativeEvent']
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean
}

export interface CheckboxRef {
  focus: (options?: FocusOptions) => void
  blur: () => void
  input: HTMLInputElement | null
  nativeElement: HTMLElement | null
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  indeterminate?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
}
