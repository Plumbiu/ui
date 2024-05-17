import { useMemo, useState } from 'react'
import {
  DefaultData,
  FilterOperate,
  FilterStatusEnum,
  ITableOperateParams,
} from '../types'

interface IUseOperate {
  dataSource: DefaultData[]
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  pagination: boolean
  filterFns: FilterOperate[]
}

const useOperate = (props: IUseOperate) => {
  const { dataSource, setCurrent, pagination, filterFns } = props
  const [operaParams, setOperaParams] = useState<ITableOperateParams>({
    sorter: undefined,
    filterFns,
    sortStatusMap: {},
  })

  const mergedDataSource = useMemo(() => {
    let clonedDataSouce = dataSource.slice(0)
    if (operaParams === undefined) {
      return clonedDataSouce.slice(0)
    }
    const { sorter, filterFns } = operaParams
    if (filterFns) {
      for (const filterFn of filterFns) {
        if (!filterFn) {
          continue
        }
        const { status, fn } = filterFn
        if (status === FilterStatusEnum.sorted && fn) {
          clonedDataSouce = clonedDataSouce.filter(fn)
        }
      }
      if (pagination) {
        setCurrent(1)
      }
    }
    if (sorter) {
      clonedDataSouce.sort(sorter)
    }

    return clonedDataSouce
  }, [operaParams, dataSource])

  return {
    setOperaParams,
    mergedDataSource,
    operaParams,
  }
}

export default useOperate
