import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';

const { Option } = Select;
const selectAfter = (
    <Select className="select-after">
    </Select>
);
const Surveyadvance = () => {
  return (
    <div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Question Align</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Question Sub Align</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Qustion Sub Size</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Answer Size</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Progress Size</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Progress Color</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Progress Style</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Hover Color</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='mb-0'
          >Hover Style</Typography>
        </div>
        <Input
          className='inputstyle'
          addonAfter={selectAfter}
          placeholder='Full Name'

        />
      </div>
    </div>
  )
}

export default Surveyadvance