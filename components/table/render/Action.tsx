import { css } from '@pigment-css/react'
import { fcb, gap4 } from '../../_styles/css'
import { IconWrap } from '../../icon'
import { UpIcon, DownIcon, MaterialSymbolsFilterListRounded } from '../icons'
import {
  FilterStatusEnum,
  ITableOperateParams,
  SetOperaParams,
  SortStatusEnum,
} from '../types'
import { ReactNode } from 'react'

const tableActionSvgCls = css({
  '& > span': {
    display: 'flex',
  },
})

export const SortAction: React.FC<{
  sortStatus?: SortStatusEnum
}> = ({ sortStatus }) => {
  return (
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
  )
}

function handleFilter(params: ITableOperateParams, colIndex: number) {
  const { filterFns } = params

  const item = filterFns[colIndex]
  if (item.status === FilterStatusEnum.unsorted) {
    item.status = FilterStatusEnum.sorted
  } else {
    filterFns[colIndex].status = FilterStatusEnum.unsorted
  }

  return {
    ...params,
    filterFns,
  }
}

export const FilterAction: React.FC<{
  filterStatus?: FilterStatusEnum
  setOperaParams?: SetOperaParams
  colIndex: number
}> = ({ filterStatus, setOperaParams, colIndex }) => {
  return (
    <IconWrap
      size="lg"
      hoverBg
      color={filterStatus === FilterStatusEnum.sorted ? 'primary' : undefined}
      onClick={(e) => {
        e.stopPropagation()
        setOperaParams?.((preProps) => handleFilter(preProps, colIndex))
      }}
    >
      <MaterialSymbolsFilterListRounded fontSize={20} />
    </IconWrap>
  )
}

const TableAction: React.FC<{
  sortNode: ReactNode
  filterNode: ReactNode
  title: string
}> = ({ sortNode, filterNode, title }) => {
  return (
    <div className={fcb}>
      {title}
      <div className={`${fcb} ${gap4}`}>
        {sortNode}
        {filterNode}
      </div>
    </div>
  )
}

export default TableAction
