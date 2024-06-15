/**
 * @order 9
 * @description 展示 table 选中项按钮
 * @title 选中项
 */
import { useRef, useState } from 'react'
import {
  Button,
  Table,
  TableRefProps,
  TableColumnTypes,
  Tag,
  TableCheckEnum,
} from '@plumbiu/ui'

interface DataSource {
  key: string
  name: string
  age: number
  address: string
}

const columns: TableColumnTypes<DataSource>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: '1',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: '2',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: '3',
    render: (row) => <Tag>{row.address}</Tag>,
  },
]

const dataSource: DataSource[] = [
  {
    key: '1',
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
  },
  {
    key: '2',
    name: 'xiaohong',
    age: 17,
    address: 'shanghai',
  },
  {
    key: '3',
    name: 'xiaogang',
    age: 18,
    address: 'hangzhou',
  },
  {
    key: '4',
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
  },
]

export default function Check() {
  const ref = useRef<TableRefProps>(null)
  const [selectedData, setSelectedData] = useState<React.Key[]>([])

  function selectAll() {
    const status = ref.current?.isAllChecked
      ? TableCheckEnum.off
      : TableCheckEnum.on
    console.log(status)

    ref.current?.updateCheckeboxByRowIndex?.(status, 0)
  }

  const SelectButton = (
    <div>
      <Button onClick={selectAll}>
        {ref.current?.isAllChecked ? '取消选中' : '全选中'}
      </Button>
      {'  '}
      <Button
        onClick={() => {
          ref.current?.updateCheckboxByKey?.(TableCheckEnum.on, '1')
        }}
      >
        选中第一项
      </Button>
      {'  '}
      <Button
        onClick={() => {
          ref.current?.updateCheckeboxByRowIndex?.(TableCheckEnum.off, 1)
        }}
      >
        取消选中第一项
      </Button>
      {'  '}
      <Button
        onClick={() => {
          ref.current?.updateCheckeboxByRowIndex?.(TableCheckEnum.on, 1)
        }}
      >
        选中第一项(by rowindex)
      </Button>
      {'  '}
      <Button
        onClick={() => {
          ref.current?.updateCheckboxByKey?.(TableCheckEnum.off, '1')
        }}
      >
        取消选中第一项(by key)
      </Button>
    </div>
  )

  const SelectKeys = (
    <div>
      选中项 key 值：
      {JSON.stringify(selectedData)}
    </div>
  )

  return (
    <>
      {SelectButton}
      <Table
        ref={ref}
        rowSelection={{
          onChange(data) {
            setSelectedData(data)
          },
          getDisabledProps(data: DataSource) {
            return data.age > 20
          },
        }}
        columns={columns}
        dataSource={dataSource}
      />
      {SelectKeys}
    </>
  )
}
