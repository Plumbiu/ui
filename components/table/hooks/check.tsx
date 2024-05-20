import { useState, useEffect, useMemo } from 'react'
import { CheckEnum, DefaultData, TableRowSelection } from '../types'

interface UseCheck {
  splitData: DefaultData[]
  rowSelection?: TableRowSelection
}

const useCheck = ({ splitData, rowSelection }: UseCheck) => {
  const [checkArr, setCheckArr] = useState<CheckEnum[]>(
    new Array(splitData.length + 1).fill(CheckEnum.off),
  )

  const updateChecked = (checkedStatus: CheckEnum, rowIndex: number) => {
    setCheckArr((prevProps) => {
      if (prevProps[rowIndex] === checkedStatus) {
        return prevProps
      }
      const newStatus = [...prevProps]

      if (checkedStatus === CheckEnum.off) {
        newStatus[0] = CheckEnum.off
      }
      newStatus[rowIndex] = checkedStatus

      if (rowIndex !== 0) {
        const tmp: DefaultData[] = []
        for (let i = 1; i < newStatus.length; i++) {
          if (newStatus[i] === CheckEnum.on) {
            tmp.push(splitData[i - 1])
          }
        }
        rowSelection?.onChange(tmp)
      }
      return newStatus
    })
  }

  const checkAll = (checkedStatus: CheckEnum) => {
    const tmp: typeof checkArr = []
    for (let i = 0; i <= splitData.length; i++) {
      tmp[i] = checkedStatus
    }
    setCheckArr(tmp)
  }

  const [isAllChecked, isNoneChecked] = useMemo(() => {
    let isNoneChecked = true
    let isAllChecked = true
    for (let i = 1; i <= splitData.length + 1; i++) {
      const item = checkArr[i]
      if (item === CheckEnum.off) {
        isAllChecked = false
      } else if (item === CheckEnum.on) {
        isNoneChecked = false
      }
    }
    console.log([isAllChecked, isNoneChecked])

    return [isAllChecked, isNoneChecked]
  }, [checkArr, splitData])

  useEffect(() => {
    if (isAllChecked) {
      updateChecked(CheckEnum.on, 0)
    }
  }, [isAllChecked])

  const checkCallback = (checkedStatus: CheckEnum, rowIndex: number) => {
    if (rowIndex === 0) {
      checkAll(checkedStatus)
      rowSelection?.onChange(checkedStatus === CheckEnum.on ? splitData : [])
    } else {
      if (checkedStatus === CheckEnum.off) {
        updateChecked(CheckEnum.off, 0)
      }

      updateChecked(checkedStatus, rowIndex)
    }
  }

  return {
    checkCallback: rowSelection ? checkCallback : undefined,
    checkArr,
    isAllChecked,
    isNoneChecked,
  }
}

export default useCheck
