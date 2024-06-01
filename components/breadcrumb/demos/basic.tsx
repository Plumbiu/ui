/**
 * @order 1
 * @description 基本面包屑
 * @title 基本
 */
import { Breadcrumb } from '@plumbiu/ui'

export default function Demo() {
  return (
    <Breadcrumb
      items={[
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
    />
  )
}
