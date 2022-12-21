import React, { useState, useEffect } from "react";
import { Button, CustomInput, Input } from "reactstrap";
import Drawer from "@mui/material/Drawer";
import {
  CREATE_TASK,
  GET_TASK_FOLDER_LIST,
  CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
} from "../../../redux/actions/task-and-goals/task";
import { GET_SUB_USERS_ASSIGNEE } from "../../../redux/actions/employee_subusers_roles";
import { connect } from "react-redux";
import { Grid, Select, MenuItem, FormControl, Switch } from "@mui/material";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Createtask = (props) => {
  const {
    CREATE_TASK,
    breadCrumbValue,
    GET_TASK_FOLDER_LIST,
    taskFolderList,
    sub_users_info,
    GET_SUB_USERS_ASSIGNEE,
    CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
  } = props;

  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  };

  const toastCSS = () => {
    return {
      position: "bottom-right",
      autoClose: 5000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };

  const history = useHistory();
  const [open, setopen] = useState(false);
  const [taskType, setTaskType] = useState("Ongoing");
  const [SelectedFolderList, setSelectedFolderList] = useState([]);
  const [mainFolderId, setMainFolderId] = useState(null);
  const [subFolderId, setSubFolderId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    priority: "Urgent",
    label: "Office",
    assign: "",
  });
  const [state, setState] = React.useState({
    isproof: false,
    isRating: false,
    isEnterData: false,
    isYesOrNo: false,
  });
  const [errorLog, setErrorLog] = useState({
    taskName: false,
    uploadAnImage: false,
    selectRating: false,
    enterData: false,
    yesOrNo: false,
    subList: false,
    todoList: false,
  });

  const toggleDrawer = (open) => {
    setopen(!open);
  };
  const onClose = () => {
    setopen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let ObjFormat;
    ObjFormat = {
      ...payload,
      ...state,
      status: "Pending",
      type: taskType,
    };

    let newErrorLog = errorLog;
    newErrorLog.taskName =
      !ObjFormat.name || ObjFormat.name === "" ? true : false;
    // newErrorLog.assignee = ObjFormat.assign === "" ? true : false;
    newErrorLog.uploadAnImage = !ObjFormat.isproof ? true : false;
    newErrorLog.selectRating = !ObjFormat.isRating ? true : false;
    newErrorLog.enterData = !ObjFormat.isEnterData ? true : false;
    newErrorLog.yesOrNo = !ObjFormat.isYesOrNo ? true : false;

    let isMainAndSubFolder = false;
    if (breadCrumbValue[0]?.subFolderName === null) {
      newErrorLog.subList = !mainFolderId || mainFolderId === "" ? true : false;
      newErrorLog.todoList = !subFolderId || subFolderId === "" ? true : false;
      if (newErrorLog.subList || newErrorLog.todoList) {
        isMainAndSubFolder = true;
      }
    }
    setErrorLog({ ...newErrorLog });
    let isComplitionMethod =
      newErrorLog.uploadAnImage ||
      newErrorLog.selectRating ||
      newErrorLog.enterData ||
      newErrorLog.yesOrNo
        ? false
        : true;

    console.log(
      "errorLog",
      errorLog,
      newErrorLog.taskName,
      ObjFormat,
      isComplitionMethod,
      // newErrorLog.assignee ,
      isMainAndSubFolder
    );
    if (
      !newErrorLog.taskName &&
      !isComplitionMethod &&
      // !newErrorLog.assignee &&
      !isMainAndSubFolder
    ) {
      // console.log(ObjFormat)
      if (mainFolderId === null && subFolderId === null) {
        if (
          history?.maintaskFolderId !== null &&
          history?.subtaskFolderId !== null
        ) {
          if (
            !state?.isproof &&
            !state?.isRating &&
            !state?.isEnterData &&
            !state?.isYesOrNo
          ) {
            toast.error("Please select a Task completion method", toastCSS());
          } else if (taskName === "") {
            toast.error("Task Name is Required", toastCSS());
          } else {
            let result = await CREATE_TASK(
              ObjFormat,
              history?.maintaskFolderId,
              history?.subtaskFolderId
            );
            if (result) {
              onClose();
              setLoading(false);
            }
          }
        } else {
          console.log("Please select a folder");
        }
      } else {
        if (
          !state?.isproof &&
          !state?.isRating &&
          !state?.isEnterData &&
          !state?.isYesOrNo
        ) {
          toast.error("Please select a Task completion method", toastCSS());
        } else if (taskName === "") {
          toast.error("Task Name is Required", toastCSS());
        } else {
          let result = await CREATE_TASK_WITHOUT_GONE_INTO_FOLDER(
            ObjFormat,
            subFolderId
          );
          if (result) {
            onClose();
            setLoading(false);
          }
        }
      }
    } else {
      setLoading(false);
    }
  };

  const onChangeHandler = async (e) => {
    if (e.target.name === "name") {
      setTaskName(e.target.value);
    }
    const { value, name } = e.target;
    if (name === "mainfolder") {
      setMainFolderId(value);
      let selectedFolder = await taskFolderList?.filter(
        (item) => item?._id === value
      );
      if (selectedFolder?.length > 0) {
        setSelectedFolderList(selectedFolder[0]?.subFolder);
        // console.log(selectedFolder[0]?.subFolder)
        if (selectedFolder[0]?.subFolder?.length > 0) {
          setSubFolderId(selectedFolder[0]?.subFolder[0]?._id);
        } else {
          alert("This main folder have no sub folder");
        }
      } else {
        setSelectedFolderList([]);
      }
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  const handleChange = (event) => {
    let selectTask = {
      isproof: false,
      isRating: false,
      isEnterData: false,
      isYesOrNo: false,
    };
    setState({ ...selectTask, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    GET_SUB_USERS_ASSIGNEE();
    GET_TASK_FOLDER_LIST();
  }, [GET_SUB_USERS_ASSIGNEE, GET_TASK_FOLDER_LIST]);

  useEffect(() => {
    let valueF = getLogedInUser()?.firstname || sub_users_info[0].firstname;
    let valueL = getLogedInUser()?.lastname || sub_users_info[0].lastname;
    setPayload({ ...payload, assign: `${valueF} ${valueL}` });
  }, [sub_users_info]);

  const handleTasktype = (e) => {
    setTaskType(e.target.value);
  };

  return (
    <div className="w-100 d-flex justify-content-end">
      <Button
        color="primary"
        className="text-nowrap mb-1"
        onClick={() => {
          setopen(!open);
        }}
      >
        Add Task
      </Button>
      <Drawer
        PaperProps={{
          elevation: 0,
          style: {
            width: "30%",
          },
        }}
        anchor="right"
        open={open}
      >
        <div className="p-1">
          <div>
            <h2 style={{ color: "#0184FF" }}> Create New Task </h2>
          </div>
          <Grid spacing={2} container className="p-1">
            <Grid item sm={12} md={12} lg={12}>
              <label style={{ fontSize: "15px" }}> Task Name</label>
              <Input
                name="name"
                placeholder="Task name"
                onChange={onChangeHandler}
                invalid={errorLog.taskName}
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
                  onChange={handleTasktype}
                  fullWidth
                  labelId="priority-select-required-label"
                  id="priority-select-required"
                  name="task_type"
                  value={taskType}
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
                  onChange={onChangeHandler}
                  // invalid={errorLog.assignee}
                >
                  <option key={getLogedInUser()?._id} defaultValue>
                    {`${getLogedInUser()?.firstname} ${
                      getLogedInUser()?.lastname
                    } `}
                  </option>
                  {sub_users_info.map((item, i) => {
                    return (
                      <option
                        key={i}
                      >{`${item.firstname} ${item.lastname}`}</option>
                    );
                  })}
                </CustomInput>
              </FormControl>
            </Grid>
          </Grid>
          {breadCrumbValue[0]?.subFolderName === null ? (
            <div className="mt-2 ml-1 mr-1">
              <Grid spacing={2} container>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>TO-DO List</label>
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
                      name="mainfolder"
                      onChange={onChangeHandler}
                      invalid={errorLog.todoList}
                      required
                    >
                      <option>Select Main list</option>
                      {taskFolderList.map((item, i) => {
                        return (
                          <option value={item?._id} key={i}>
                            {item.folderName}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Sublist</label>
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
                      name="subfolder"
                      invalid={errorLog.todoList}
                      required
                      onChange={(e) => setSubFolderId(e.target.value)}
                    >
                      {SelectedFolderList?.map((item, i) => {
                        return (
                          <option key={i} value={item?._id}>
                            {item.subFolderName}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          ) : (
            <></>
          )}
          <div className="task-body2 p-1 my-2">
            <Grid spacing={2} container>
              <Grid item sm={12} md={12} lg={12}>
                <div>
                  <p>Select one task completion method below.</p>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      checked={state.isproof}
                      onChange={handleChange}
                      name="isproof"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0">Upload an image.</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      checked={state.isRating}
                      onChange={handleChange}
                      name="isRating"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0"> Select rating</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      checked={state.isEnterData}
                      onChange={handleChange}
                      name="isEnterData"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />{" "}
                    <p className="mb-0">Enter Data</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <Switch
                      style={{ color: "#0184FF" }}
                      checked={state.isYesOrNo}
                      onChange={handleChange}
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
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              <span>Save</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
    sub_users_info: state.employeeSubUser.sub_users_info,
    taskFolderList: state?.TaskAndGoalsTaskReducer?.taskFolderList,
  };
};

export default connect(mapStateToProps, {
  CREATE_TASK,
  CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
  GET_SUB_USERS_ASSIGNEE,
  GET_TASK_FOLDER_LIST,
})(Createtask);
