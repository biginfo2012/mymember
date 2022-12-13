import React from 'react'
import { Button, CustomInput, Input } from 'reactstrap'
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Grid, Select, MenuItem, FormControl, Switch } from '@mui/material';

const Createtask = () => {
  const [open, setopen] = useState(false)
  const toggleDrawer = (open) => {
    setopen(!open)
  }
  return (
    <div className='w-100 d-flex justify-content-end'>
      <Button
        color="primary"
        className="text-nowrap mb-1"
        onClick={() => { setopen(!open) }}
      >Add Task</Button>
      <Drawer
        PaperProps={{
          elevation: 0,
          style: {
            width: "30%",
          },
        }} anchor="right"
        open={open}
        onClose={() => { toggleDrawer(false) }}
      >
        <div className='p-1'>
          <div>
          <h2 style={{ color: "#0184FF" }}> Create New Task </h2>
          </div>
          <Grid spacing={2} container className='p-1'>
            <Grid item sm={12} md={12} lg={12}>
              <label style={{ fontSize: "15px" }}> Task Name</label>
              <Input
                name="name"
                placeholder="Task name"
                required
              />
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: "15px" }}>Task Type</label>
              <FormControl required fullWidth>
                <Select
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    background: "none",
                    height: "40px",
                    margin: "0",
                    padding: "10px",
                  }}
                  inputprops={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  labelId="priority-select-required-label"
                  id="priority-select-required"
                  name="task_type"
                >
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="One Time">One Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: "15px" }}>Assignee</label>
              <FormControl required fullWidth>
                <CustomInput
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    background: "none",
                    height: "40px",
                    margin: "0",
                    // padding: "10px",
                  }}
                  inputprops={{
                    disableUnderline: true,
                  }}
                  type="select"
                  id="assign"
                  name="assign"
                >
                </CustomInput>
              </FormControl>
            </Grid>
          </Grid>
          <div className="task-body2 p-1 my-2">
            <Grid spacing={2} container>
              <Grid item sm={12} md={12} lg={12}>
                <div>
                  <p>Select one task completion method below.</p>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      name="isproof"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0">Upload an image.</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      name="isRating"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0"> Select rating</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      name="isEnterData"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0">Enter Data</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      name="isYesOrNo"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0">Yes or No</p>
                  </div>
                  <p
                    className="mb-0 ml-1"
                    style={{ fontSize: 10, color: "red" }}
                  >
                    Please select a Task completion method.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="d-flex justify-content-end align-items-center mt-2">
            <Button
              className="mr-50"
              style={{
                color: "#6b6b6b",
                height: 40,
                borderRadius: "4px",
                width: "100px",
                border: "1px solid #b8c2cc",
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
            >
              <span>Save</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Createtask




