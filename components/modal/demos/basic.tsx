/**
 * @order 1
 * @description 基本对话框，注意 onClose 将 visible 设置为 false
 * @title 基本
 */

import { Button, Modal } from '@plumbiu/ui'
import { useState } from 'react'

export default function Demo() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示 Modal</Button>
      <Modal
      portal={document.documentElement}
        visible={visible}
        onClose={() => setVisible(false)}
        title="标题标题标题"
      />
    </div>
  )
}
