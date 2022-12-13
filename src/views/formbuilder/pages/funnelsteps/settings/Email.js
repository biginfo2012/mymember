import {
  Button,
  TextField, DialogContent,
  Grid, Typography,
  Select, MenuItem,
  Dialog,
  DialogTitle,
  IconButton
} from '@mui/material';
import React, { useState } from 'react'
import { ButtonGroup } from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, } from "draft-js";
import EditorContainer from './EditorContainer';
import { X } from 'react-feather';
import { Divider } from 'antd';
import { Scheduled } from './Scheduled';

const AddEmail = () => {
  const [slected, setselected] = useState("Email")
  const [open, setopen] = useState(false)
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  return (
    <div>
      <Button className='primary ml-1'
              onClick={() => { setopen(!open) }}>
        + Add New Email
      </Button>
      <Dialog
        open={open}
        className="automation"
      >
        <DialogContent
          className='m-1'
        >
          <DialogTitle className='m-0 p-0'>
            <div className='d-flex justify-content-between'>
              <div>
                Create New Automation
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
          <div className="d-flex justify-content-center mb-2">
            <ButtonGroup>
              <button
                type="button"
                className={` ${slected === "Email"
                  ? `btn btn-primary `
                  : "btn btn-outline-primary"
                }`}
                onClick={() => { setselected("Email") }}
              >
                Email
              </button>
              <button
                type="button"
                className={`${slected === "Text"
                  ? `btn btn-primary `
                  : "btn btn-outline-primary "
                }`}
                onClick={() => { setselected("Text") }}
              >
                Text
              </button>
            </ButtonGroup>
          </div>
          <div>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} md={6}>
                <div>
                  <Typography className='mb-0'>From</Typography>
                  <TextField
                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                    variant={"outlined"}
                    size="small"
                    type="textarea"
                    placeholder=""
                    className='w-100'
                  />
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6}>
                <div>
                  <Typography className='mb-0'>Subject</Typography>
                  <TextField
                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                    variant={"outlined"}
                    size="small"
                    type="textarea"
                    placeholder=""
                    className='w-100'
                  />
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6}>
                <div>
                  <Typography className='mb-0'>To</Typography>
                  <div
                    style={{
                      height: "3em",
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                    }}
                  >
                    <Select
                      type="select"
                      style={{ padding: "10px !imporant", height: "100%" }}
                      fullWidth
                      variant={"outlined"}
                      name={"gender"}
                      placeholder="Sub Cetogary"
                    >
                      <MenuItem value="Male">smartlist 1</MenuItem>
                    </Select>
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6}>
                <div>
                  <Typography className='mb-0'>Sub Category</Typography>
                  <TextField
                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                    variant={"outlined"}
                    size="small"
                    type="textarea"
                    placeholder=""
                    className='w-100'
                  />
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6}>
                <div>
                  <Typography className='mb-0'>Activation Upon</Typography>
                  <div
                    style={{
                      height: "3em",
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                    }}
                  >
                    <Select
                      type="select"
                      style={{ padding: "10px !imporant", height: "100%" }}
                      fullWidth
                      variant={"outlined"}
                      name={"gender"}
                      placeholder="Sub Cetogary"
                    >
                      <MenuItem value="Male">smartlist 1</MenuItem>
                    </Select>
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6}>
                <div className='m-1'>
                  <Scheduled />
                </div>
              </Grid>
            </Grid>
            <br />
            <EditorContainer
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <br />
            <div className='d-flex justify-content-end'>
              <Button className='primary'>
                Add Automation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddEmail
