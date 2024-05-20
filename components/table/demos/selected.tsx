/**
 * @order 9
 * @description 展示 table 选中项按钮
 * @title 选中项
 */
import { useRef, useState } from 'react'
import {
  Button,
  Table,
  TableColumnTypes,
  TableRefProps,
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

export default function Demo() {
  const ref = useRef<TableRefProps>(null)
  const [selectedData, setSelectedData] = useState<React.Key[]>([])
  const [status, setStaus] = useState(TableCheckEnum.on)

  function selectAll() {
    ref.current?.updateCheckeboxByRowIndex?.(status, 0)
    setStaus(
      status === TableCheckEnum.off ? TableCheckEnum.on : TableCheckEnum.off,
    )
  }

  const SelectButton = (
    <div>
      <Button onClick={selectAll}>
        全部{ref.current?.isAllChecked ? '取消选中' : '选中'}
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
