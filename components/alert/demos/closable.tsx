/**
 * @description 控制提示框可关闭，并定制化关闭按钮
 * @title 可关闭提示框
 */
/* eslint-disable @stylistic/max-len */
import { Alert } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Alert closable>Alert</Alert>
      <br />
      <Alert closable closeIcon="x">
        Alert
      </Alert>
    </>
  )
}
