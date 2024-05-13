/**
 * @order 4
 * @description 固定列需要指定 width 宽度，默认为 220px
 * @title 固定列
 */
/* eslint-disable @stylistic/max-len */
import { Table, TableColumnTypes, Tag } from '@plumbiu/ui'

interface DataSource {
  key: string
  name: string
  age: number
  address: string
  skill: string
}

const columns: TableColumnTypes<DataSource>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'Name',
    width: 150,
    fixed: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'Age',
    width: 150,
    fixed: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'Age',
    width: 150,
    fixed: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'Address',
    render: (row) => <Tag>{row.address}</Tag>,
  },
  {
    title: 'Skill',
    dataIndex: 'skill',
    key: 'Skill',
    width: 150,
  },
]

const dataSource: DataSource[] = []

for (let i = 0; i < 40; i++) {
  dataSource.push({
    key: `${i}`,
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
    skill: 'game',
  })
}
export default function Demo() {
  return <Table scroll={{ y: 400, x: 1300 }} columns={columns} dataSource={dataSource} />
}
