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
        onChange={(e) => {
          console.log(e)
        }}
      />
      <br />
      <br />
      <Input
        disabled
        placeholder="xxx"
        onChange={(e) => {
          console.log(e)
        }}
      />
    </>
  )
}
