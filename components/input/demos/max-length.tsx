/**
 * @order 4
 * @description 输入框最大长度
 * @title 显示输入框输入长度
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Input
        maxLength={10}
        placeholder="xxx"
        onChange={(e) => {
          console.log(e)
        }}
      />
    </>
  )
}
