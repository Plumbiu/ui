/**
 * @order 6
 * @description 指定密码框
 * @title 密码框
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <Input
      type="password"
      placeholder="xxx"
      onChange={(e) => {
        console.log(e)
      }}
    />
  )
}
