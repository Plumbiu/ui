/**
 * @order 6
 * @description 表格排序
 * @title 排序
 * @debug true
 */
import { Table, TableColumnTypes } from '@plumbiu/ui'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnTypes<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
]

export default function Demo() {
  return (
    <Table columns={columns} dataSource={data} />
  )
}
