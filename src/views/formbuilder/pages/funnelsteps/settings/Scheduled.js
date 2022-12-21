import {
  Button, Dialog,
  Typography,
  DialogContent, DialogTitle,
  IconButton,
  FormControlLabel, FormGroup, RadioGroup, Radio,
  Checkbox,
  Grid,
  Select,
  MenuItem,
} from "@mui/material"
import { DatePicker, Divider, Input, TimePicker } from "antd"
import moment from "moment"
import React, { useState } from "react"
import { X } from "react-feather"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import './Scheduled.css'

export const Scheduled = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate)
  const [scheduledStr, setScheduledStr] = useState(moment(selectedDate).format("lll"))
  const [open, setopen] = useState(false)
  const [ActivationUpon, setActivationUpon] = useState("System Entry")
  const [timeValue, setTimeValue] = useState(1)
  const [afterValue, setAfterValue] = useState(props.afterValue)
  const [dateValue, setDateValue] = useState("")
  const [hourValue, setHourValue] = useState(props.hourValue)

  const handlechangeActivationUpon = (e) => {
    setActivationUpon(e.target.value)
  }
  const handleRadioChange = (event) => {
    setTimeValue(event.target.value)
  }
  const handleTimeChange = (event) => {
    setAfterValue(event.target.value)
  }
  const handleDateChange = (value) => {
    setDateValue(value)
  }
  const handleHourChange = (value) => {
    setHourValue(value)
  }
  const handleSubmit = (event) => {
    if(timeValue == 1){
      if(afterValue != "" && hourValue != ""){
        setopen(!open)
        props.parentCallback(1, afterValue, dateValue, hourValue)
        let str = "Message is sent " + afterValue + " days after previous"
        setScheduledStr(str)
      }
    }
    else if(timeValue == 2){
      if(dateValue != "" && hourValue != ""){
        setopen(!open)
        props.parentCallback(2, afterValue, dateValue, hourValue)
        setScheduledStr(dateValue.format("ll") + " " + hourValue.format('LT'))
      }
    }
    else{
      if(ActivationUpon == "System Entry") {

      }
      else{

      }
    }
  }
  return (
    <div>
      <Typography />
      <Button className="scadule w-100"
              onClick={() => {
                setopen(!open)
              }}>
        Scheduled {scheduledStr} <CalendarMonthIcon />
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}>
        <DialogContent className="m-0">
          <DialogTitle className="m-0 p-0">
            <div className="d-flex justify-content-between">
              <div>
                Automation Settings
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    setopen(!open)
                  }}
                  className="p-0">
                  <X/>
                </IconButton>
              </div>
            </div>
            <Divider style={{margin: "12px 0"}}/>
          </DialogTitle>
          <div>
              {/*<RadioGroup*/}
              {/*  aria-labelledby="demo-radio-buttons-group-label"*/}
              {/*  defaultValue="1"*/}
              {/*  value={timeValue}*/}
              {/*  onChange={handleRadioChange}*/}
              {/*  name="radio-buttons-group">*/}
                <Grid spacing={2} container>
                  <Grid item lg={12} md={12} sm={12}>
                    <div className="d-flex">
                      <Typography className="mb-0 mr-1" style={{marginTop: "6px"}}>Message is sent</Typography>
                      <div className="d-flex align-items-center" style={{width: "60px"}}>
                        <Input style={{width: "60px"}} value={afterValue} onChange={handleTimeChange}/>
                      </div>
                      <Typography
                        className="d-flex align-items-center mb-0 ml-1">days after previous</Typography>
                    </div>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} className="pt-1">
                    <div>
                      <Typography className="mb-0">Set Time</Typography>
                      <div className="d-flex">
                        {/*<DatePicker className="ml-2" disabled={timeValue != 2} value={dateValue} onChange={handleDateChange}/>*/}
                        <TimePicker className="mx-1" value={hourValue} onChange={handleHourChange}/>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} className="pt-1">
                    <div>
                      <Typography className="mb-0">Activation Upon</Typography>
                      {/*<FormControlLabel value="3" label="Activation Upon" />*/}
                      <div
                        className="ml-2 mb-1"
                        style={{
                          height: "3em",
                          borderRadius: "0.4em",
                          border: "1px solid #b8c2cc",
                        }}>
                        <Select
                          type="select"
                          style={{ padding: "10px !imporant", height: "100%" }}
                          fullWidth
                          variant={"outlined"}
                          name={"ActivationUpon"}
                          label="Select Option"
                          defaultValue={ActivationUpon}
                          onChange={handlechangeActivationUpon}
                        >
                          <MenuItem value="System Entry">System Entry</MenuItem>
                          <MenuItem value="Criteria Met">Criteria Met</MenuItem>
                        </Select>
                      </div>
                      {
                        ActivationUpon === "System Entry" &&
                        <div className="ml-2">
                          <TimePicker style={{width: "100%"}}/>
                        </div>
                      }
                      {
                        ActivationUpon === "Criteria Met" &&
                        <div className="ml-2">
                          <TimePicker
                            style={{
                              width: "100%",
                            }}/>
                          <div className="d-flex mt-1">
                            <div>
                              <div className="d-flex">
                                <Typography
                                  className="d-flex align-items-center mb-0 mr-1">Message is sent</Typography>
                                <div className="d-flex align-items-center" style={{width: "60px"}}>
                                  <Input style={{width: "60px"}}/>
                                </div>
                                <Typography
                                  className="d-flex align-items-center mb-0 ml-1">days after previous</Typography>
                              </div>
                              <div className="d-flex">
                                <Typography
                                  className="d-flex align-items-center mb-0 mr-1">Message is sent</Typography>
                                <div className="d-flex align-items-center" style={{width: "60px"}}>
                                  <Input style={{width: "60px"}}/>
                                </div>
                                <Typography
                                  className="d-flex align-items-center mb-0 ml-1">days before previous</Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </Grid>
                </Grid>
              {/*</RadioGroup>*/}

              {/*<Grid item lg={7} md={7} sm={7}>*/}
              {/*  <div className="d-flex">*/}
              {/*    <div className="d-flex align-items-center" style={{width: "60px"}}>*/}
              {/*      <Input style={{width: "60px"}}/>*/}
              {/*    </div>*/}
              {/*    <Typography*/}
              {/*      className="d-flex align-items-center mb-0 ml-1"*/}
              {/*    >days after previous</Typography>*/}
              {/*  </div>*/}
              {/*</Grid>*/}
          </div>

          <div className='d-flex justify-content-end mt-1'>
            <Button className='mr-1' onClick={() => {
              setopen(!open)
            }}>
              Cancel
            </Button>
            <Button className='primary' onClick={handleSubmit}>
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
