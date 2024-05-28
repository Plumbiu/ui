/**
 * @order 3
 * @description 多选框组
 * @title group
 */
import { useState } from 'react'
import { Checkbox } from '@plumbiu/ui'

const plainOptions = ['Apple', 'Pear', 'Orange']
const optionsLen = plainOptions.length
const defaultCheckedList = ['Apple', 'Orange']

const CheckboxGroup = Checkbox.Group

export default function Demo() {
  const [checkedList, setCheckdList] = useState(defaultCheckedList)
  const checkedLength = checkedList.length
  return (
    <div>
      <Checkbox
        checked={checkedLength === optionsLen}
        indeterminate={checkedLength > 0 && checkedLength !== optionsLen}
        onChange={(e) => {
          if (e.target.checked) {
            setCheckdList(plainOptions)
          } else {
            setCheckdList([])
          }
        }}
      >
        Check all
      </Checkbox>
      <div style={{ height: 10 }} />
      {plainOptions && (
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          defalutValue={defaultCheckedList}
          onChange={(arr) => {
            setCheckdList(arr)
          }}
        />
      )}
    </div>
  )
}
