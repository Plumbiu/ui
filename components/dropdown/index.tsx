import { useMemo, useRef, useState } from 'react'
import { useEventListener } from 'ahooks'
import Button from '../button'
import {
  reverseAnimationCls,
  animationDuration,
  StyledDropdown,
} from './styles'
import { DropdownProps, Offset } from './types'
import { Portal } from '@/_utils/components'
import { useAnimation, useMounted } from '@/_utils/hooks'

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [offset, setOffset] = useState<Offset>()
  const btnRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isMounted = useMounted()

  const rect = useMemo(
    () => btnRef.current?.getBoundingClientRect(),
    [btnRef.current, isMounted],
  )

  const handleHidden = useAnimation(
    [
      {
        ref: dropdownRef,
        cls: reverseAnimationCls,
      },
    ],
    animationDuration,
    () => {
      setOffset(undefined)
    },
  )

  useEventListener('click', (e) => {
    if (!rect) {
      return
    }
    const target = e.target
    if (target === btnRef.current) {
      if (offset) {
        return
      }
      setOffset({
        x: rect.x,
        y: rect.y + rect.height + 12,
      })
    } else {
      handleHidden()
    }
  })

  return (
    <Button ref={btnRef}>
      {props.children}
      {offset && (
        <Portal>
          <StyledDropdown
            ref={dropdownRef}
            style={{
              inset: `${offset?.y}px auto auto ${offset?.x}px`,
            }}
          >
            <div>
              <span>12221</span>
            </div>
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

export type { DropdownProps } from './types'
