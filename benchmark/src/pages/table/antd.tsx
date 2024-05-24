import { Table } from 'antd'
import useMeature from '../../hooks/useMeature'

const columns: any[] = []

for (let i = 0; i < 100; i++) {
  columns.push({
    title: 'Column ' + i,
    width: 200,
    dataIndex: 'address',
    key: i,
  })
}

const dataSource: any[] = []
for (let i = 0; i < 1000; i++) {
  dataSource.push({
    key: i,
    address: `London Park no. ${i}`,
  })
}
export default function TableBench() {
  console.log('antd-table', useMeature())
  return <Table pagination={false} columns={columns} dataSource={dataSource} />
}
