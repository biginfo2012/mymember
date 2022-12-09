import { Card, Chip } from '@mui/material'
import { Table, Typography } from 'antd'
import React from 'react'
import TextsmsIcon from '@mui/icons-material/Textsms';
import StarIcon from '@mui/icons-material/Star';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { LinkOutlined } from '@mui/icons-material';
import Addautmaion from './settings/Addautmaion';

const Automations = () => {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h4>
          Automations
        </h4>
        <div className='d-flex justify-content-end'>
          <Addautmaion />
        </div>
      </div>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div >
  )
}

export default Automations;
const columns = [
  {
    title: 'Sr',
    dataIndex: 'Sr',
    render: (text) => <div>
      <DragIndicatorIcon style={{ color: '#AAAAAA' }} />
      <TextsmsIcon style={{ color: '#AAAAAA' }} />
      <StarIcon style={{ color: '#AAAAAA' }} />
    </div>,
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    render: (_, text) => <Typography>{text?.subject}</Typography>,
  },
  {
    title: 'Smart List',
    dataIndex: 'Smartlist',
    render: (_, text) => <Typography>{text?.Smartlist}</Typography>,
  },
  {
    title: 'Sub Category',
    dataIndex: 'subCategory',
    render: (_, text) => <Typography>{text?.subCategory}</Typography>,
  },
  {
    title: 'Activation Date',
    dataIndex: 'date',
    render: (_, text) => <Typography>{text?.date}</Typography>,
  },
  {
    title: 'Image',
    render: (_, text) => <div>
      <Chip
        icon={<LinkOutlined />}
        label={'image.png'}
      />
    </div>,
  },
]
const data = [
  {
    subject: "Congratulation on joining our family",
    Smartlist: "Smart List",
    subCategory: "Smart List Sub Category",
    date: "10.1.2022"
  },
  {
    subject: "Congratulation on joining our family",
    Smartlist: "Smart List",
    subCategory: "Smart List Sub Category",
    date: "10.1.2022"
  },
  {
    subject: "Congratulation on joining our family",
    Smartlist: "Smart List",
    subCategory: "Smart List Sub Category",
    date: "10.1.2022"
  },
  {
    subject: "Congratulation on joining our family",
    Smartlist: "Smart List",
    subCategory: "Smart List Sub Category",
    date: "10.1.2022"
  },
  {
    subject: "Congratulation on joining our family",
    Smartlist: "Smart List",
    subCategory: "Smart List Sub Category",
    date: "10.1.2022"
  },
]