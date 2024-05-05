/**
 * @description 基本表格-只展示数据
 * @title 基本
 */
/* eslint-disable @stylistic/max-len */
import { Table, TableColumnTypes, Tag } from '@plumbiu/ui'

interface DataSource {
  name: string
  age: number
  address: string
}

const columns: TableColumnTypes<DataSource>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'Name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'Age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'Address',
    render: (node, record, index) => <Tag>{node}</Tag>,
  },
]

const dataSource: DataSource[] = [
  {
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
  },
  {
    name: 'xiaohong',
    age: 17,
    address: 'shanghai',
  },
  {
    name: 'xiaogang',
    age: 18,
    address: 'hangzhou',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
  },
]
export default function Demo() {
  return <Table columns={columns} dataSource={dataSource} />
}
