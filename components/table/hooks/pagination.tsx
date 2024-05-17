import { useMemo } from 'react'
import { DefaultData } from '../types'
import { css, styled } from '@pigment-css/react'
import clsx from 'clsx'
import {
  MaterialSymbolsLightChevronLeftRounded,
  MaterialSymbolsLightChevronRightRounded,
} from '../icons'
import Input from '../../input'

const StyledPagintaion = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  fontSize: 14,
  alignItems: 'center',
  marginTop: 12,
  gap: 8,
  '& > .__pagination_disabled': {
    color: 'rgba(0, 0, 0, 0.25)',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& > ._pagination_hl': {
    borderColor: theme['primary'],
    color: theme['primary'],
  },
}))

const ellipsisCls = css(({ theme }) => ({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.25)',
  fontWeight: 700,
  '&:hover': {
    color: theme['primary'],
  },
}))

const paginationCls = css(({ theme }) => ({
  width: 30,
  height: 30,
  lineHeight: '28px',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
  color: theme.vars['text-1'],
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.vars['info-6'],
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
  total: number
  dataSource: DefaultData[]
  pagination: boolean
  pageCount: number
  current: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}

const usePagination = (props: IUsePagination) => {
  const {
    pageSize,
    dataSource,
    pagination,
    total,
    pageCount,
    current,
    setCurrent,
  } = props
  const leftOffset = Math.floor(pageCount / 2)

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
  }, [current, pageSize, total, pagination, dataSource])

  const pageNum = useMemo(() => {
    return Math.ceil(total / pageSize)
  }, [total, pageSize, pagination, dataSource])

  const paginationArr = useMemo(() => {
    const tmp: number[] = []
    for (let i = 1; i <= pageNum; i++) {
      tmp.push(i)
    }
    return tmp
  }, [pageNum])

  const pageConfig = useMemo(() => {
    if (pageNum < pageCount) {
      return { arr: paginationArr, show: false }
    }
    if (current < pageCount - 2) {
      return { arr: paginationArr.slice(0, pageCount - 1), show: 'right' }
    }
    if (current >= pageNum - pageCount + 3) {
      return { arr: paginationArr.slice(pageNum - pageCount + 1), show: 'left' }
    }
    return {
      arr: paginationArr.slice(
        current - leftOffset,
        current + pageCount - leftOffset - 2,
      ),
      show: 'both',
    }
  }, [total, paginationArr, current, pageCount])

  const Pagintaion = useMemo(() => {
    if (!pagination) {
      return null
    }
    return (
      <StyledPagintaion>
        <MaterialSymbolsLightChevronLeftRounded
          onClick={() => setCurrent(1)}
          className={clsx(paginationCls, PaginationItem, {
            __pagination_disabled: current === 1,
          })}
        />
        {(pageConfig.show === 'left' || pageConfig.show === 'both') && (
          <>
            <PaginationItem
              current={1}
              setCurrent={setCurrent}
              isHighlihgt={false}
            />
            <div
              className={clsx(ellipsisCls, PaginationItem)}
              onClick={() => setCurrent(current - leftOffset)}
            >
              •••
            </div>
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
            <div
              className={clsx(ellipsisCls, PaginationItem)}
              onClick={() => setCurrent(current + leftOffset)}
            >
              •••
            </div>
            <PaginationItem
              current={pageNum}
              setCurrent={setCurrent}
              isHighlihgt={false}
            />
          </>
        )}
        <MaterialSymbolsLightChevronRightRounded
          onClick={() => setCurrent(pageNum)}
          className={clsx(paginationCls, {
            __pagination_disabled: current === pageNum,
          })}
        />
        <>
          <span>跳至</span>
          <Input
            style={{ width: 50 }}
            onBlur={(e) => {
              if (e.target.value === '') {
                return
              }
              const value = Number(e.target.value)
              if (Number.isNaN(value)) {
                e.target.value = ''
                return
              } else if (value > pageNum) {
                setCurrent(pageNum)
              } else if (value < 1) {
                setCurrent(1)
              } else {
                setCurrent(value)
              }
              e.target.value = ''
            }}
          />
          <span>页</span>
        </>
      </StyledPagintaion>
    )
  }, [pageNum, current])

  return { splitData, Pagintaion, current, setCurrent }
}

export default usePagination
