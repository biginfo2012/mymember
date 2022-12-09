import {
  Grid,
  Typography,
  Card,
  Switch
} from '@mui/material'
import optin from "../../../../src/assets/img/optin.png"
import forms from "../../../../src/assets/img/forms.png"
import salses from "../../../../src/assets/img/sales.png"
import webinar from "../../../../src/assets/img/webinar.png"
import "./home-module.scss"
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GET_ALL_SMART_LIST } from '../../../redux/actions/email'
import {
  Select,
  Input,
} from 'antd'

const { Option } = Select

const Funnelinformation = (props) => {
  const {
    templateCategoryTypeList,
    GET_ALL_SMART_LIST,
    getAllSmartList,
    setState,
    state,
    action,
    error
  } = props

  const imgArr = [optin, salses, webinar, forms]

  const [activeType, setActiveType] = React.useState(0);
  const [selectsmartlist, setselectsmartlist] = useState(null)


  // const changeSmart = (value) => {
  //   props.changeSmart(value);
  //   const filterdata = getAllSmartList.filter((item) => item?.folderName === value)
  //   setselectsmartlist(filterdata[0])
  // }



  const changeType = (type, value) => {
    setActiveType(type);
    setState({
      ...state, "funnelType": value, "funnelTypeId": type
    })
  }
  useEffect(() => {
    GET_ALL_SMART_LIST()
  }, [GET_ALL_SMART_LIST])

  useEffect(() => {
    if(templateCategoryTypeList && templateCategoryTypeList.length > 0) {
      setState({
        ...state, "funnelTypeId": templateCategoryTypeList[0]._id, "funnelType": templateCategoryTypeList[0].type
      })
    }

  }, [templateCategoryTypeList]);

  const handlechange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handlechnagemembertype = (value) => {
    setState({ ...state, memberType: value })
  }
  return (
    <div id="funnelinformation" className='m-4'>
      <Grid container spacing={1}>
        <Grid item sm={12} md={props.isModal ? 4 : 3} lg={props.isModal ? 4 : 4}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Form Name
          </Typography>
          <div>
            <Input
              style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
              type="text"
              name="funnelName"
              placeholder="Form Name"
              onChange={handlechange}
              defaultValue={state?.funnelName}

            />
            <div className='error'>{error?.funnelName}</div>
          </div>
        </Grid>
        <Grid item sm={12} md={3} lg={4}>
          <div className='d-flex justify-content-between w-100'>
            <div className='w-100'>
              <Typography className="mb-0 fw-bolder" color="textSecondary">
                Member Type
              </Typography>
              <div>
                <Select
                  getPopupContainer={() => document.getElementById('funnelinformation')}
                  style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
                  placeholder="Member Type"
                  onChange={handlechnagemembertype}
                  name="memberType"
                  defaultValue={state?.memberType}
                >
                  <Option value="Active Student">Active Member</Option>
                  <Option value="Active Trial">Active Trial</Option>
                  <Option value="Leads">Leads</Option>
                  <Option value="Former Student">Former Member</Option>
                  <Option value="Former Trial">Former Trial</Option>
                </Select>
                <div className='error'>{error?.memberType}</div>
              </div>
            </div>
            <div className='w-100'>
              <Typography className="mb-0 fw-bolder" color="textSecondary">
                Automate Entry
              </Typography>
              <Switch onChange={() => {
                setState({
                  ...state, 'isAutomation': !state.isAutomation
                })
              }} checked={state?.isAutomation} />
            </div>
          </div>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item sm={12} md={3} lg={4}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Select Smart List
          </Typography>
          <Select
            name=""
            getPopupContainer={() => document.getElementById('funnelinformation')}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
            placeholder=" Select Smart List"
          >
            <Option value={'None'}>{"None"}</Option>
            {
              getAllSmartList?.map((item, i) => {
                return (
                  <Option key={i} value={item?.folderName}>{item?.folderName}</Option>
                )
              })
            }
          </Select>
        </Grid>

        <Grid item sm={12} md={3} lg={4}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Sub Cetogary
          </Typography>
          <Select
            getPopupContainer={() => document.getElementById('funnelinformation')}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
            placeholder="Sub Cetogary"
          >
            <Option value={'None'}>{"None"}</Option>
            {
              selectsmartlist?.smartlists?.map((item, i) => {
                return (
                  <Option key={i} value={item?.smartlistname}>{item?.smartlistname}</Option>
                )
              })
            }
          </Select>
        </Grid>
      </Grid>
      <br />
      <Typography
        className="mb-0 fw-bolder"
        color="textSecondary">
        Select Form Type
      </Typography>
      <div style={{
        width: "80%"
      }}>
        <Grid container spacing={1} className="mt-1">
          {templateCategoryTypeList?.map((categoryType, index) => (
            <Grid item sm={12} md={3} lg={3}>
              <Card className={`funnelType ${state?.funnelTypeId === categoryType._id
                ? "active"
                : ""
                }`}
                onClick={() => changeType(categoryType._id, categoryType.name)}
              >
                <div>
                  <img alt={categoryType.name} src={imgArr[index]} />
                  <span className='d-flex justify-content-center title'
                  >{categoryType.name}</span>
                </div>
              </Card>
            </Grid>
          ))}

        </Grid>
        <div className='d-flex justify-content-end mt-1'>
          {action}
        </div>
      </div>
    </div>
  )
}

const mapstateprops = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList
  }
}
export default connect(mapstateprops, { GET_ALL_SMART_LIST })(Funnelinformation)
