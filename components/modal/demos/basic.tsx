/**
 * @order 1
 * @description 基本对话框，注意 onClose 将 visible 设置为 false
 * @title 基本
 */

import { useState } from 'react'
import { Button, Modal } from '@plumbiu/ui'

export default function Demo() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示 Modal</Button>
      <Modal
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
