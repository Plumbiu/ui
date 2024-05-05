/**
 * @description 基本提示框
 * @title 基本
 */
import React from 'react'
import { Alert, TColor } from '@plumbiu/ui'

export default function Demo() {
  const colors: TColor[] = ['primary', 'success', 'warning', 'danger', 'info']
  return (
    <>
      {colors.map((color) => (
        <React.Fragment key={color}>
          <Alert color={color}>Alert</Alert>
          <br />
        </React.Fragment>
      ))}
    </>
  )
}
