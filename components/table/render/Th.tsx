/* eslint-disable @stylistic/indent */
import {
  ITableOperateParams,
  SortStatusEnum,
  TableSort,
  sortHoverTitle,
} from '../types'
import TableAction, { SortAction } from './Action'

interface ThItemProps {
  title: string
  sorter: TableSort
  sortStatus: SortStatusEnum | undefined
  colIndex: number
  setOperaParams?: React.Dispatch<React.SetStateAction<ITableOperateParams>>
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
    ...params,
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
  setOperaParams,
  colIndex,
  ...restProps
}) => {
  return (
    <th
      onClick={() => {
        if (!sorter) {
          return
        }
        setOperaParams?.((prevProps) => handleSort(prevProps, sorter, colIndex))
      }}
      title={
        sorter ? sortHoverTitle[sortStatus ?? SortStatusEnum.origin] : undefined
      }
      {...restProps}
    >
      {sorter ? (
        <TableAction
          sortNode={<SortAction sortStatus={sortStatus} />}
          title={title}
        />
      ) : (
        title
      )}
    </th>
  )
}

export default ThItem
