/**
 * @order 3
 * @description 表格具备 @plumbiu/ui 提供的 5 种基本颜色
 * @title 颜色
 */
import { useState } from 'react'
import { Button, TBaseColor, Table, TableColumnTypes, Tag } from '@plumbiu/ui'

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
    key: '1',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: '2',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (row) => <Tag>{row.address}</Tag>,
    key: '3',
  },
]

const dataSource: DataSource[] = [
  {
    key: '1',
    name: 'xiaoming',
    age: 18,
    address: 'beijing',
  },
  {
    key: '2',
    name: 'xiaohong',
    age: 17,
    address: 'shanghai',
  },
  {
    key: '3',
    name: 'xiaogang',
    age: 18,
    address: 'hangzhou',
  },
  {
    key: '4',
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
