/**
 * @order 6
 * @description 表格排序
 * @title 排序
 * @debug true
 */
import { Table, TableColumnTypes } from '@plumbiu/ui'

interface DataType {
  key: React.Key
  name: string
  chinese: number
  math: number
  english: number
}

const columns: TableColumnTypes<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: (a, b) => a.chinese - b.chinese,
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: (a, b) => a.math - b.math,
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: (a, b) => a.english - b.english,
  },
]
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
]

export default function Demo() {
  return (
    <Table columns={columns} dataSource={data} />
  )
}
