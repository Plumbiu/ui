import { styled } from '@pigment-css/react'
import { useState } from 'react'
import Button from '../button'
import { Portal } from '@/_common'

interface Offset {
  x: number
  y: number
}

export interface DropdownProps {
  children: React.ReactNode
}

const StyledDropdown = styled('div')<DropdownProps>(({ theme }) => {
  return {
    position: 'absolute',
    zIndex: 999,
    boxShadow: theme['boxShadow'],
    transform: 'translateX(-50%)',
  }
})

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [offset, setOffset] = useState<Offset>()

  return (
    <Button
      outlined
      color="info"
      onClick={(e) => {
        setOffset({
          x: e.pageX,
          y: e.pageY,
        })
      }}
    >
      {props.children}
      {offset && (
        <Portal>
          <StyledDropdown
            style={{
              inset: `${offset.y}px auto auto ${offset.x}px`,
              margin: 'auto',
            }}
          >
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </StyledDropdown>
        </Portal>
      )}
    </Button>
  )
}

export default Dropdown
