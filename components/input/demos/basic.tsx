/**
 * @order 1
 * @description 基本输入框
 * @title 基本
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Input
        placeholder="xxx"
        wait={500}
        onChange={(e) => {
          console.log(e)
        }}
      />
    </>
  )
}
