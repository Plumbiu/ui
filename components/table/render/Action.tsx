import { css } from '@pigment-css/react'
import { ReactNode } from 'react'
import { UpIcon, DownIcon } from '../icons'
import { SortStatusEnum } from '../types'
import { fcb, gap4 } from '@/_styles'
import { IconWrap } from '@/icon'

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
        color={sortStatus === SortStatusEnum.descend ? 'primary' : undefined}
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

const TableAction: React.FC<{
  sortNode: ReactNode
  title: string
}> = ({ sortNode, title }) => {
  return (
    <div className={fcb}>
      {title}
      <div className={`${fcb} ${gap4}`}>{sortNode}</div>
    </div>
  )
}

export default TableAction
