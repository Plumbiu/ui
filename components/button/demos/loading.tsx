/**
 * @order 5
 * @description 加载状态
 * @title 加载
 */
import { Button } from '@plumbiu/ui'

export default function Demo() {
  return (
    <div className="button-demo">
      <Button borderless loading>loading</Button>
      <Button borderless>button</Button>
    </div>
  )
}
