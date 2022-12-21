import { Card, Button } from '@mui/material'
import { Table, Typography } from 'antd'
import React, { useEffect, useState } from "react"
import TextsmsIcon from '@mui/icons-material/Textsms'
import MailIcon from '@mui/icons-material/Mail'
import Addautmaion from './settings/Addautmaion'
import { DELETE_AUTOMATION, GET_AUTOMATIONS } from "../../../../redux/actions/form-builder";
import { useDispatch } from "react-redux"
import moment from "moment"
import { Edit, Trash } from "react-feather"
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import { toast } from "react-toastify";

const Automations = (props) => {
  const formId = props.formId
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_, item) => <div>
        {item?.type != 1 ?  <TextsmsIcon style={{ color: '#AAAAAA' }} /> :  <MailIcon style={{ color: '#AAAAAA' }} />}
      </div>,
    },
    {
      title: 'From',
      dataIndex: 'from',
      render: (_, item) => <Typography>{item?.from}</Typography>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      render: (_, item) => <Typography>{item?.subject}</Typography>,
    },
    // {
    //   title: 'Smart List',
    //   dataIndex: 'Smartlist',
    //   render: (_, item) => <Typography>{item?.Smartlist}</Typography>,
    // },
    // {
    //   title: 'Sub Category',
    //   dataIndex: 'subCategory',
    //   render: (_, item) => <Typography>{item?.subCategory}</Typography>,
    // },
    {
      title: 'Activation Date',
      dataIndex: 'date',
      render: (_, item) => <Typography>{moment(item?.date).format("lll")}</Typography>,
    },
    {
      title: 'Action',
      render: (_, item) =>
        item ? (
          <div>
            <Button onClick={() => editAutomation(item)}><Edit size={16}/>Edit</Button>
            <Button onClick={() => deleteConfirm(item?._id)}> <Trash size={16} />
              Remove</Button>
          </div>
        ) : ""
    },
  ]

  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false)
  const [selected, setSelected] = useState("")
  const [editSelected, setEditSelected] = useState(false)
  const [editSelectedItem, setEditSelectedItem] = useState({})
  const loadData = async (formId) => {
    let res = await dispatch(GET_AUTOMATIONS(formId))
    setData(res)
  };
  useEffect(() => {
    if(formId) {
      loadData(formId)
    }
  }, [formId])

  //show delete confirm dialog
  const deleteConfirm = (id) => {
    if(id == null || id == undefined || id == "") return
    setDeleteConfirmDialog(true)
    setSelected(id)
  }
  const deleteAutomation = async(id) => {
    let res = await dispatch(DELETE_AUTOMATION(id))
    showToast(res, "Delete Automation Successfully")
    loadData(formId)
  }

  const editAutomation = (item) => {
    setEditSelected(true)
    setEditSelectedItem(item)
  }

  const handleCallback = () =>{
    setEditSelected(false)
    loadData(formId);
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
      <div className='d-flex justify-content-between mb-1'>
        <h4>
          Automations
        </h4>
        <div className='d-flex justify-content-end'>
          <Addautmaion formId={props.formId} editSelected={editSelected} editSelectedItem={editSelectedItem} parentCallback={handleCallback}/>
        </div>
      </div>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={deleteConfirmDialog}
        title="Are you sure?"
        onConfirm={() => {
          deleteAutomation(selected);
          setDeleteConfirmDialog(false)
        }}
        onCancel={() => {
          setDeleteConfirmDialog(!deleteConfirmDialog);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Yes"}
        description="Do you want to Remove this Automation ?"
      />
    </div>
  )
}

export default Automations




// const data = [
//   {
//     subject: "Congratulation on joining our family",
//     Smartlist: "Smart List",
//     subCategory: "Smart List Sub Category",
//     date: "10.1.2022"
//   },
//   {
//     subject: "Congratulation on joining our family",
//     Smartlist: "Smart List",
//     subCategory: "Smart List Sub Category",
//     date: "10.1.2022"
//   },
//   {
//     subject: "Congratulation on joining our family",
//     Smartlist: "Smart List",
//     subCategory: "Smart List Sub Category",
//     date: "10.1.2022"
//   },
//   {
//     subject: "Congratulation on joining our family",
//     Smartlist: "Smart List",
//     subCategory: "Smart List Sub Category",
//     date: "10.1.2022"
//   },
//   {
//     subject: "Congratulation on joining our family",
//     Smartlist: "Smart List",
//     subCategory: "Smart List Sub Category",
//     date: "10.1.2022"
//   },
// ]
