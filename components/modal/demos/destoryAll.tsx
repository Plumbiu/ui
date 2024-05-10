/**
 * @order 6
 * @description 关闭所有弹窗
 * @title 关闭所有
 */

import { Button, Modal } from '@plumbiu/ui'
import { useState } from 'react'

const { destoryAll } = Modal

export default function Demo() {
  const [v1, setv1] = useState(false)
  const [v2, setv2] = useState(false)
  const [v3, setv3] = useState(false)
  const [v4, setv4] = useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setv1(true)
          setv2(true)
          setv3(true)
          setv4(true)
        }}
      >
        显示 Modal
      </Button>
      <Modal
        top={10}
        visible={v1}
        onClose={() => setv1(false)}
        title="标题标题标题"
      >
        <Button onClick={destoryAll}>关闭所有</Button>
      </Modal>
      <Modal
        top={30}
        visible={v2}
        onClose={() => setv2(false)}
        title="标题标题标题"
      >
        <Button onClick={destoryAll}>关闭所有</Button>
      </Modal>
      <Modal
        top={50}
        visible={v3}
        onClose={() => setv3(false)}
        title="标题标题标题"
      >
        <Button onClick={destoryAll}>关闭所有</Button>
      </Modal>
      <Modal
        top={70}
        visible={v4}
        onClose={() => setv4(false)}
        title="标题标题标题"
      >
        <Button onClick={destoryAll}>关闭所有</Button>
      </Modal>
    </div>
  )
}
