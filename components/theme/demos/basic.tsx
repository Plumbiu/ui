/**
 * @order 1
 * @description 基本按钮
 * @title 基本
 */
/* eslint-disable @stylistic/max-len */
import { Button } from '@plumbiu/ui'
import ThemeProvider from '..'

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
  return (
    <div className="button-demo">
      <ThemeProvider color='#d9390d' dark>
        <Button>Button</Button>
        <Button plain>Button</Button>
        <Button outlined>Button</Button>
      </ThemeProvider>

      <br />
      <Button plain borderless>
        Button
      </Button>
      <Button plain icon={icon}>
        Button
      </Button>
      <Button plain suffixIcon={icon}>
        Button
      </Button>
      <Button plain icon={icon} circle />
      <br />
      <Button disabled borderless>
        Button
      </Button>
      <Button disabled icon={icon}>
        Button
      </Button>
      <Button disabled suffixIcon={icon}>
        Button
      </Button>
      <Button disabled icon={icon} circle />
    </div>
  )
}
