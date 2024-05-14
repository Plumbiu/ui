/**
 * @order 999
 * @debug true
 * @description 高度 debug
 * @title 高度 debug
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
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (row) => <Tag>{row.address}</Tag>,
  },
]

const dataSource: DataSource[] = []

for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: String(i),
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
  })
}
export default function Demo() {
  return <Table scroll={{ y: 400 }} columns={columns} dataSource={dataSource} />
}
