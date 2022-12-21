import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd';
import { DialogTitle, Dialog, DialogContent, FormLabel, FormGroup, Switch, DialogActions } from '@material-ui/core';
import { Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import Htmleditor from './Htmleditor';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ADD_INVOICE } from '../../../../../redux/actions/mymoney';
import { connect, useDispatch } from 'react-redux';
import { LIST_ALL_MEMBERS } from '../../../../../redux/actions/newstudent';
import { CustomInput } from 'reactstrap';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

const AddnewInvoice = ({ members }) => {
  const [open, setOpen] = useState(false)
  const [isaddittional, setisaddittional] = useState(false)
  const [Notes, setNotes] = React.useState(
    EditorState.createEmpty()
  );
  const [termsconditions, setermsconditions] = React.useState(
    EditorState.createEmpty()
  );

  const [state, setState] = useState({})
  const disptach = useDispatch()
  const handlestate = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })
  }
  const handlechnage = (e) => {
    const { name, value } = e.target
    setState({
      ...state, [name]: value
    })

  }
  const handlesubmit = async (e) => {
    const notes = await draftToHtml(convertToRaw(Notes.getCurrentContent()))
    const Terms = await draftToHtml(convertToRaw(termsconditions.getCurrentContent()))
    let payload = await {
      "clientId": state?.clientId,
      "project": state?.project,
      "invoice_date": state?.invoice_date,
      "due_date": state?.due_date,
      "category": state?.category,
      "terms_and_conditions": Terms,
      "tags": state?.tags,
      "notes": notes,
    }
    const res = await disptach(ADD_INVOICE(payload))
    if (res) {
      setOpen(false)
    }
  }
  useEffect(() => {
    disptach(LIST_ALL_MEMBERS())
  }, [])

  return (
    <div
    >
      <Button
        onClick={() => {
          setOpen(!open)
        }}
        className="primary ml-1"
      >
        + New
      </Button>
      <Dialog open={open}
        maxWidth="lg"
      >
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent
          style={{
            width: '600px',
            padding: '1em'
          }}>
          <div>
            <FormGroup className='m-1'>
              <FormLabel className='mb-1'>Client*</FormLabel>
              <CustomInput
                type='select'
                className='inputstyle'
                name="clientId"
                onChange={handlestate}
                value={state?.clientId}
                required
              >
                {members?.data?.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>{`${item?.firstName || "No Name"} ${item?.lastName || "No Name"}`}</option>
                  )
                })}
              </CustomInput>
            </FormGroup>
            <FormGroup className='m-1'>
              <FormLabel className='mb-1'>Type</FormLabel>
              <CustomInput
                onChange={handlestate}
                value={state?.project}
                type='select'
                name="project"
                required
                style={{
                  widht: '500px'
                }}
              >
                <option value="Active Student">Active Member</option>
                <option value="Active Trial">Active Trial</option>
                <option value="Leads">Leads</option>
                <option value="Former Student">Former Member</option>
                <option value="Former Trial">Former Trial</option>
              </CustomInput>
            </FormGroup>
            <FormGroup className='m-1'>
              <FormLabel className="mb-1">Invoice Date*</FormLabel>
              <Input
                type="date"
                value={state?.invoice_date}
                onChange={handlechnage}
                name="invoice_date"
                required
                style={{
                  widht: '500px'
                }} />
            </FormGroup>
            <FormGroup className='m-1'>
              <FormLabel className="mb-1">Due Date*</FormLabel>
              <Input
                type='date'
                name="due_date"
                value={state?.due_date}
                required
                onChange={handlechnage}
                style={{
                  widht: '500px'
                }} />
            </FormGroup>
            <div className='d-flex justify-content-between m-1'>
              <Typography className='align-items-center mb-1'>Additional Information</Typography>
              <div>
                <Switch onChange={() => { setisaddittional(!isaddittional) }} />
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-center border m-1'>
              <div className='d-flex'>
                <LoopIcon />
                <Typography
                  className='mb-0'>Recurring Invoice Option are available after an invoice has been created</Typography>
              </div>
            </div>
            {
              isaddittional && <div>
                <FormGroup>
                  <FormLabel className="mb-1">Tags</FormLabel>
                  <Input
                    name="tags"
                    onChange={handlechnage}
                    value={state?.tags}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel className="mb-1">Notes</FormLabel>
                  <Htmleditor data={Notes} handlechnageeditor={setNotes} />
                </FormGroup>
                <FormGroup>
                  <FormLabel className="mb-1">Terms and conditions</FormLabel>
                  <Htmleditor data={termsconditions} handlechnageeditor={setermsconditions} />
                </FormGroup>
              </div>
            }
          </div>
          <DialogActions>
            <Button
            >Close</Button>
            <Button
              type='submit'
              className="primary ml-1"
              onClick={handlesubmit}
            >Submit</Button>
          </DialogActions>
        </DialogContent>
      </ Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    members: state.member.list_member,
  }
}
export default connect(mapStateToProps)(AddnewInvoice)