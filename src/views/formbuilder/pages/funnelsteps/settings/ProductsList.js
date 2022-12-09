import { Button, Card } from '@mui/material'
import { Space, Table } from 'antd'
import React from 'react'
import EditDelet from '../../../../../components/gloabal/confirmation/EditDelete'

const ProductsList = () => {
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h4>
                    Products List
                </h4>
                <Button className='primary'>
                    Add Product
                </Button>
            </div>
            <Card>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}
export default ProductsList;
const data = [
    {
        feename: 'Fitness',
        description: 'Dictum mi diam fringilla iaculis',
        program: "program",
        price: '25',
    },
    {
        feename: 'Fitness',
        description: 'Dictum mi diam fringilla iaculis',
        program: "program",
        price: '25',
    }, {
        feename: 'Fitness',
        description: 'Dictum mi diam fringilla iaculis',
        program: "program",
        price: '25',
    },
]
const columns = [
    {
        title: 'Fee Name',
        dataIndex: 'feename',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Fee Description',
        dataIndex: 'description',

    },
    {
        title: 'Program',
        dataIndex: 'program',

    },
    {
        title: 'Price',
        dataIndex: 'price',

    },
    {
        title: 'Action',
        render: () => (
            <Space size="middle">
                <EditDelet />
            </Space>
        ),
    },
];
