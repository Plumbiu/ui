import { TableColumnTypes } from '@/table'
import { Table } from '@plumbiu/ui'

interface DataType {
  key: React.Key
  address: string
}

const columns: TableColumnTypes<DataType>[] = []

for (let i = 0; i < 100; i++) {
  columns.push({
    title: 'Column ' + i,
    width: 200,
    dataIndex: 'address',
    key: i,
  })
}

const dataSource: DataType[] = []
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    address: `London Park no. ${i}`,
  })
}

export default function TableBench() {
  return (
    <Table columns={columns} dataSource={dataSource} />
  )
}
