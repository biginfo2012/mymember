import React, { useEffect, useState } from "react";
import moment from "moment"
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import sendEmailSvg from "../../../../../assets/img/svg/send_email.svg"
import sendImageEmailSvg from "../../../../../assets/img/svg/send_image_email.svg"
import sendImageTextSvg from "../../../../../assets/img/svg/send_image_text.svg"
import sendPdfEmailSvg from "../../../../../assets/img/svg/send_pdf_email.svg"
import sendPdfTextSvg from "../../../../../assets/img/svg/send_pdf_text.svg"
import sendVideoEmailSvg from "../../../../../assets/img/svg/send_video_email.svg"
import sendVideoTextSvg from "../../../../../assets/img/svg/send_video_text.svg"
import { makeStyles } from "@material-ui/styles"
import Switch from "@material-ui/core/Switch"
import { Row, Col } from "reactstrap"
import {
  MAKE_TEMPLATE_AS_ACTIVATE
} from "../../../../../redux/actions/email"
import { stateFromHTML } from "draft-js-import-html"
import EditorContainer from "./EditorContain";
import { EditorState } from "draft-js";

const useStyles = makeStyles(() => ({
  automationTime: {
    margin: "0",
    fontSize: "11px",
    color: "#f28422",
    display: "block"
  }
}))

export const AutomationIcon = (props) => {
  const classes = useStyles()
  const userId = localStorage.getItem("user_id")
  const { item, index } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(stateFromHTML(item.template))
    )
  })

  const handleActivateChange = (item) => {
    console.log(item)
    let payload = {
      tempId: [item?._id],
      isActive: item?.inActiveUsers.includes(userId),
    }

    MAKE_TEMPLATE_AS_ACTIVATE(
      "/api/email_nurturing",
      payload,
      item?.folderId
    )
    // console.log(item?._id);
    // if (item?._id) {
    //   console.log(item?.isActive);
    // }
  }

  return (
    <div>
      <div className="w-100 p-1 mt-1 text-center" onClick={handleClick('left')}>
        <img src={sendEmailSvg} alt="email" height="45" width="45" style={{marginTop: "5px"}}/>

      </div>
      <div className="w-100 text-center" style={{backgroundColor: "transparent"}}>
        <label className="font-weight-bold" style={{fontSize: "14px", margin: 0}}>New Email</label>
        <label className={classes.automationTime}>
          {index === 0 ? (
            <>Send immediately</>
          ) : item?.days ? (
            <>
              Send {item?.days} days{" "}
              {item?.days_type || "after"} <br /> the
              previus message
            </>
          ) : (
            <>
              Send at{" "}
              {moment(item.sent_date).format(
                "MMM DD, YYYY"
              )}
            </>
          )}
        </label>
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  New Email
                </Typography>
                <span className="flex flex-row justify-content-center">
                {item?.isActive ? "Deactivate template" : "Activate template"}
                </span>
                  <Switch
                    checked={!item?.inActiveUsers.includes(userId)}
                    onChange={() => handleActivateChange(item)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                <Typography color="text.secondary">
                  SUBJECT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.subject}
                </Typography>
                <Typography color="text.secondary">
                  CONTENT
                </Typography>
                <EditorContainer
                  editorState={editorState}
                  setEditorState={setEditorState}
                  style={{width: "100px !important"}}/>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => {
                  setOpen(!open)
                }}>Close</Button>
              </CardActions>
            </Card>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
