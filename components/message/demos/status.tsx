/**
 * @order 2
 * @description 不同提示状态
 * @title 状态
 */

import { useMessage, Button } from '@plumbiu/ui'

export default function Basic() {
  const [messageApi] = useMessage()

  return (
    <>
      <Button onClick={() => messageApi.info('Info Message')}>
        info message
      </Button>
      <Button onClick={() => messageApi.warning('Warning Message')}>
        warning message
      </Button>
      <Button onClick={() => messageApi.success('Success Message')}>
        success message
      </Button>
    </>
  )
}
