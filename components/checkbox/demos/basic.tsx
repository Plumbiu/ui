/**
 * @order 1
 * @description 基本多选框
 * @title 基本
 */
import { Checkbox } from '@plumbiu/ui'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Checkbox />
      <Checkbox checked />
      <Checkbox checked={false} />
      <Checkbox indeterminate />
      <Checkbox disabled />
      <Checkbox indeterminate disabled />
      <Checkbox checked disabled />
    </div>
  )
}
