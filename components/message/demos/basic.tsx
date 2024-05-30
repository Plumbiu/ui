/**
 * @order 1
 * @description 基本提示框
 * @title 基本
 */

import { useMessage, Button } from '@plumbiu/ui'

export default function Basic() {
  const [messageApi] = useMessage()

  return (
    <Button onClick={() => messageApi.info('Hello @plumbiu/ui')}>
      open message
    </Button>
  )
}
