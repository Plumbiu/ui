import { Table } from 'antd'

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
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    address: `London Park no. ${i}`,
    sort: true,
  })
}
export default function TableBench() {
  return <Table pagination={false} columns={columns} dataSource={dataSource} />
}
