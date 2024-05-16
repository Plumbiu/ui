/**
 * @order 8
 * @description 当数据量很大时，使用分页可以提高渲染性能
 * @title 分页
 */
import { Table, TableColumnTypes } from '@plumbiu/ui'

interface DataSource {
  key: string
  index: number
  age: number
}

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnTypes<DataSource>[] = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 200,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 200,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 200,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 200,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 200,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 200,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 200,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
]

const dataSource: DataType[] = []
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}

export default function Demo() {
  return (
    <Table pagination columns={columns} pageSize={12} dataSource={dataSource} />
  )
}
