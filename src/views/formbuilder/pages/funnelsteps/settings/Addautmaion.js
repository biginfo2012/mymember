import { Button, TextField, DialogContent, Grid, Typography, Select, MenuItem, Dialog, Tab, Box, DialogTitle, IconButton } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { convertToRaw, EditorState } from "draft-js"
import EditorContainer from "./EditorContainer"
import { X } from "react-feather"
import { Divider } from "antd"
import { Scheduled } from "./Scheduled"
import { CREATE_AUTOMATION, UPDATE_AUTOMATION_DATA } from "../../../../../redux/actions/form-builder";
import { useDispatch } from "react-redux"
import moment from "moment"
import draftToHtml from "draftjs-to-html"
import { toast } from "react-toastify"
import { stateFromHTML } from "draft-js-import-html";
import { CustomInput } from "reactstrap";

const Addautmaion = (props) => {
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(new Date())
  //for automation add modal show and close
  const [open, setopen] = useState(false)
  //for editor changing value
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  //for email or text tab
  const [value, setValue] = useState("1")
  //input field for From
  const [from, setFrom] = useState("")
  //input field for Subject
  const [subject, setSubject] = useState("")
  //setting date type
  const [timeValue, setTimeValue] = useState("")
  const [afterValue, setAfterValue] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [hourValue, setHourValue] = useState("")

  const editSelected = props.editSelected
  const editSelectedItem = props.editSelectedItem
  useEffect(() => {
    if(editSelected) {
      console.log(editSelectedItem)
      setopen(true)
      setFrom(editSelectedItem.from)
      setSubject(editSelectedItem.subject)
      setTimeValue(1)
      setSelectedDate(editSelectedItem.date)
      setEditorState(
        EditorState.createWithContent(stateFromHTML(editSelectedItem.content))
      )
      setValue(editSelectedItem.type.toString())
      setDateValue(moment(editSelectedItem.date))
      setHourValue(moment(editSelectedItem.date))
      setAfterValue(editSelectedItem.afterDay)
    }
    else{
      setFrom("")
      setSubject("")
      setTimeValue("")
      setSelectedDate(new Date())
      setEditorState(
        EditorState.createEmpty()
      )
      setValue("1")
      setDateValue("")
      setHourValue("")
      setAfterValue("")
    }
  }, [editSelected])

  useEffect(() => {
    let bussinessEmail = getLogedInUser()?.email;
    setFromList([bussinessEmail]);
  }, []);

  //tab change event
  const handleChange = (event, newValue) => {setValue(newValue)}

  //input field From changing event
  const [fromList, setFromList] = useState([]);
  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  }
  const handleFromChange = (e) => {
    setFrom(e.target.value)
  }

  const handleSubjectChange = (event) => {
    setSubject(event.target.value)
  }

  //To Receive parameter value from Setting modal
  const handleCallback = (timeValue, afterValue, dateValue, hourValue) =>{
    setTimeValue(timeValue)
    setAfterValue(afterValue)
    setDateValue(dateValue)
    setHourValue(hourValue)
  }

  //add automation
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(props.formId == undefined || props.formId == null || timeValue == "" || from == ""){
      return
    }
    let date
    if(timeValue == 1){
      date = moment().add(afterValue, 'd').format('YYYY-MM-DD') + " " + hourValue.format("HH:mm") + ":00"
    }
    else if(timeValue == 2){
      date = dateValue.format('YYYY-MM-DD') + " " + hourValue.format("HH:mm") + ":00"
    }

    const content = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )

    if(content == "") return

    if(!editSelected){
      let payload = {
        "type": value,
        "from": from,
        "subject": value == 1 ? subject : "",
        "content": content,
        "date": date,
        "formId": props.formId,
        "afterDay": afterValue,
        "time": hourValue.format("HH:mm")
      }

      console.log(payload)

      const res = await dispatch(CREATE_AUTOMATION(payload))
      showToast(res, "Create Automation Successfully")
    }
    else{
      let data = {
        "type": value,
        "from": from,
        "subject": value == 1 ? subject : "",
        "content": content,
        "date": date,
        "formId": props.formId,
        "afterDay": afterValue,
        "time": hourValue.format("HH:mm")
      }
      console.log(data)
      const res = await dispatch(UPDATE_AUTOMATION_DATA(editSelectedItem._id, data))
      showToast(res, "Update Automation Successfully")
    }
    closeDlg()
  }

  const closeDlg = () => {
    setopen(false)
    props.parentCallback()
  }

  const showToast = (res, msg) => {
    console.log(res)
    let message = res.data.msg
    if(msg) {
      message = msg
    }
    if(res.data.success) {
      toast.success(message, toastCSS())
    } else {
      toast.error(message, toastCSS())
    }
  }
  const toastCSS = () => {
    return {
      position: "top-center",
      autoClose: 3000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  }
  return (
    <div>
      <Button className="primary"
              onClick={() => {
                setopen(!open)
              }}>
        + Add Automation
      </Button>
      <Dialog
        open={open}
        className="automation">
        <DialogContent
          className="m-0">
          <DialogTitle className="m-0 p-0">
            <div className="d-flex justify-content-between">
              <div>
                {editSelected ? "Update Automation" : "Create New Automation"}
              </div>
              <div>
                <IconButton
                  onClick={closeDlg}
                  className="p-0">
                  <X />
                </IconButton>
              </div>
            </div>
            <Divider style={{ margin: "12px 0" }} />
          </DialogTitle>
          <TabContext value={value}>
            <Box>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="Email" value="1" />
                <Tab label="Text" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" className="pb-0 px-1">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={6} sm={6} md={6}>
                    <div>
                      <Typography className="mb-0">From</Typography>
                      {fromList?.length > 0 && (
                        <Select
                          style={{
                            height: "2.8em",
                            width: "100%",
                            border: "1px solid #b8c2cc",
                          }}
                          variant="outlined"
                          name="from"
                          onChange={handleFromChange}
                          value={from}
                        >
                          {fromList?.map((itemEmail, i) => {
                            return (
                              <MenuItem value={itemEmail} key={i}>
                                {itemEmail}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                      {/*<TextField*/}
                      {/*  style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}*/}
                      {/*  variant={"outlined"}*/}
                      {/*  size="small"*/}
                      {/*  type="textarea"*/}
                      {/*  placeholder=""*/}
                      {/*  className="w-100"*/}
                      {/*  value={from}*/}
                      {/*  onChange={handleFromChange}*/}
                      {/*/>*/}
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <div>
                      <Typography className="mb-0">Subject</Typography>
                      <TextField
                        style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
                        variant={"outlined"}
                        size="small"
                        type="textarea"
                        placeholder=""
                        className="w-100"
                        value={subject}
                        onChange={handleSubjectChange}
                      />
                    </div>
                  </Grid>
                  {/*<Grid item lg={6} sm={6} md={6}>*/}
                  {/*  <div>*/}
                  {/*    <Typography className='mb-0'>To</Typography>*/}
                  {/*    <div*/}
                  {/*      style={{*/}
                  {/*        height: "3em",*/}
                  {/*        borderRadius: "0.4em",*/}
                  {/*        border: "1px solid #b8c2cc",*/}
                  {/*      }}*/}
                  {/*    >*/}
                  {/*      <Select*/}
                  {/*        type="select"*/}
                  {/*        style={{ padding: "10px !imporant", height: "100%" }}*/}
                  {/*        fullWidth*/}
                  {/*        variant={"outlined"}*/}
                  {/*        name={"gender"}*/}
                  {/*        placeholder="Sub Cetogary"*/}
                  {/*      >*/}
                  {/*        <MenuItem value="Male">smartlist 1</MenuItem>*/}
                  {/*      </Select>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</Grid>*/}
                  {/*<Grid item lg={6} sm={6} md={6}>*/}
                  {/*  <div>*/}
                  {/*    <Typography className='mb-0'>Sub Category</Typography>*/}
                  {/*    <TextField*/}
                  {/*      style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}*/}
                  {/*      variant={"outlined"}*/}
                  {/*      size="small"*/}
                  {/*      type="textarea"*/}
                  {/*      placeholder=""*/}
                  {/*      className='w-100'*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</Grid>*/}
                  <Grid item lg={6} sm={6} md={6}>
                    <div>
                      <Typography className="mb-0">Activation Upon</Typography>
                      <div
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
                          name={"gender"}
                          defaultValue={"entry"}
                          placeholder="Activation Upon">
                          <MenuItem value="entry">System Entry</MenuItem>
                          <MenuItem value="met">Criteria Met</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <div className="m-1">
                      <Scheduled parentCallback={handleCallback} selectedDate={selectedDate} afterValue={afterValue} hourValue={hourValue}/>
                    </div>
                  </Grid>
                </Grid>
                <label>HTML Body</label>
                <EditorContainer
                  editorState={editorState}
                  setEditorState={setEditorState} />
                <br />
                <div className="d-flex justify-content-end">
                  <Button className="primary" type="submit">
                    {editSelected ? "Update" : "Add"} Automation
                  </Button>
                </div>
              </form>
            </TabPanel>
            <TabPanel value="2" className="pb-0 px-1">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={12} sm={12} md={12}>
                    <div>
                      <Typography className="mb-0">From</Typography>
                      {fromList?.length > 0 && (
                        <Select
                          style={{
                            height: "2.8em",
                            width: "100%",
                            border: "1px solid #b8c2cc",
                          }}
                          variant="outlined"
                          name="from"
                          onChange={handleFromChange}
                          value={from}
                        >
                          {fromList?.map((itemEmail, i) => {
                            return (
                              <MenuItem value={itemEmail} key={i}>
                                {itemEmail}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                      {/*<TextField*/}
                      {/*  style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}*/}
                      {/*  variant={"outlined"}*/}
                      {/*  size="small"*/}
                      {/*  type="textarea"*/}
                      {/*  placeholder=""*/}
                      {/*  className="w-100"*/}
                      {/*  value={from}*/}
                      {/*  onChange={handleFromChange}*/}
                      {/*/>*/}
                    </div>
                  </Grid>
                  {/*<Grid item lg={6} sm={6} md={6}>*/}
                  {/*  <div>*/}
                  {/*    <Typography className='mb-0'>Subject</Typography>*/}
                  {/*    <TextField*/}
                  {/*      style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}*/}
                  {/*      variant={"outlined"}*/}
                  {/*      size="small"*/}
                  {/*      type="textarea"*/}
                  {/*      placeholder=""*/}
                  {/*      className='w-100'*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</Grid>*/}
                  {/*<Grid item lg={6} sm={6} md={6}>*/}
                  {/*  <div>*/}
                  {/*    <Typography className='mb-0'>To</Typography>*/}
                  {/*    <div*/}
                  {/*      style={{*/}
                  {/*        height: "3em",*/}
                  {/*        borderRadius: "0.4em",*/}
                  {/*        border: "1px solid #b8c2cc",*/}
                  {/*      }}*/}
                  {/*    >*/}
                  {/*      <Select*/}
                  {/*        type="select"*/}
                  {/*        style={{ padding: "10px !imporant", height: "100%" }}*/}
                  {/*        fullWidth*/}
                  {/*        variant={"outlined"}*/}
                  {/*        name={"gender"}*/}
                  {/*        placeholder="Sub Cetogary"*/}
                  {/*      >*/}
                  {/*        <MenuItem value="Male">smartlist 1</MenuItem>*/}
                  {/*      </Select>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</Grid>*/}
                  {/*<Grid item lg={6} sm={6} md={6}>*/}
                  {/*  <div>*/}
                  {/*    <Typography className='mb-0'>Sub Category</Typography>*/}
                  {/*    <TextField*/}
                  {/*      style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}*/}
                  {/*      variant={"outlined"}*/}
                  {/*      size="small"*/}
                  {/*      type="textarea"*/}
                  {/*      placeholder=""*/}
                  {/*      className='w-100'*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</Grid>*/}
                  <Grid item lg={6} sm={6} md={6}>
                    <div>
                      <Typography className="mb-0">Activation Upon</Typography>
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
                          placeholder="Activation Upon"
                          defaultValue={"entry"}
                        >
                          <MenuItem value="entry" selected>System Entry</MenuItem>
                          <MenuItem value="met">Criteria Met</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={6} md={6}>
                    <div className="m-1">
                      <Scheduled parentCallback={handleCallback} selectedDate={selectedDate} afterValue={afterValue} hourValue={hourValue}/>
                    </div>
                  </Grid>
                </Grid>
                <label>Text</label>
                <EditorContainer
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
                <br />
                <div className="d-flex justify-content-end">
                  <Button className="primary" type="submit">
                    {editSelected ? "Update" : "Add"} Automation
                  </Button>
                </div>
              </form>
            </TabPanel>
          </TabContext>
          {/*<div className="d-flex justify-content-center mb-2">*/}
          {/*  <ButtonGroup>*/}
          {/*    <button*/}
          {/*      type="button"*/}
          {/*      className={` ${slected === "Email"*/}
          {/*        ? `btn btn-primary `*/}
          {/*        : "btn btn-outline-primary"*/}
          {/*        }`}*/}
          {/*      onClick={() => { setselected("Email") }}*/}
          {/*    >*/}
          {/*      Email*/}
          {/*    </button>*/}
          {/*    <button*/}
          {/*      type="button"*/}
          {/*      className={`${slected === "Text"*/}
          {/*        ? `btn btn-primary `*/}
          {/*        : "btn btn-outline-primary "*/}
          {/*        }`}*/}
          {/*      onClick={() => { setselected("Text") }}*/}
          {/*    >*/}
          {/*      Text*/}
          {/*    </button>*/}
          {/*  </ButtonGroup>*/}
          {/*</div>*/}

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Addautmaion
