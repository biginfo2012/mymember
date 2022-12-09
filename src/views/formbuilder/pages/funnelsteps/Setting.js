import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, Tab } from '@mui/material';
import OverView from './settings/OverView';
import FacebookPixel from './settings/FacebookPixel';
import Seo from './settings/Seo';

const Setting = (props) => {
  const [val, setVal] = useState("1");
  const { state ,setState} = props
  const handleCh = (event, newVal) => {
    setVal(newVal);
  };
  return (
    <div>
      <TabContext
        value={val}
        className="w-100"
      >
        <Card>
          <TabList
            onChange={handleCh}
            className="w-100"
          >
            <Tab
              label="Overview"
              value="1" />
            <Tab
              label="SEO"
              value="2" />
            <Tab
              label="Facebook Pixel"
              value="3" />
          </TabList>
        </Card>
        <TabPanel value='1'
          className="p-0">
          <OverView state={state}  setState={setState}/>
        </TabPanel>
        <TabPanel value='3'
          className="p-0">
          <FacebookPixel />
        </TabPanel>
        <TabPanel value='2'
          className="p-0">
          <Seo />
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default Setting