import { useEffect, cloneElement, useState, useRef } from 'react'
import Modal from '@/modal'

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
      <Modal
        style={{
          minWidth: 'unset',
          padding: 0,
          boxShadow: 'none',
          backgroundColor: 'transparent',
        }}
        header={null}
        footer={null}
        centered
        wrapper={false}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div draggable onClick={() => setVisible(false)}>
          {img}
        </div>
      </Modal>
    </>
  )
}

export default Gallery
