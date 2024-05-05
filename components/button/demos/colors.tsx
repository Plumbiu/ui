/**
 * @description 通过 color 属性控制颜色
 * @title 颜色
 */
/* eslint-disable @stylistic/max-len */
import { Button, type TBaseColor } from '@plumbiu/ui'

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path
      fill="currentColor"
      d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64"
    />
    <path
      fill="currentColor"
      d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056"
    />
  </svg>
)

export default function Demo() {
  const colors: TBaseColor[] = ['primary', 'success', 'warning', 'danger', 'info']

  function buttonGroup(color: TBaseColor) {
    return (
      <>
        <Button color={color} plain>
          Button
        </Button>
        <Button outlined color={color} icon={icon} circle />
        <Button color={color} icon={icon} outlined>
          Button
        </Button>
        <Button color={color}>Button</Button>
        <Button color={color} icon={icon}>
          Button
        </Button>
        <Button color={color} icon={icon} circle />
      </>
    )
  }
  return (
    <div className="button-demo">
      {colors.map((color) => (
        <div key={color}>{buttonGroup(color)}</div>
      ))}
    </div>
  )
}
