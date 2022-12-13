import { Typography, Card } from '@mui/material';
import BreadCrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb'
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { CardText } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Divider } from 'antd';
import React, { useState } from 'react'
import { TabContent, TabPane } from 'reactstrap';
import Myemplyee from './Myemplyee';
import MyForm from './MyFormData';
import Schedule from './Schedule';
import "./style.css"
import Employeesetting from './formelemnts/Employeesetting';

const Employeesidebar = ({ }) => {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState("1")
  return (
    <div>
      <div className=''>
        <BreadCrumbs
          breadCrumbTitle="Employee"
          breadCrumbParent="Members"
          breadCrumbActive="Employee"
        />
      </div>
      <div className='d-flex'>
        <Card className='col-md-2 p-1'>
          <div>
            <Typography variant='h6' className='mb-0'>Employee</Typography>
            <Divider />
          </div>
          <div
            className="d-flex align-items-center finance-nav cursor-pointer m-0"
            onClick={() => {
              setActiveTab("1");
            }}
          >
            <div
              className={`${activeTab === "1" ? "bullet active_bullet" : "bullet"}`}
            />
            <CardText className={`${activeTab === "1" && "text-primary"}`}>
              My Employee
            </CardText>
          </div>
          <div
            className="d-flex align-items-center finance-nav cursor-pointer m-0"
            onClick={() => {
              setActiveTab("2");
            }}
          >
            <div
              className={`${activeTab === "2" ? "bullet active_bullet" : "bullet"}`}
            />
            <CardText className={`${activeTab === "2" && "text-primary"}`}>
              My Form
            </CardText>
          </div>
          <div
            className="d-flex align-items-center finance-nav cursor-pointer m-0"
            onClick={() => {
              setActiveTab("3");
            }}
          >
            <div
              className={`${activeTab === "3" ? "bullet active_bullet" : "bullet"}`}

            />
            <CardText className={`${activeTab === "3" && "text-primary"}`}>
              Schedule
            </CardText>
          </div>
          <div className="section-header">
            <span className="section-title">Filters</span>
            <div className="divider" />
          </div>
          <div className="section-header">
            <span className="section-title">Settings</span>
            <div className="divider" />
          </div>
          <div
            onClick={() => {
              setActiveTab("4");
            }} className="d-flex align-items-center finance-nav cursor-pointer m-0"
          >
            <SettingsIcon
              style={{
                fontSize: "2em",
                color: "#AAAAAA",
                marginRight: "10px",
              }}
            />
            <CardText>Setting</CardText>
          </div>
        </Card>
        <div className='col-md-10'>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Myemplyee />
            </TabPane>
            <TabPane tabId="2">
              <MyForm />
            </TabPane>
            <TabPane tabId="3">
              <Schedule />
            </TabPane>
            <TabPane tabId="4">
              <Employeesetting />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div >
  )
}

export default Employeesidebar