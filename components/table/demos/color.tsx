/**
 * @description 使单元格全部加上边框
 * @title 边框
 */
/* eslint-disable @stylistic/max-len */
import { Button, TBaseColor, Table, TableColumnTypes, Tag } from '@plumbiu/ui'
import { useState } from 'react'

interface DataSource {
  name: string
  age: number
  address: string
}

const columns: TableColumnTypes<DataSource>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'Name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'Age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'Address',
    render: (node, record, index) => <Tag>{node}</Tag>,
  },
]

const dataSource: DataSource[] = [
  {
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
  },
  {
    name: 'xiaohong',
    age: 17,
    address: 'shanghai',
  },
  {
    name: 'xiaogang',
    age: 18,
    address: 'hangzhou',
  },
  {
    name: 'xiaoshuai',
    age: 21,
    address: 'shenzhen',
  },
]
export default function Demo() {
  const colors: TBaseColor[] = [
    'info',
    'primary',
    'success',
    'warning',
    'danger',
  ]
  const [color, setColor] = useState<TBaseColor>('info')

  return (
    <div>
      <div className="button-demo">
        {colors.map((color) => (
          <Button
            key={color}
            plain
            color={color}
            onClick={() => setColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>

      <Table color={color} bordered columns={columns} dataSource={dataSource} />
    </div>
  )
}
