import { css, keyframes, styled } from '@pigment-css/react'
import { useMemo, useRef, useState } from 'react'
import { useEventListener } from 'ahooks'
import Button from '../button'
import { Portal } from '@/_common'
import { useAnimation, useMounted } from '@/_hooks'

interface Offset {
  x: number
  y: number
}

export interface DropdownProps {
  children: React.ReactNode
}

const endPoint = {
  transform: 'rotateX(0)',
}

const startPoint = {
  transform: 'rotateX(90deg)',
}

const dropCls = keyframes({
  '0%': startPoint,
  '100%': endPoint,
})

const reverseDropCls = keyframes({
  '100%': startPoint,
  0: endPoint,
})

const animationDuration = 100

const StyledDropdown = styled('div')<DropdownProps>(({ theme }) => {
  const size = 12
  return {
    position: 'absolute',
    zIndex: 999,
    boxShadow: theme['boxShadow'],
    backgroundColor: theme.vars['background-1'],
    transformOrigin: 'center 0',
    borderRadius: 8,
    padding: 4,
    animation: `${animationDuration}ms ${dropCls} forwards`,
    margin: 'auto',
    fontSize: 14,
    minWidth: 120,
    '& > div': {
      padding: '8px 12px',
      cursor: 'pointer',
      borderRadius: 4,
      transition: 'background-color 0.15s',
      '&:hover': {
        backgroundColor: theme.vars['info-6'],
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      width: size,
      height: size,
      zIndex: -1,
      top: -size / 2,
      left: '50%',
      transform: `translateX(-${size / 2}px) rotate(45deg)`,
      backgroundColor: theme.vars['background-1'],
      boxShadow: theme['boxShadowTop'],
    },
  }
})

const reverseAnimationCls = css({
  animation: `0.1s ${reverseDropCls} forwards`,
})

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
