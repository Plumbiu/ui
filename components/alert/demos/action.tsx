/**
 * @description 自定义操作项
 * @title 操作
 */
import { Alert, Button } from '@plumbiu/ui'

export default function Demo() {
  return (
    <>
      <Alert closable action={<Button size="sm">UNDO</Button>}>
        Alert
      </Alert>
      <br />
      <Alert
        closable
        action={
          <>
            <Button size="sm">Foo</Button>
            <Button size="sm" plain>
              Bar
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
