/**
 * @order 9
 * @description 虚拟表格必须指定单个单元格高度，并且最好指定宽度
 * @title 虚拟滚动
 */
import { TableColumnTypes, Tag, VirtualTable, Link } from '@plumbiu/ui'

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
    width: 80,
    key: '1',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 80,
    key: '2',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (row) => <Tag>{row.address}</Tag>,
    width: 80,
    key: '3',
  },
  { title: 'Column 1', dataIndex: 'address', key: '4', width: 100 },
  { title: 'Column 2', dataIndex: 'address', key: '5', width: 100 },
  { title: 'Column 3', dataIndex: 'address', key: '6', width: 100 },
  { title: 'Column 4', dataIndex: 'address', key: '7', width: 100 },
  { title: 'Column 5', dataIndex: 'address', key: '8', width: 100 },
  { title: 'Column 6', dataIndex: 'address', key: '9', width: 100 },
  { title: 'Column 7', dataIndex: 'address', key: '10', width: 100 },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '11',
    width: 100,
    fixed: 'right' as const,
  },
  {
    title: 'Operation',
    dataIndex: 'address',
    fixed: 'right',
    width: 100,
    key: '12',
    render: (row) => <Link>action</Link>,
  },
]

const dataSource: DataSource[] = []

for (let i = 0; i < 100000; i++) {
  dataSource.push({
    key: String(i),
    name: 'xiaoming',
    age: i,
    address: 'beijing',
  })
}
export default function Demo() {
  return (
    <VirtualTable
      wait={200}
      itemHeight={50}
      scroll={{ y: 400, x: 1100 }}
      columns={columns}
      dataSource={dataSource}
    />
  )
}
