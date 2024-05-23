/**
 * @order 3
 * @description 可清除
 * @title 基本
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Input
        placeholder="xxx"
        allowClear
        onChange={(e) => {
          console.log(e)
        }}
      />
    </>
  )
}
