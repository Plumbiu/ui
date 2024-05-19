/**
 * @order 5
 * @description 固定列建议指定 width 宽度，默认为 200px
 * @title 固定列
 */
import { Link, Table } from '@plumbiu/ui'

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left' as const,
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left' as const,
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
    fixed: 'right' as const,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right' as const,
    width: 100,
    render: () => <Link>action</Link>,
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
]

export default function Demo() {
  return (
    <Table scroll={{ y: 400, x: 1300 }} columns={columns} dataSource={data} />
  )
}
