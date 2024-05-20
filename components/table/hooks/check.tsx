/* eslint-disable @stylistic/indent */
import { useState, useEffect, useMemo } from 'react'
import { CheckEnum, DefaultData, TableRowSelection } from '../types'

interface UseCheck {
  splitData: DefaultData[]
  rowSelection?: TableRowSelection
  rowKey: string
}

interface CheckArr {
  checkStatus: CheckEnum
  disabled: boolean
  key?: string
}

const useCheck = ({ splitData, rowSelection, rowKey }: UseCheck) => {
  const [checkArr, setCheckArr] = useState<CheckArr[]>(
    rowSelection
      ? [
          {
            checkStatus: CheckEnum.off,
            disabled: false,
          },
          ...splitData.map((item) => ({
            key: item?.[rowKey],
            checkStatus: CheckEnum.off,
            disabled: rowSelection?.getDisabledProps?.(item) ?? false,
          })),
        ]
      : [],
  )

  const updateChecked = (checkedStatus: CheckEnum, rowIndex: number) => {
    setCheckArr((prevProps) => {
      if (prevProps[rowIndex].checkStatus === checkedStatus) {
        return prevProps
      }
      prevProps[rowIndex].checkStatus = checkedStatus

      if (rowIndex !== 0) {
        const tmp: React.Key[] = []
        for (const { key, checkStatus, disabled } of prevProps) {
          if (checkStatus === CheckEnum.on && disabled === false && key) {
            tmp.push(key)
          }
        }
        rowSelection?.onChange(tmp)
      }
      return [...prevProps]
    })
  }

  const checkAll = (checkedStatus: CheckEnum) => {
    const tmp: typeof checkArr = []
    for (let i = 0; i < checkArr.length; i++) {
      tmp[i] = checkArr[i]
      if (checkArr[i].disabled === false) {
        tmp[i].checkStatus = checkedStatus
      }
    }
    setCheckArr(tmp)
  }

  const [isAllChecked, isNoneChecked] = useMemo(() => {
    if (!rowSelection) {
      return [false, true]
    }
    let isNoneChecked = true
    let isAllChecked = true
    for (let i = 1; i < checkArr.length; i++) {
      const item = checkArr?.[i]
      if (item?.disabled === false) {
        if (item?.checkStatus === CheckEnum.off) {
          isAllChecked = false
        } else if (item?.checkStatus === CheckEnum.on) {
          isNoneChecked = false
        }
      }
    }
    return [isAllChecked, isNoneChecked]
  }, [checkArr, rowSelection])

  useEffect(() => {
    if (!rowSelection) {
      return
    }
    if (isAllChecked) {
      updateChecked(CheckEnum.on, 0)
    }
  }, [isAllChecked, rowSelection])

  const checkCallback = (checkedStatus: CheckEnum, rowIndex: number) => {
    if (!rowSelection) {
      return
    }
    if (rowIndex === 0) {
      checkAll(checkedStatus)
      const tmp: React.Key[] = []
      for (const { key, disabled } of checkArr) {
        if (disabled === false && key) {
          tmp.push(key)
        }
      }
      rowSelection?.onChange(checkedStatus === CheckEnum.on ? tmp : [])
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
