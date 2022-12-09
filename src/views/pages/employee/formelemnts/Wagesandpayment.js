import { TableCell, TableHead } from '@material-ui/core'
import { Button, Divider, Table, TableRow, TextField } from '@mui/material'
import { width } from '@mui/system'
import { Select, Input } from 'antd'
import React from 'react'
import { FormGroup } from 'reactstrap'

const Wagesandpayment = () => {
    return (
        <div className='w-100 m-2 mt-0'>
            <h4>Wages And Payment</h4>
            <div>
                <div>
                    <FormGroup>Wages Type</FormGroup>
                    <Select
                        style={{
                            width: "400px"
                        }} >
                        <Select.Option value=""></Select.Option>
                    </Select>
                    <p style={{
                        lineBreak: "strict",
                        width: '400px'
                    }}>Employees can only have one wage type. Set unique
                        wages for each role by enabling Wage-Based Roles.
                    </p>
                </div>
            </div>
            <div className='w-50'>
                <Divider />
                <Table >
                    <TableHead>
                        <TableCell>Wage</TableCell>
                        <TableCell>Effective date</TableCell>
                        <TableCell>New wage</TableCell>
                        <TableCell> New effective date</TableCell>
                    </TableHead>
                    <TableRow class="border">
                        <TableCell>$ 140</TableCell>
                        <TableCell>September 11, 2022</TableCell>
                        <TableCell>
                            <Input variant="outlined"
                                placeholder='$' />
                        </TableCell>
                        <TableCell>
                            <Input variant="outlined"
                                type="date" />
                        </TableCell>
                    </TableRow>
                </Table>
                <div className='m-1'>
                    <Button variant='contained' className='primary'>Save</Button>
                    <Button color="error">Discard changes</Button>
                </div>
            </div>
        </div>
    )
}

export default Wagesandpayment