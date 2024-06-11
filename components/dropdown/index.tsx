import { useRef } from 'react'
import Button from '../button'
import { DropdownProps } from './types'
import { useDropdown } from '@/_utils/dropdown'

const Dropdown: React.FC<DropdownProps> = (props) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const { node } = useDropdown({
    triggerRef: btnRef,
    children: (
      <>
        <div>
          <span>12221</span>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </>
    ),
    widthArrow: true,
  })

  return (
    <Button ref={btnRef}>
      {props.children}
      {node}
    </Button>
  )
}

export default Dropdown

export type { DropdownProps } from './types'
