import { useEffect, cloneElement, useState, useRef } from 'react'
import { Portal, StyledMask } from '@/_utils/components'

export interface IGallery {
  node: JSX.Element
}

const Gallery = (props: IGallery) => {
  const { node } = props
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLImageElement | null>(null)
  const img = cloneElement(node, {
    className: '123',
    ref,
  })
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', () => {
        setVisible(true)
      })
    }
  }, [])

  return (
    <>
      {img}
      <Portal>
        {visible && (
          <StyledMask
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
            onClick={() => setVisible(false)}
          >
            {img}
          </StyledMask>
        )}
      </Portal>
    </>
  )
}

export default Gallery
