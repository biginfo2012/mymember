import {
  Button, Dialog,
  Typography,
  DialogContent, DialogTitle,
  IconButton,
  FormControlLabel, FormGroup,
  Checkbox,
  Grid,
  Select,
  MenuItem,
} from '@mui/material'
import { DatePicker, Divider, Input, TimePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { X } from 'react-feather'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const Scheduled = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setopen] = useState(false)
  const [ActivationUpon, setActivationUpon] = useState('')

  const handlechangeActivationUpon = (e) => {
    setActivationUpon(e.target.value)
  }
  return (
    <div>
      <Typography />
      <Button className='scadule w-100'
        onClick={() => {
          setopen(!open)
        }}
      >
        Scheduled {moment(selectedDate).format('lll')} <CalendarMonthIcon/>
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
      >   <DialogContent className='m-1'>
          <DialogTitle className='m-0 p-0'>
            <div

              className='d-flex justify-content-between'>
              <div>
                Automation Settings
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    setopen(!open)
                  }}
                  className='p-0'
                >
                  <X />
                </IconButton>
              </div>
            </div>
            <Divider />
          </DialogTitle>
          <div

          >
            <Grid spacing={2} container>
              <Grid item lg={6} md={6} sm={6}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Message is sent" />
                </FormGroup>
              </Grid>
              <Grid item lg={6} md={6} sm={6}
              >
                <div className='d-flex'>
                  <div className='d-flex align-items-center'
                    style={{
                      widht: '20px',
                      height: '20px',
                    }}>
                    <Input
                      style={{
                        width: "20px",
                        height: '20px',

                      }} />
                  </div>
                  <Typography
                    className='d-flex align-items-center mb-0 ml-1'
                  >days after previous</Typography>
                </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12}
              >
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Set Date & Time" />
                  </FormGroup>
                  <div className='d-flex'>
                    <DatePicker className='m-1' />
                    <TimePicker className='m-1' />
                  </div>
                </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12}
              >
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Activation Upon" />
                  </FormGroup>
                  <div
                    style={{
                      height: "3em",
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                      margin: '1em'
                    }}

                  >
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
                    <div>
                      <TimePicker />
                    </div>
                  }
                  {
                    ActivationUpon === "Criteria Met" &&
                    <div>
                      <TimePicker
                        style={{
                          widht: '100px'
                        }}
                      />
                      <div className='d-flex justify-content-center'>
                        <div >
                          <div className='d-flex'>
                            <Typography
                              className='d-flex align-items-center mb-0 mr-1'
                            >Message is sent</Typography>
                            <div className='d-flex align-items-center'
                              style={{
                                widht: '20px',
                                height: '20px',
                              }}>
                              <Input
                                style={{
                                  width: "20px",
                                  height: '20px',

                                }} />
                            </div>
                            <Typography
                              className='d-flex align-items-center mb-0 ml-1'
                            >days after previous</Typography>
                          </div>
                          <div className='d-flex'>
                            <Typography
                              className='d-flex align-items-center mb-0 mr-1'
                            >Message is sent</Typography>
                            <div className='d-flex align-items-center'
                              style={{
                                widht: '20px',
                                height: '20px',
                              }}>
                              <Input
                                style={{
                                  width: "20px",
                                  height: '20px',

                                }} />
                            </div>
                            <Typography
                              className='d-flex align-items-center mb-0 ml-1'
                            >days before previous</Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
