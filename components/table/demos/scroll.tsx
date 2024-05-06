/**
 * @description 基本表格-只展示数据
 * @title 基本
 */
/* eslint-disable @stylistic/max-len */
import { Table, TableColumnTypes, Tag } from '@plumbiu/ui'

interface DataSource {
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
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'Age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'Address',
    render: (node, record, index) => <Tag>{node}</Tag>,
  },
  {
    title: 'Skill',
    dataIndex: 'skill',
    key: 'Skill',
    width: 150,
  },
]

const dataSource: DataSource[] = [
  {
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
    skill: 'game',
  },
  {
    name: 'xiaohong',
    age: 17,
    address: 'shanghai',
    skill: 'book',
  },
  {
    name: 'xiaogang',
    age: 18,
    address: 'hangzhou',
    skill: 'pc',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
    skill: 'mobile',
  },
]
export default function Demo() {
  return <Table scroll={{ y: 300 }} columns={columns} dataSource={dataSource} />
}
