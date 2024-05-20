/* eslint-disable @stylistic/indent */
import { useState, useMemo, useEffect } from 'react'
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

export type UpdateCheckeboxByRowIndex = (
  checkedStatus: CheckEnum,
  rowIndex: number,
) => void

export type updateCheckboxByKey = (
  checkedStatus: CheckEnum,
  key: React.Key,
) => void

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

  const updateCheckeboxByRowIndex: UpdateCheckeboxByRowIndex = (
    status,
    rowIndex,
  ) => {
    if (!rowSelection) {
      return
    }
    setCheckArr((prevProps) => {
      if (prevProps[rowIndex].checkStatus === status) {
        return prevProps
      }
      const clonedProps = [...prevProps]
      clonedProps[rowIndex].checkStatus = status
      if (rowIndex === 0) {
        const formatStatus = isAllChecked ? CheckEnum.off : CheckEnum.on
        for (let i = 0; i < checkArr.length; i++) {
          if (checkArr[i].disabled === true) {
            continue
          }
          clonedProps[i].checkStatus = formatStatus
        }
      }
      return clonedProps
    })
  }

  useEffect(() => {
    if (isNoneChecked) {
      rowSelection?.onChange([])
    } else if (isAllChecked) {
      rowSelection?.onChange(
        checkArr
          .filter(({ disabled, key }) => disabled === false && key)
          .map(({ key }) => key!),
      )
    } else {
      const tmp: React.Key[] = []
      for (const { key, checkStatus, disabled } of checkArr) {
        if (checkStatus === CheckEnum.on && disabled === false && key) {
          tmp.push(key)
        }
      }
      rowSelection?.onChange(tmp)
    }
  }, [checkArr])

  const updateCheckboxByKey = (status: CheckEnum, key: React.Key) => {
    setCheckArr((prevProps) => {
      for (let i = 1; i < prevProps.length; i++) {
        const { key: itemKey, checkStatus, disabled } = prevProps[i]
        if (disabled) {
          continue
        }
        if (itemKey === key) {
          if (checkStatus === status) {
            return prevProps
          }
          prevProps[i].checkStatus = status
        }
      }
      return [...prevProps]
    })
  }

  return {
    checkArr,
    isAllChecked,
    isNoneChecked,
    updateCheckeboxByRowIndex: rowSelection
      ? updateCheckeboxByRowIndex
      : undefined,
    updateCheckboxByKey: rowSelection ? updateCheckboxByKey : undefined,
  }
}

export default useCheck
