import { useMemo, useState } from "react";
import { DefaultData, ITableOperaParams } from "../types";

interface IUseOperate {
  dataSource: DefaultData[]
}

const useOperate = (props: IUseOperate) => {
  const { dataSource } = props
  const [operaParams, setOperaParams] = useState<ITableOperaParams>({
    hlColIndexSet: new Set(),
    sorter: undefined,
    filter: undefined
  })

  const mergedDataSource = useMemo(() => {
    const clonedDataSouce = dataSource.slice(0)
    if (operaParams === undefined) {
      return clonedDataSouce
    }
    const { sorter, filter } = operaParams
    if (sorter) {
      return clonedDataSouce.sort(sorter)
    }
    if (filter) {
      return clonedDataSouce.filter(filter)
    }
    return clonedDataSouce
  }, [operaParams, dataSource])

  return {
    setOperaParams,
    mergedDataSource,
    operaParams,
  }

};

export default useOperate