/**
 * @order 2
 * @description 在输入框前后加上额外文本/标签
 * @title 前缀后缀
 */
import { Input } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Input
        prefix="https://"
        suffix=".com"
        value="mysite"
      />
      <br />
      <br />
      <Input
        prefix="https://"
        afterNode=".com"
        value="mysite"
      />
      <br />
      <br />
      <Input
        beforeNode="https://"
        suffix=".com"
        value="mysite"
      />
      <br />
      <br />
      <Input
        beforeNode="https://"
        afterNode=".com"
        value="mysite"
      />
    </>
  )
}
