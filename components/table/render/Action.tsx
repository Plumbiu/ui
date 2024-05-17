import { css } from '@pigment-css/react'
import { fcb, gap4 } from '../../_styles/css'
import { IconWrap } from '../../icon'
import { UpIcon, DownIcon, MaterialSymbolsFilterListRounded } from '../icons'
import {
  FilterStatusEnum,
  SetOperaParams,
  SortStatusEnum,
  TableFilter,
  TableSort,
} from '../types'

interface ITableActionsProps {
  sortStatus?: SortStatusEnum
  filterStatus?: FilterStatusEnum
  setOperaParams?: SetOperaParams
  title: string
  sorter: TableSort
  filter: TableFilter
  colIndex: number
}

const tableActionSvgCls = css({
  '& > span': {
    display: 'flex',
  },
})

const TableAction: React.FC<ITableActionsProps> = ({
  sortStatus,
  setOperaParams,
  title,
  sorter,
  filter,
  colIndex,
  filterStatus,
}) => {
  const sortNode = sorter ? (
    <div className={tableActionSvgCls}>
      <IconWrap
        color={sortStatus === SortStatusEnum.ascend ? 'primary' : undefined}
        size="sm"
      >
        <UpIcon />
      </IconWrap>
      <IconWrap
        color={sortStatus === SortStatusEnum.descend ? 'primary' : undefined}
        size="sm"
      >
        <DownIcon />
      </IconWrap>
    </div>
  ) : null
  const filterNoe = filter ? (
    <IconWrap
      size="lg"
      hoverBg
      color={filterStatus === FilterStatusEnum.sorted ? 'primary' : undefined}
      onClick={(e) => {
        e.stopPropagation()
        setOperaParams?.((preProps) => {
          const { filterStatusMap } = preProps
          filterStatusMap[colIndex] = filterStatusMap[colIndex]
            ? FilterStatusEnum.unsorted
            : FilterStatusEnum.sorted
          return {
            ...preProps,
            filters: {
              ...preProps.filters,
              filterStatusMap: { ...filterStatusMap },
            },
          }
        })
      }}
    >
      <MaterialSymbolsFilterListRounded fontSize={20} />
    </IconWrap>
  ) : null
  return (
    <div className={fcb}>
      {title}
      <div className={`${fcb} ${gap4}`}>
        {sortNode}
        {filterNoe}
      </div>
    </div>
  )
}

export default TableAction
