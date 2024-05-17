/**
 * @order 999
 * @debug true
 * @description 高度 debug
 * @title 高度 debug
 */
import { TableColumnTypes, Tag, VirtualTable } from '@plumbiu/ui'

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

for (let i = 0; i < 1000; i++) {
  dataSource.push({
    key: String(i),
    name: 'xiaoming',
    age: i,
    address: 'beijing',
  })
}
export default function Demo() {
  return <VirtualTable scroll={{ y: 400 }} columns={columns} dataSource={dataSource} />
}
