/**
 * @order 2
 * @description 不同提示状态
 * @title 状态
 */

import { useMessage, Button, Space } from '@plumbiu/ui'

export default function Basic() {
  const [messageApi] = useMessage()

  return (
    <Space>
      <Button onClick={() => messageApi.info('This is info message')}>
        info message
      </Button>
      <Button onClick={() => messageApi.warning('This is warning message')}>
        warning message
      </Button>
      <Button onClick={() => messageApi.success('This is success message')}>
        success message
      </Button>
      <Button onClick={() => messageApi.error('This is error message')}>
        error message
      </Button>
    </Space>
  )
}
