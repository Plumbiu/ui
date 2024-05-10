/**
 * @order 5
 * @description ESC 键关闭弹窗，默认打开
 * @title 键盘控制
 */

import { Button, Modal } from '@plumbiu/ui'
import { useState } from 'react'

export default function Demo() {
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button onClick={() => setV1(true)}>显示 Modal(支持键盘控制)</Button>
      <Button onClick={() => setV2(true)}>显示 Modal(不支持键盘控制)</Button>
      <Modal
        visible={v1}
        onClose={() => setV1(false)}
        title="不支持键盘控制"
      >
        <div>{count}</div>
        <Button onClick={() => setCount(count + 1)}>count++</Button>
      </Modal>
      <Modal
        keyboard={false}
        visible={v2}
        onClose={() => setV2(false)}
        title="支持键盘控制"
      >
        <div>{count}</div>
        <Button onClick={() => setCount(count + 1)}>count++</Button>
      </Modal>
    </div>
  )
}
