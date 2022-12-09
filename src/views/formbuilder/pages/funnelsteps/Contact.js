import {
  Card, Icon,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  Checkbox,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState } from 'react'
import lastweek from "../../../../assets/img/lastweek.png"
import totalcontact from "../../../../assets/img/totalcontact.png"
import newcontact from "../../../../assets/img/newcontact.png"
import { Space, Table } from 'antd';
import 'antd/dist/antd.css';
import SearchIcon from '@mui/icons-material/Search';
import EditDelet from '../../../../components/gloabal/confirmation/EditDelete';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const data = [
  { name: "Total Contacts", icon: totalcontact, total: "123" },
  { name: "Last Week Contacts", icon: lastweek, total: "123" },
  { name: "Last Week Contacts", icon: newcontact, total: "123" },


]
const style = {
  width: "400px"
};

const Contact = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [addmemebrtype, setaddmemebrtype] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='w-100'>
      <div className='d-flex justify-content-between'>
        <h4>Contacts</h4>
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
        {data.map((item, i) => {
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
      {selectedRowKeys.length > 0 && <div className='d-flex justify-content-end'>
        <Button
          variant='contained'
          onClick={handleOpen}
        >Add</Button>
      </div>}
      <br />
      <Card>
        <Table columns={columns} dataSource={data2} rowSelection={rowSelection} />
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
      >
        <DialogTitle>Member Type</DialogTitle>
        <DialogContent>
          <Box sx={style}>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={addmemebrtype === "Active Member"} />} onChange={
                () => setaddmemebrtype('Active Member')} label="Active Member" />
              <FormControlLabel control={<Checkbox checked={addmemebrtype === "Active Trial"} />} onChange={
                () => setaddmemebrtype('Active Trial')} label="Active Trial" />
              <FormControlLabel control={<Checkbox checked={addmemebrtype === 'Leads'} />} onChange={
                () => setaddmemebrtype('Leads')} label="Leads" />
              <FormControlLabel control={<Checkbox checked={addmemebrtype === "Former Member"} />} onChange={
                () => setaddmemebrtype('Former Member')} label="Former Member" />
              <FormControlLabel control={<Checkbox checked={addmemebrtype === 'Former Trial'} />} onChange={
                () => setaddmemebrtype('Former Trial')} label="Former Trial" />
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <div className='d-flex justify-content-end'>
            <Button
              variant='contained'
            >Add</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Contact;

const data2 = [
  {
    key: '1',
    name: 'John Brown',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    type: "Active",
    email: "john@email.com",
    smartlist: "smartlist",
    Phone: "03954564"
  },
  {
    key: '2',
    name: 'Jim Green',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    type: "Active",
    email: "john@email.com",
    smartlist: "smartlist",
    Phone: "03954564"

  },
  {
    key: '3',
    name: 'Joe Black',
    Subcategory: 'Subcategory',
    Date: '30.12.2021',
    type: "Active",
    email: "john@email.com",
    smartlist: "smartlist",
    Phone: "03954564"

  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
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
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    key: 'Date',
    dataIndex: 'Date',
    render: (_, { Date }) => (
      <Space size="middle">
        {Date}
      </Space>
    ),
  },
  {
    title: 'Entry Date',
    key: 'Phone',
    dataIndex: 'Phone',
    render: (_, { Phone }) => (
      <Space size="middle">
        {Phone}
      </Space>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <EditDelet />
      </Space>
    ),
  },
];
