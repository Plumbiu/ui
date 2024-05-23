import { css } from '@pigment-css/react'
import { UpIcon, DownIcon } from '../icons'
import { SortStatusEnum } from '../types'
import { IconWrap } from '@/icon'

const tableActionSvgCls = css(({ theme }) => ({
  color: theme.vars['info-3'],
  '& > span': {
    display: 'flex',
  },
}))

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
        color={sortStatus === SortStatusEnum.ascend ? 'primary' : undefined}
        size="sm"
      >
        <DownIcon />
      </IconWrap>
    </div>
  )
}
