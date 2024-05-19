/**
 * @order 3
 * @description 控制遮罩层的宽度
 * @title 宽度
 */

import { useState } from 'react'
import { Button, Modal } from '@plumbiu/ui'

export default function Demo() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示 Modal</Button>
      <Modal
        width={1100}
        visible={visible}
        onClose={() => setVisible(false)}
        title="标题标题标题"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
