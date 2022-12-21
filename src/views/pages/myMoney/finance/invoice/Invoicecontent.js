import {
  Avatar,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  Card,
  Typography,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dropdown, } from 'antd';
import { DockOutlined, Edit, Message, Print } from '@mui/icons-material';
import { X } from 'react-feather';
import { useDispatch } from 'react-redux';
import { GET_ALL_INVOICE } from '../../../../../redux/actions/mymoney';
import { DownOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Submit and continue',
    key: '1',
  },
];
const Invoicecontent = () => {
  const disptach = useDispatch()

  useEffect(() => {
    disptach(GET_ALL_INVOICE())
  }, [])

  return (
    <Card style={{
      width: '90vh'
    }}>
      <div >
        <div className='d-flex justify-content-between m-1'>
          <Typography variant='h6' className='mb-0'>INV-0001881</Typography>
          <div className='d-flex'>
            <Button>
              <Edit />
            </Button>
            <Button>
              <DockOutlined />
            </Button>
            <Button>
              <Print />
            </Button>
            <Button className='mr-1'>
              <Message />
            </Button>
            <Button className='mr-1'>
              <MenuIcon />
            </Button>
            <Button className='primary mr-1'>Recocord Payment</Button>
            <Button className='mr-1'>
              More
            </Button>
            <Button>
              <X />
            </Button>
          </div>
        </div>
        <div className='divider' />
        <div className='shadow-lg m-2 bg-white rounded'>
          <div className='mainlable '>
            <div className='d-flex justify-content-between'>
              <div className='m-1'>
                <div class="ribbon-wrapper-green">
                  <div class="ribbon-green">Sent</div>
                </div>
                <div className='m-2'>
                  <div>
                    <Avatar />
                    <Typography variant='h5'>Zylker</Typography>
                    <Typography>AppleView twon,</Typography>
                    <Typography>Bakers Street,</Typography>
                    <Typography>Chichago U.S.A,</Typography>
                  </div>
                </div>
              </div>
              <div className='m-1'>
                <Dropdown.Button
                  icon={<DownOutlined />}
                  menu={{
                    items,
                  }}
                >
                  customize
                </Dropdown.Button>
                <Typography variant='h6'>Invoice</Typography>
                <Typography variant='h6'>INV-0001881</Typography>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='m-1'>
                <Typography variant='h6'>Bill To</Typography>
                <Typography variant='h6'>Aaron Brown</Typography>
              </div>
              <div className='m-1'>
                <div>
                  <div className='d-flex'>
                    <Typography>Invoice Date:</Typography>
                    <Typography>19/20/2012</Typography>
                  </div>
                  <div className='d-flex'>
                    <Typography>Terms :</Typography>
                    <Typography>Net Us</Typography>
                  </div>
                  <div className='d-flex'>
                    <Typography>Due Date:</Typography>
                    <Typography>19/20/2012</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead className="primary"
             >
                <TableRow    style={{
                  color: "#fff"
                }}>
                  <TableCell className='text-white'><b>#</b></TableCell>
                  <TableCell className='text-white' align="right" ><b>Item & description</b></TableCell>
                  <TableCell className='text-white' align="right"><b>Qty</b></TableCell>
                  <TableCell className='text-white' align="right"><b>Rate</b></TableCell>
                  <TableCell className='text-white' align="right"><b>Amount</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[].map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell className='border-bottom'>{row.desc}</TableCell>
                    <TableCell align="right">{'name'}</TableCell>
                    <TableCell align="right">{'name'}</TableCell>
                    <TableCell align="right">{'name'}</TableCell>
                    <TableCell align="right">{'name'}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell className='border-bottom'><b>Sub Total</b></TableCell>
                  <TableCell className='border-bottom'><b>0000</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell className='border-bottom'><b>Total</b></TableCell>
                  <TableCell className='border-bottom'><b>0000</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell className='border-bottom'><b>Balance Due</b></TableCell>
                  <TableCell className='border-bottom'><b>0000</b></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Card>
  )
}

export default Invoicecontent