/**
 * @order 2
 * @description 在输入框前后加上额外文本
 * @title 前缀后缀
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Input
        prefixNode="¥"
        suffixNode="元"
        placeholder="xxx"
        onChange={(e) => {
          console.log(e)
        }}
      />
    </>
  )
}
