import { useMemo, useState } from 'react'
import { DefaultData, ITableOperateParams } from '../types'

interface IUseOperate {
  dataSource: DefaultData[]
}

const useOperate = (props: IUseOperate) => {
  const { dataSource } = props
  const [operaParams, setOperaParams] = useState<ITableOperateParams>({
    sorter: undefined,
    sortStatusMap: {},
  })

  const mergedDataSource = useMemo(() => {
    let clonedDataSouce = dataSource.slice(0)
    if (operaParams === undefined) {
      return clonedDataSouce
    }
    const { sorter } = operaParams
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
