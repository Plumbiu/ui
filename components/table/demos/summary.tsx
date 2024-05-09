/**
 * @order 6
 * @description 总结栏
 * @title 总结
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
  },
  {
    title: 'Age',
    dataIndex: 'age',
    summary(data) {
      return `最大年龄：${Math.max(...data.map(item => item.age))}`
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
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
  return <Table columns={columns} dataSource={dataSource} />
}
