/**
 * @order 9
 * @description 展示 table 选中项按钮
 * @title 选中项
 */
import { useState } from 'react'
import { Table, TableColumnTypes, Tag } from '@plumbiu/ui'

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
  const [selectedData, setSelectedData] = useState<DataSource[]>([])
  return (
    <>
      <div>选中项 {JSON.stringify(selectedData)}</div>
      <Table
        rowSelection={{
          onChange(data: DataSource[]) {
            setSelectedData(data)
          },
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}
