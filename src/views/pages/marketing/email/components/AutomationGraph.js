import React, { useState, useEffect } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import AddIcon from '@mui/icons-material/Add'
import CropFreeIcon from '@mui/icons-material/CropFree'
import RemoveIcon from '@mui/icons-material/Remove'
import AutomationSequence from "./AutomationSequence"
import { connect } from "react-redux"
import {
  DELETE_CATEGORY_EMAIL, DELETE_MULTIPLE_TEMPLATE, DELETE_SUB_FOLDER_EMAIL, GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST, GET_CATEGORIES_EMAIL, GET_SCHEDULE_MAILS, GET_SENT_EMAILS, UPDATE_EMAIL_CATEGORY
} from "../../../../../redux/actions/email"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  ActionCount: {
    position: "absolute",
    left: "20px",
    top: "20px",
    textAlign: "center"
  },
  ContentAction: {
    border: "1px solid #1300ff",
    borderRadius: "50%",
    width: "60px",
    height: "60px"
  },
  ZoomBtnWrapper: {
    position: "absolute",
    left: "10px",
    bottom: "10px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #dee2e6",
    borderRadius: "5px"
  },
  VCenter: {
    display: "flex",
    alignItems: "center"
  }
}))

const AutomationGraph = (props) => {
  const classes = useStyles()
  const [currentPosition, setCurrentPosition] = useState({
    xRate: 0,
    yRate: 0
  })
  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY })
  }

  const [selectedId, setSelectedId] = useState([])
  const [mailsTODisplay, setMailsTODisplay] = useState([])
  const [viewTemplate, setViewTemplate] = useState(null)
  const [subFolderActiveName, setSubFolderActiveName] = useState(null)
  const { allScheduleMails } = props
  const { setEditOrAddOrListTemplate } = props

  const handleselecteOne = (e, item) => {
    let { value } = e.target
    if (selectedId?.includes(value)) {
      let IdAfterRemove = selectedId?.filter((id) => id !== value)
      setSelectedId(IdAfterRemove)
    } else {
      setSelectedId((preStuff) => [...preStuff, value])
    }
  }

  const handleView = (template) => {
    setViewTemplate(template)
  }

  useEffect(() => {
    setMailsTODisplay(allScheduleMails?.data?.template)
  }, [allScheduleMails])

  return (
    <div className="container overflow-hidden">
      <div className={classes.ZoomBtnWrapper}>
        <button className="px-1 justify-content-center btn btn-white font-weight-bold"><AddIcon/></button>
        <button className="px-1 justify-content-center btn btn-white font-weight-bold"><RemoveIcon/></button>
        <button className="px-1 justify-content-center btn btn-white font-weight-bold"><CropFreeIcon/></button>
      </div>
      <div className={classes.ActionCount}><label className="text-uppercase">Actions</label>
        <div className={classes.ContentAction}><p style={{fontSize: "24px", padding: "19px 0"}} className="font-weight-bold">{mailsTODisplay.length}</p></div>
      </div>
      <Draggable
        position={{
          x: currentPosition.xRate,
          y: currentPosition.yRate
        }}
        onDrag={onDrag}
        cancel="strong"
      >
        <div className="w-100 cursor-move d-flex" style={{minHeight: "80vh", height: "fit-content", alignItems: "center"}}>
          <strong style={{width: "fit-content", margin: "auto", height: "fit-content !important"}} className="d-flex">
            <AutomationSequence
              handleselecteOne={handleselecteOne}
              selectedId={selectedId}
              handleView={handleView}
              subFolderActiveName={ subFolderActiveName || "" }
              setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
              elements={mailsTODisplay}
            />
          </strong>
        </div>
      </Draggable>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail,
    allScheduleMails: state.EmailMarketing.allScheduleMails,
    allTypeOfScheduleEmails: state.EmailMarketing.allScheduleEmails, // get all type of schedule emails
    allSentEmails: state.EmailMarketing.allSentEmails,
  }
}

export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  DELETE_MULTIPLE_TEMPLATE,
  UPDATE_EMAIL_CATEGORY,
  GET_SENT_EMAILS,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST
})(AutomationGraph)
