import { useMemo, useState } from 'react'
import { DefaultData, ITableOperaParams } from '../types'

interface IUseOperate {
  dataSource: DefaultData[]
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  pagination: boolean
}

const useOperate = (props: IUseOperate) => {
  const { dataSource, setCurrent, pagination } = props
  const [operaParams, setOperaParams] = useState<ITableOperaParams>({
    sorter: undefined,
    filters: [],
    filterStatusMap: {},
    sortStatusMap: {},
  })

  const mergedDataSource = useMemo(() => {
    let clonedDataSouce = dataSource.slice(0)
    if (operaParams === undefined) {
      return clonedDataSouce.slice(0)
    }
    const { sorter, filters } = operaParams
    if (filters) {
      for (const filter of Object.values(filters)) {
        if (filter) {
          clonedDataSouce = clonedDataSouce.filter(filter)
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
