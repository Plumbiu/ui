/**
 * @order 2
 * @description 使单元格全部加上边框
 * @title 边框
 */
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
    render: (row) => <Tag>{row.address}</Tag>,
    key: '3',
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
export default function Borderd() {
  return <Table bordered columns={columns} dataSource={dataSource} />
}
