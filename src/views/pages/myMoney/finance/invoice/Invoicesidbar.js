import { Card, Checkbox } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Button, } from 'antd';
import { Typography } from '@material-ui/core';
import AddnewInvoice from './AddnewInvoice';

const Invoicesidbar = () => {
    return (
        <Card style={{
            width: '450px',
            background: "#fff",
            height: '90vh'
        }}>
            <div className='d-flex justify-content-between align-items-cenetr m-1'>
                <h4>All Invoices</h4>
                <div className='d-flex d-flex justify-content-between'>
                    <AddnewInvoice />
                    <Button>
                        <MenuIcon />
                    </Button>
                </div>
            </div>
            <div className='divider' />
            <div>
                <div>
                    {data?.map((item) => (
                        <div className='d-flex justify-content-between align-items-center pl-1 pr-1 border-bottom'>
                            <div>
                                <div className='d-flex align-items-center'>
                                    <Checkbox />
                                    <Typography variant='h6' className='mb-0'>{item?.name}</Typography>
                                </div>
                                <div className='m-1 d-flex align-items-center'>
                                    <Typography className='text-primary mb-0'>{item?.num}</Typography>
                                    <Typography className='border-left ml-1 mb-0'>{item?.date}</Typography>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <Typography className='text-primary mb-0'>{item?.count}</Typography>
                                    <Typography className='mb-0'>{item?.sent}</Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
export default Invoicesidbar
const data = [
    {
        name: "aaron Brown",
        num: 'INV-0001881',
        date: '12/13/2001',
        count: '100',
        sent: 'sent'
    },
    {
        name: "aaron Brown",
        num: 'INV-0001881',
        date: '12/13/2001',
        count: '100',
        sent: 'sent'

    }]