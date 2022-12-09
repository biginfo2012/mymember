import {
  Card, Icon,
  Typography,
  Grid,
  FormControl,
  TextField
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react'
import toadyssales from "../../../../assets/img/toadyssales.png"
import lastweeksales from "../../../../assets/img/lastweeksales.png"
import sales from "../../../../assets/img/sales.png"
import { Space, Table } from 'antd';
import 'antd/dist/antd.css';
import SearchIcon from '@mui/icons-material/Search';

const data = [
  { name: "Total Sales", icon: sales, total: "123" },
  { name: "Today's Sales", icon: toadyssales, total: "123" },
  { name: "Last Week Sales", icon: lastweeksales, total: "123" },


]
const Salses = () => {
  return (
    <div className='w-100'>
      <div className='d-flex justify-content-between'>
        <h4>Salse</h4>
        <div className='w-100%'>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              style={{
                border: "1.5px solid #C4C4C4",
                borderRadius: '3px',
                width: '400px'
              }}
              variant={"outlined"}
              size="small"
              type="text"
              placeholder='Search by Date'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
      </div>
      <Grid container spacing={2}>
        {
          data.map((item, i) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={i}>
                <Card className='d-flex'
                  style={{
                    width: '100%',
                    height: '100px',
                    alignItems: 'center'
                  }}>
                  <div className='d-flex justify-content-between w-100 m-1'>
                    <div>
                      <Typography
                        className='mb-0'
                        style={{
                          color: '#AAAAAA',
                          fontSize: '15px'
                        }} >
                        {item?.name}
                      </Typography>
                      <span>
                        {item?.total}
                      </span>
                    </div>
                    <Icon className='h-100'>
                      <img src={item?.icon} className="w-100 h-100" />
                    </Icon>
                  </div>
                </Card>
              </Grid>

            )
          })
        }
      </Grid>
      <br />
      <Card>
        <Table columns={columns} dataSource={data2} />
      </Card>
    </div>
  )
}

export default Salses;

const data2 = [
  {
    key: '1',
    name: 'John Brown',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    Amount: "100",
    smartlist: "smartlist",
    product: "product"
  },
  {
    key: '2',
    name: 'Jim Green',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    Amount: "100",
    smartlist: "smartlist",
    product: "product"

  },
  {
    key: '3',
    name: 'Joe Black',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    Amount: "100",
    smartlist: "smartlist",
    product: "product"

  },
];
const columns = [
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Product Name',
    dataIndex: 'product',
    key: 'product',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  },
  {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Smartlist',
    key: 'smartlist',
    render: (_, { smartlist }) => (
      <Space size="middle">
        {smartlist}
      </Space>
    ),
  },
  {
    title: 'Subcategory',
    dataIndex: 'Subcategory',
    key: 'Subcategory',
  },
];
