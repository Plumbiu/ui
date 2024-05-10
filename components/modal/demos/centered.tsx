/**
 * @order 4
 * @description 控制弹窗在页面中央显示
 * @title 居中显示
 */

import { Button, Modal } from '@plumbiu/ui'
import { useState } from 'react'

export default function Demo() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示 Modal</Button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="标题标题标题"
        centered
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
