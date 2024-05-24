/**
 * @order 5
 * @description status 指定输入框不同状态
 * @title 状态
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  const status = ['danger', 'success', 'warning'] as const
  return status.map((s) => (
    <>
      <Input
        key={s}
        status={s}
        placeholder="xxx"
        onChange={(e) => {
          console.log(e)
        }}
      />
      <br />
      <br />
    </>
  ))
}
