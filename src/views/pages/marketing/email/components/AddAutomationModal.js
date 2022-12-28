import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { makeStyles, MenuItem, Select } from "@material-ui/core"
import { Row, Col } from "reactstrap"
import { Input, CustomInput, FormGroup } from "reactstrap"
import {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  GET_CATEGORIES_EMAIL,
  UPLAODE_IMAGE,
} from "../../../../../redux/actions/email"
import { Get_User_Info } from "../../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import sendTextSvg from "../../../../../assets/img/svg/send_text.svg"
import sendEmailSvg from "../../../../../assets/img/svg/send_email.svg"
import MainSmartList from "./MainSmartList"
import ActivationUpon from "./ActivationUpon"
import AddMaterial from "./AddMaterial"
//import SaveFolderSelect from "./folderSelect"
import EmailFieldMerge from "./mergeField"
import EditorContainer from "./EditorContainer"
//import ReactEmailTemplater from "./ReactEmailTemplater"
import ConfirmationModal from "../../../../../components/gloabal/confirmation"
import { GET_ALL_TYPE_STUDENT } from "../../../../../redux/actions/member/index"
import "./index.css"
import { convertToRaw, EditorState, Modifier } from "draft-js";
import { stateFromHTML } from "draft-js-import-html"
//import draftToHtml from "draftjs-to-html"
import moment from "moment/moment"
import { toast } from "react-toastify"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { DialogTitle } from "@mui/material"
import SaveFolderSelect from "./folderSelect"
import draftToHtml from "draftjs-to-html";


const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
}

const useStyles = makeStyles(() => ({
  AddImg: {
    width: "36px",
    height: "36px",
    marginRight: "15px",
    objectFit: "contain",
  },
  AddTitle: {
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "19px",
    color: "#101336",
    marginTop: "3px",
    marginBottom: "3px",
  },
  AddDescription: {
    fontWeight: 400,
    fontSize: "14px",
    color: "#6f7086",
    padding: 0,
    margin: 0,
    lineHeight: "19px",
  },
  CardStyle: {
    boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    borderRadius: "0rem",
  },
  inputStyle: {
    marginBottom: "10px",
    borderRadius: "0.4em",
    width: "100%",
    height: "2.8rem",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  sendTem: {
    borderRadius: "8px !important",
    background: "#00a6e1 !important",
    color: "#fff !important",
    fontWeight: "bold !important",
  },
}))

const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data
}

