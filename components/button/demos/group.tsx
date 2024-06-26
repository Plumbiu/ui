/**
 * @order 4
 * @description 按钮组合
 * @title group
 */
import { Button } from '@plumbiu/ui'

const { ButtonGroup } = Button

export default function Demo() {
  return (
    <div>
      <ButtonGroup>
        <Button icon="<">Previous Page</Button>
        <Button icon=">">Next Page</Button>
        <Button icon=">">Next Page</Button>
      </ButtonGroup>
    </div>
  )
}
