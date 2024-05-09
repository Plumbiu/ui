/**
 * @order 5
 * @description 指定额外页脚
 * @title 额外页脚
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

for (let i = 0; i < 5; i++) {
  dataSource.push({
    key: `${i}`,
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
    skill: 'game',
  })
}
export default function Demo() {
  return <Table columns={columns} dataSource={dataSource} footer={'hello'} />
}
