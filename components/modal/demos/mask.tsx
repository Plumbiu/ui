/**
 * @order 2
 * @description mask 控制是否显示遮罩层
 * @title 遮罩层
 */

import { Button, Modal } from '@plumbiu/ui'
import { useState } from 'react'

export default function Demo() {
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  return (
    <div>
      <div className="button-demo">
        <Button onClick={() => setV1(true)}>Modal(mask)</Button>
        <Button onClick={() => setV2(true)}>Modal(no mask)</Button>
      </div>
      <Modal
        visible={v1}
        onClose={() => setV1(false)}
        title="标题标题标题"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        mask={false}
        visible={v2}
        onClose={() => setV2(false)}
        title="标题标题标题"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
