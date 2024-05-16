import { useMemo, useState } from 'react'
import { DefaultData } from '../types'
import { css, styled } from '@pigment-css/react'
import clsx from 'clsx'

const StyledPagintaion = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 12,
  gap: 12,
})

const paginationCls = css(({ theme }) => ({
  width: 30,
  height: 30,
  lineHeight: '28px',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: 4,
  fontSize: 14,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
  color: theme.vars['text-1'],
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.vars['info-5'],
  },
  '&._pagination_hl': {
    borderColor: theme['primary'],
    color: theme['primary'],
  },
}))

const PaginationItem: React.FC<{
  current: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  isHighlihgt: boolean
}> = ({ current, setCurrent, isHighlihgt }) => {
  const cls = clsx({
    _pagination_hl: isHighlihgt,
  })
  return (
    <div
      className={`${cls} ${paginationCls}`}
      onClick={() => setCurrent(current)}
    >
      {current}
    </div>
  )
}

interface IUsePagination {
  pageSize: number
  dataSource: DefaultData[]
  pagination: boolean
}

const usePagination = (props: IUsePagination) => {
  const { pageSize, dataSource, pagination } = props
  const [current, setCurrent] = useState(1)

  const total = dataSource.length

  const splitData = useMemo(() => {
    if (!pagination) {
      return dataSource
    }
    const start = (current - 1) * pageSize
    const end = current * pageSize
    if (end >= total) {
      return dataSource.slice(start)
    }
    return dataSource.slice(start, end)
  }, [current, pageSize, dataSource.length, pagination])

  const pageNum = useMemo(() => {
    return Math.ceil(total / pageSize)
  }, [dataSource.length, pageSize, pagination])

  const paginationArr = useMemo(() => {
    const tmp: number[] = []
    for (let i = 1; i <= pageNum; i++) {
      tmp.push(i)
    }
    return tmp
  }, [pageNum])

  const pageConfig = useMemo(() => {
    if (pageNum <= 6) {
      return { arr: paginationArr, show: false }
    }
    if (current < 5) {
      return { arr: paginationArr.slice(0, 6), show: 'right' }
    }
    if (current >= pageNum - 4) {
      return { arr: paginationArr.slice(pageNum - 7), show: 'left' }
    }
    return { arr: paginationArr.slice(current - 4, current + 3), show: 'both' }
  }, [dataSource.length, paginationArr, current])

  const Pagintaion = useMemo(() => {
    if (!pagination) {
      return null
    }
    return (
      <StyledPagintaion>
        {(pageConfig.show === 'left' || pageConfig.show === 'both') && (
          <>
            <PaginationItem
              current={1}
              setCurrent={setCurrent}
              isHighlihgt={false}
            />
            <div>....</div>
          </>
        )}
        {pageConfig.arr.map((idx) => {
          return (
            <PaginationItem
              key={idx}
              current={idx}
              setCurrent={setCurrent}
              isHighlihgt={current === idx}
            />
          )
        })}
        {(pageConfig.show === 'right' || pageConfig.show === 'both') && (
          <>
            <div>....</div>
            <PaginationItem
              current={pageNum}
              setCurrent={setCurrent}
              isHighlihgt={false}
            />
          </>
        )}
      </StyledPagintaion>
    )
  }, [pageNum, current])

  return { splitData, Pagintaion }
}

export default usePagination
