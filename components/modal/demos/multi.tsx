/**
 * @order 6
 * @description 多个 modal 层可以调用函数全部关闭
 * @title 全部关闭
 */

import { useState } from 'react'
import { Button, Modal } from '@plumbiu/ui'

const { distoryAll } = Modal

export default function Demo() {
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  const [v3, setV3] = useState(false)
  const [v4, setV4] = useState(false)

  function openAll() {
    setV1(true)
    setV2(true)
    setV3(true)
    setV4(true)
  }
  return (
    <div>
      <Button onClick={openAll}>Modal</Button>
      <Modal
        destoryOnClose
        visible={v1}
        top={10}
        onClose={() => setV1(false)}
        title="111"
      >
        <Button onClick={distoryAll}>全部关闭</Button>
      </Modal>
      <Modal visible={v2} top={40} onClose={() => setV2(false)} title="222">
        <Button onClick={distoryAll}>全部关闭</Button>
      </Modal>
      <Modal visible={v3} top={70} onClose={() => setV3(false)} title="333">
        <Button onClick={distoryAll}>全部关闭</Button>
      </Modal>
      <Modal visible={v4} top={100} onClose={() => setV4(false)} title="444">
        <Button onClick={distoryAll}>全部关闭</Button>
      </Modal>
    </div>
  )
}
