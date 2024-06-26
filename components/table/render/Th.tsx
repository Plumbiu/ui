/* eslint-disable @stylistic/indent */
import { useContext } from 'react'
import {
  ITableOperateParams,
  SortStatusEnum,
  TableSort,
  sortHoverTitle,
} from '../types'
import { TableContext } from '../context'
import { SortAction } from './Action'
import { fcb } from '@/_utils/styles'

interface ThItemProps {
  title: string
  sorter: TableSort
  sortStatus: SortStatusEnum | undefined
  colIndex: number
}

function handleSort(
  params: ITableOperateParams,
  sorter: TableSort,
  colIndex: number,
) {
  const { sortStatusMap } = params
  let sortStatus = sortStatusMap?.[colIndex]

  if (sortStatus === undefined || sortStatus === SortStatusEnum.origin) {
    sortStatus = SortStatusEnum.ascend
  } else if (sortStatus === SortStatusEnum.ascend) {
    sortStatus = SortStatusEnum.descend
  } else {
    sortStatus = SortStatusEnum.origin
  }
  sortStatusMap[colIndex] = sortStatus

  return {
    sorter:
      sortStatus === SortStatusEnum.origin
        ? undefined
        : sortStatus === SortStatusEnum.descend
        ? sorter
        : (a: any, b: any) => -sorter!(a, b),
    sortStatusMap,
  }
}

const ThItem: React.FC<ThItemProps> = ({
  sorter,
  title,
  sortStatus,
  colIndex,
  ...restProps
}) => {
  const { setOperaParams } = useContext(TableContext)!
  const commonProps: any = {}
  if (sorter) {
    commonProps.onClick = () =>
      setOperaParams?.((prevProps) => handleSort(prevProps, sorter, colIndex))
    commonProps.title = sortHoverTitle[sortStatus ?? SortStatusEnum.origin]
  }
  return (
    <th {...commonProps} {...restProps}>
      {sorter ? (
        <div className={fcb}>
          {title}
          {<SortAction sortStatus={sortStatus} />}
        </div>
      ) : (
        title
      )}
    </th>
  )
}

export default ThItem