function AddAutomationModal(props) {
  const [openAdd, setOpenAdd] = React.useState(false)
  const classes = useStyles()
  const handleClickOpen = () => {
    setOpenAdd(true)
  }
  const handleClose = () => {
    setOpenAdd(false)
    props.parentCallback()
  }
  const {
    ADD_TEMPLATE_TO_EMAIL,
    UPDATE_TEMPLATE_TO_EMAIL,
    type,
    SEND_EMAIL,
    template,
    userinfo,
    Get_User_Info,
    setViewTemplate,
    getAllSmartList,
  } = props
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false)
  const { setEditOrAddOrListTemplate, FolderList } = props
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  )
  const [date, setDate] = useState({
    sent_date: new Date(),
    sent_time: new Date(),
  })
  const [templatePayload, setTemplatePayload] = useState({
    from: getLoggedInUser()?.email,
    to: [],
    subject: "",
    title: "test",
    template: "",
    repeat_mail: "every month",
    follow_up: "4",
    design: "",
    days_type: "after",
    immediately: true,
    content_type: "",
    html: "",
    isPlaceHolders: false,
  })

  const [MainFolderSelected, setMainFolderSelected] = useState({})
  const [SubFolderSelected, setSubFolderSelected] = useState({})
  const [fileUploaded, setFileUploaded] = useState([])
  const [SelectTypeToSendEmail, setSelectTypeToSendEmail] = useState("smartlist")
  const [smartlistRows, setSmartListRows] = useState([])
  const [smartlistId, setSmartListId] = useState([])

  const handleFieldValue = (e) => {
    let { name, value } = e.target
    if (name === "from") {
      setTemplatePayload({ ...templatePayload, from: getLoggedInUser()?.firstname + " " + value })
    } else
      setTemplatePayload({ ...templatePayload, [name]: value })
  }
  const handleToList = (e) => {
    let { value } = e.target
    templatePayload.to = value.split(",")
    setTemplatePayload({ ...templatePayload })
  }
  const handleSelectMainFolder = (e, item) => {
    setMainFolderSelected(item)
  }
  const handleSelectsubFolder = (e, item) => {
    setSubFolderSelected(item)
  }
  useEffect(() => {

    let bussinessEmail = getLoggedInUser()?.email

    if (bussinessEmail?.length > 0) {
      setTemplatePayload((prevState) => {
        return { ...prevState, from: bussinessEmail }
      })
    }
  }, [])

  useEffect(() => {
    Get_User_Info()
    if (template === null) {
      setEditorState(EditorState.createEmpty())
    }
    setTemplatePayload({
      ...templatePayload,
      isPlaceHolders: templatePayload?.isPlaceHolders,
    })
    if (template) {
      setTemplatePayload(template)
      if (template.template) {
        try {
          setEditorState(
            EditorState.createWithContent(stateFromHTML(template.template)),
          )
        } catch (error) {
        }
      }

      if (template?.smartLists.length > 0) {
        setSelectTypeToSendEmail("smartlist")
        setTemplatePayload((templatePayload) => {
          return { ...templatePayload, smartLists: template.smartLists }
        })
      } else {
        setSelectTypeToSendEmail("toemail")
      }
    }
  }, [template, getAllSmartList, Get_User_Info])

  const AddNewTemplate = async (folderId, send = false) => {
    if (templatePayload?.adminId !== undefined) {
      let payload = {}
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )
      payload = {
        ...templatePayload,
        content,
        html: content,
        content_type: "text",
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD")
        payload.sent_time = moment(date.sent_date).format("HH:mm")
      }

      let formData = new FormData()
      for (let file of fileUploaded) {
        formData.append("attachments", file)
      }
      const update_payload = { ...payload }
      delete payload["smartLists"]
      delete payload["to"]
      delete payload["adminId"]
      delete payload["_id"]
      delete payload["createdAt"]
      delete payload["updatedAt"]
      delete payload["_v"]
      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId))
        update_payload.smartLists = props.getAllSmartlistId
        payload.isPlaceHolders = true
        delete templatePayload["to"]
      } else {
        formData.append("to", JSON.stringify(templatePayload.to))
        delete templatePayload["smartLists"]
      }
      let dataEntries = Object.entries(payload)
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1])
        return v
      })
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData)
        setEditOrAddOrListTemplate("list")
      }
      else {
        if (template) {
          UPDATE_TEMPLATE_TO_EMAIL(
            "/api/email_nurturing",
            formData,
            template?._id,
            template?.folderId,
          )
          setViewTemplate(null)
          setEditOrAddOrListTemplate("list")
        }
        else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss())
            return
          }
          ADD_TEMPLATE_TO_EMAIL(
            `/api/email_nurturing`,
            formData,
            folderId?._id,
          )
          setEditOrAddOrListTemplate("list")
        }
      }
    }
    else {
      let payload = {}
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )
      payload = {
        ...templatePayload,
        content,
        html: content,
        content_type: "text",
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD")
        payload.sent_time = moment(date.sent_date).format("HH:mm")
      }

      let formData = new FormData()
      for (let file of fileUploaded) {
        formData.append("attachments", file)
      }
      const update_payload = { ...payload }
      delete payload["smartLists"]
      delete payload["to"]

      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId))
        payload.isPlaceHolders = true
        update_payload.smartLists = props.getAllSmartlistId
        delete templatePayload["to"]
      } else {
        formData.append("to", JSON.stringify(templatePayload.to))
        delete templatePayload["smartLists"]
      }

      let dataEntries = Object.entries(payload)
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1])
        return v
      })
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData)
        setEditOrAddOrListTemplate("list")
      } else {
        if (template) {
          UPDATE_TEMPLATE_TO_EMAIL(
            "/api/email_nurturing",
            formData,
            template?._id,
            template?.folderId,
          )
          setViewTemplate(null)
          setEditOrAddOrListTemplate("list")
        } else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss())
            return
          }
          ADD_TEMPLATE_TO_EMAIL(
            `/api/email_nurturing`,
            formData,
            folderId?._id,
          )
          setEditOrAddOrListTemplate("list")
        }
      }
    }
    props.parentCallback()
  }
  const handleDateChange = (value, keyname) => {
    setDate({
      ...date,
      [keyname]: value,
    })
  }

  const handleSubmit = () => {
    setTemplatePayload({
      ...templatePayload,
      sent_date: date.sent_date,
      sent_time: date.sent_time,
    })
  }
  const SaveTemplate = () => {
    setSweetAlertOpen(true)
  }

  const selectPlaceholder = (placeholder) => {
    setEditorState(insertText(placeholder, editorState))
    setTemplatePayload({ ...templatePayload, isPlaceHolders: true })
  }
  const insertText = (text, editorValue) => {
    const currentContent = editorValue.getCurrentContent()
    const currentSelection = editorValue.getSelection()

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text,
    )

    const newEditorState = EditorState.push(
      editorValue,
      newContent,
      "insert-characters",
    )
    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter(),
    )
  }
  return (
    <div>
      <div className="d-flex" onClick={handleClickOpen}>
        <img src={type == "email" ? sendEmailSvg : sendTextSvg} className={classes.AddImg} />
        <div>
          <div className={classes.AddTitle}>New {type == "email" ? "Email" : "Text"}</div>
          <div
            className={classes.AddDescription}> {type == "email" ? "Create a text message to be sent to your client." : "Create a text message to be sent to your client."}</div>
        </div>
      </div>

      <Dialog
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>New {type == "email" ? "Email" : "Text"}</DialogTitle>
        <DialogContent>
          <div>
            <Row>
              <Col sm="12" lg="12" md="12">
                <FormGroup className="mb-1">
                  <label>TIME DELAY<span style={{ display: "contents", fontSize: "10px", color: "#aaa"}}>(DURATION SINCE PREVIOUS ACTION)</span></label>
                  <ActivationUpon
                    value={templatePayload}
                    MailIndexType={1}
                    handleDateChange={handleDateChange}
                    setTemplatePayload={setTemplatePayload}
                    templatePayload={templatePayload}
                    handleSubmit={handleSubmit}
                    dateAndtime={date}
                  />
                </FormGroup>
              </Col>
              {type == "email" ? (
                <Col sm="12" lg="12" md="12">
                  <FormGroup className="mb-1">
                    <label>SUBJECT</label>
                    <Input
                      onChange={handleFieldValue}
                      name="subject"
                      value={templatePayload.subject}
                      type="text"
                    />
                  </FormGroup>
                </Col>
              ) : null}
              <Col sm="12" lg="12" md="12">
                <label>CONTENT</label>
                <EditorContainer
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </Col>
              <Col sm="12" lg="12" md="12">
                <div className="d-flex justify-content-start align-items-center my-1">
                  <AddMaterial
                    setFileUploaded={setFileUploaded}
                    fileUploaded={fileUploaded}
                  />
                  <EmailFieldMerge selectPlaceholder={selectPlaceholder} />
                </div>
              </Col>
              <Col sm="12" lg="12" md="12">
                <div className="mb-1">
                  <span>From</span>
                  <CustomInput
                    onChange={handleFieldValue}
                    type="select"
                    id="Email"
                    name="from"
                  >
                    <option>
                      {userinfo?.bussinessEmail}
                    </option>
                    <option>
                      {userinfo?.email}
                    </option>
                  </CustomInput>
                </div>
              </Col>
              <Col sm="12" lg="12" md="12" className="d-flex">
                <div>
                  <span>To: </span>
                  <div>
                    <Select
                      variant="outlined"
                      style={{ width: "10em" }}
                      value={SelectTypeToSendEmail}
                      className={`pl-1 ${classes.inputStyle}`}
                      onChange={(e) => {
                        if (e.target.value === "smartlist") {
                          setTemplatePayload({
                            ...templatePayload,
                            smartLists: [],
                            to: [],
                          })
                        } else {
                          setSmartListRows([])
                          setTemplatePayload({
                            ...templatePayload,
                            smartLists: [],
                            to: [],
                          })
                        }
                        setSelectTypeToSendEmail(e.target.value)
                      }}
                    >
                      <MenuItem value="smartlist">Smart List</MenuItem>
                      <MenuItem value="toemail">Email Address</MenuItem>
                    </Select>
                  </div>
                </div>
                <div
                  className="ml-sm-1"
                >
                  {SelectTypeToSendEmail === "smartlist" ? (
                    <div>
                      <MainSmartList
                        viewTemplate={template}
                        smartlistRows={smartlistRows}
                        setSmartListRows={setSmartListRows}
                        smartlistId={smartlistId}
                        setSmartListId={setSmartListId}
                      />
                    </div>
                  ) : (
                    <FormGroup>
                      <span>To Emails</span>
                      <Input
                        onChange={handleToList}
                        name="To"
                        type="text"
                        value={templatePayload.to.join(",")}
                        placeholder="example@gmail.com, example@gmail.com, ..."
                      />
                    </FormGroup>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <ConfirmationModal
            primaryColor="#0483fd"
            secondaryColor="#fff"
            imagePath="/images/savefolder.png"
            open={sweetAlertOpen}
            title="Save as Template ?"
            onConfirm={() => {
              AddNewTemplate(SubFolderSelected)
            }}
            onCancel={() => {
              setSweetAlertOpen(false)
            }}
            onCancelButtonTitle={"Cancel"}
            contiunuebuttonTitle={"Save"}
            description=""
          />

        </DialogContent>
        <DialogActions>
          <div>
            <Button
              onClick={() => {
                handleClose()
                setEditOrAddOrListTemplate("list")
              }}
            >
              Cancel
            </Button>

            {template ? (
              <Button
                disabled={
                  templatePayload?.adminId !== undefined
                }
                style={{
                  color: "#2796f3",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
                onClick={AddNewTemplate}
              >
                Save
              </Button>
            ) : (
              <SaveFolderSelect
                MainFolderSelected={MainFolderSelected}
                handleSelectMainFolder={handleSelectMainFolder}
                handleSelectsubFolder={handleSelectsubFolder}
                FolderList={FolderList}
                SaveTemplate={SaveTemplate}
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    smartlist: state.EmailMarketing.smartlist,
    selectedtemplist: state.EmailMarketing.selectedtemplist,
    userinfo: state.userinfo?.userInfo,
    getAllTypeStudent: state.member.getAllTypeStudent,
    getAllSmartList: state.EmailMarketing.getAllSmartList,
    getAllSmartlistId: state.EmailMarketing.getAllSmartlistId,
  }
}

export default connect(mapStateToProps, {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  Get_User_Info,
  GET_ALL_TYPE_STUDENT,
  GET_CATEGORIES_EMAIL,
  UPLAODE_IMAGE,
})(AddAutomationModal)

