/**
 * @order 3
 * @description 自定义操作项
 * @title 操作
 */
import { Alert, Button } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Alert closable action={<Button size="sm" type="primary">UNDO</Button>}>
        Alert
      </Alert>
      <br />
      <Alert
        closable
        action={
          <>
            <Button size="sm" type="primary">按钮</Button>
            <Button size="sm" type="primary">
              按钮
            </Button>
          </>
        }
        message="Alert"
      />
      <br />
      <Alert closable closeIcon="x">
        Alert
      </Alert>
    </>
  )
}
