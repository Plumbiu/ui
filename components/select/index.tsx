import { useDropdown } from '@/_utils/hooks'
import { SelectProps } from './types'
import { useRef } from 'react'
import { inputActiveCls, inputWrapperCls } from '@/_utils/styles/input'
import { clsx } from 'clsx'
import { selectTriggerCls, selectCls } from './styles'

const Select: React.FC<SelectProps> = ({ options }) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const { node, offset } = useDropdown({
    triggerRef,
    children: options?.map((item) => <div key={item.value}>{item.label}</div>),
    offsetTop: 12,
  })
  return (
    <div>
      <div
        className={clsx(inputWrapperCls, selectTriggerCls, {
          [inputActiveCls]: offset,
        })}
      >
        <div ref={triggerRef} contentEditable className={selectCls}></div>
      </div>
      {node}
    </div>
  )
}

export default Select
