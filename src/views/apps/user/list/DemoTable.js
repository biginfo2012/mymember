import React, { useState, useEffect } from "react";
import MUIDataTable, { TableFilterList } from "mui-datatables";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import StudentlistuserEyeModal from "../../../dashboard1/StudentlistuserEyeModal"
import { Avatar, Chip } from "@mui/material";
import StudentManageMenu from "./UserMoreMenu"
import {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_ACTIVE_STUDENT
} from "../../../../redux/actions/newstudent";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import { GET_MEMBERSHIP_LIST } from "../../../../redux/actions/shop";
import { GET_AFTER_CAMPS } from "../../../../redux/actions/member";
import { connect } from "react-redux";
import moment from "moment";
import { RowSkeleton } from "./components/studentTable";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import MuiChip from '@material-ui/core/Chip'

import "./style.css"

const useStyles = makeStyles((theme) => ({
  cardroot: {
    width: "100%",
    height: "100%",
    boxShadow:
      " 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    marginTop: "6px",
    overflow: "scroll",
    padding: "0",
  },
  rowstart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  inputStyle: {
    height: "3em",
    width: "100%",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  textFontSize: {
    fontSize: "1em",
    width: "1.2em",
    height: "1,2em",
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
}));

function DataTable(props) {
  const {
    listofStudentdata,
    SELECTED_TEST_DATA,
    GET_FILTER_STDUNET_BY_FIELD,
    GET_MEMBERSHIP_LIST,
    GET_PROGRAM_LIST,
    getDataBack,
    programList,
    StudentTypeOrInterest,
    activeUserActionComponent,
    GET_AFTER_CAMPS,
    onSelectionChanged,
    usersChatAlertList,
  } = props;

  const [selectedId, setSelectedId] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectProgram, setSelectedProgram] = useState([]);
  const [data, setData] = useState([])
  const [FilterPayload, setFilterPayload] = useState({
    studentType: [StudentTypeOrInterest],
    program: [],
    current_rank_name: [],
    after_camp: [],
    membership_name: [],
    membership_type: [],
  });
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setData(listofStudentdata?.map((el) => ({
      ...el,
      fullNameDetail: { fullName: el?.firstName + " " + el?.lastName, id: el._id },
      fullData: { el }
    })))
  }, [listofStudentdata])

  const getRatingColor = (RatingCount, attendnce) => {
    if (RatingCount >= 0 && RatingCount <= 7 && attendnce > 0) {
      return "#60aa0ed4"; // green
    } else if (RatingCount >= 8 && RatingCount <= 14) {
      return "#ffc107"; // yellow
    } else if (RatingCount === 0) {
      return "gray";
    } else {
      return "#ff3f00";
    }
  };

  useEffect(() => {
    onSelectionChanged(selectedId, selectedRows);
    if (selectedRows.length > 0) {
      SELECTED_TEST_DATA(selectedRows);
    } else {
      SELECTED_TEST_DATA([]);
    }
  }, [SELECTED_TEST_DATA, selectedId, selectedRows]);

  useEffect(() => {
    history.memberpage = 1;
    history.memberrowCount = 10;

    if (!history?.fromback) {
      history.fromback = false;
      history.updated = false;
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
    }
    if (history?.updated) {
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
      history.fromback = false;
      history.updated = false;
    }
  }, [GET_AFTER_CAMPS, GET_MEMBERSHIP_LIST, GET_PROGRAM_LIST, getDataBack]);

  const getAllIds = (indexes) => {
    let ids = [];
    for (let index of indexes) {
      ids.push(data[index])
    }
    return ids;
  };

  const handleSelectRows = (currentRowSelected, allRowSelected, dataRow) => {
    let _ids = getAllIds(dataRow);
    setSelectedId(_ids);
    setSelectedRows(_ids);
  };

  

  const columns = [
    {
      name: "fullNameDetail",
      label: "Full Name",
      options: {
        selectableRows: true,
        sort: true,
        resizableColumns: true,
        responsive: "scroll",
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px", width: "100px !important" } }),
        customBodyRender: (value) => {
          return (
            <Link
              to={`/student-info/${value?.id}`}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center justify-content-start text-capitalize studentLink"
            >
              <div className="d-flex">
                <p>{value?.fullName}</p>
              </div>
            </Link>
          )
        }
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        sort: true,
        resizableColumns: true,
        customBodyRender: (data) => {
          const status = data
          if (status === "Active") {
            return (
              <div style={{ backgroundColor: "rgb(222, 248, 231)", color: "rgb(85, 166, 91)", textAlign: "center", padding: "4px", fontWeight: "bold", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>{status}</span>
              </div>
            )
          } else if (status === "Expired") {
            return (
              <div style={{ backgroundColor: "rgb(249, 210, 208)", color: "rgb(255, 63, 0)", textAlign: "center", padding: "4px", fontWeight: "bold", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>{status}</span>
              </div>
            )
          } else if (status === "Freeze") {
            return (
              <div style={{ backgroundColor: "rgb(249, 210, 208)", color: "rgb(255, 63, 0)", textAlign: "center", padding: "4px", fontWeight: "bold", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>{status}</span>
              </div>
            )
          } else {
            return (
              <div style={{ backgroundColor: "rgb(208 247 249)", color: "rgb(126 109 103)", textAlign: "center", padding: "4px", fontWeight: "bold", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>{status}</span>
              </div>
            )
          }
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "program",
      label: "Program",
      options: {
        resizableColumns: true,
        sort: true,
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "rank",
      label: "Rank",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <div className="tableImg">
              <Avatar
                style={{
                  width: "1.8em",
                  height: "1.8em",
                  margin: "0px",
                  objectFit: "contain !importent",
                }}
                src={data}
                alt={`${data}`}
              />
            </div>
          )
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "candidate",
      label: "Type",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          console.log(data)
          if (data === "BBC Candidate List") {
            return (
              <div style={{ textAlign: "center", padding: "4px", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>BBC</span>
              </div>
            )
          } else if (data === "BBC Candidate List (Beta)") {
            return (
              <div style={{ textAlign: "center", padding: "4px", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>BBC</span>
              </div>
            )
          }
          else if (data === "Leadership Club") {
            return (
              <div style={{ textAlign: "center", padding: "4px", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>LC</span>
              </div>
            )
          } else {
            return (
              <div style={{ textAlign: "center", padding: "4px", fontSize: "0.9em", borderRadius: "0.5rem", width: "60px" }}>
                <span>{data ? data : "N/A"}</span>
              </div>
            )
          }
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "membership_start",
      label: "Start Date",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <div>
              {data === undefined
                ? "N/A"
                : moment(data).format("MM/DD/YYYY")}
            </div>
          )
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "membership_expiry",
      label: "End Date",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <div>
              {data === undefined
                ? "N/A"
                : moment(data).format("MM/DD/YYYY")}
            </div>
          )
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          return (
            <Avatar
              className={classes.textFontSize}
              style={{
                fontWeight: "bold",
                width: "20px",
                fontSize: "12px",
                marginLeft: "20px",
                height: "20px",
                backgroundColor: getRatingColor(
                  Number(data),
                  data?.attendedclass_count
                ),
              }}
            >
              {data}
            </Avatar>
          )
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", paddingLeft: "15px" } })
      }
    },
    {
      name: "after_camp",
      label: "Tag",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (data) => {
          const after_camp = data
          return (
            after_camp === 0 ? (
              <div style={{ cursor: "pointer" }}>
                <Chip
                  size="small"
                  label={"None"}
                  style={{ color: "#00a6e1", background: "#b7c9cf !important" }}
                />
              </div>
            ) : (
              <UncontrolledButtonDropdown
                tag="li"
                className="dropdown-user nav-item"
              >
                <DropdownToggle className="p-0 text-center">
                  <DropdownItem
                    style={{
                      width: "100%",
                      color: "#000",
                      background: "#eaf4fe !important",
                      fontWeight: "100",
                      fontSize: "12px"
                    }}
                  >
                    {after_camp[0]}
                  </DropdownItem>

                  <MuiChip
                    size='small'
                    color='primary'
                    label={`+${after_camp.length ? after_camp.length - 1 : 0} more`}
                    style={{
                      cursor: 'pointer',
                      background: 'rgb(222, 248, 231)',
                      marginTop: "5px",
                      color: 'rgb(85, 166, 91)',
                      fontWeight: "500",
                      height: '1.2rem'
                    }}
                    onMouseOver={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />

                </DropdownToggle>
                <DropdownMenu right>
                  {after_camp?.map((item, i) => {
                    return (
                      <DropdownItem
                        style={{
                          width: "100%",
                          color: "#00a6e1",
                          background: "#eaf4fe !important",
                          fontWeight: "600",
                        }}
                        key={i}
                      >
                        {item}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            )
          )

        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap", textAlign: "center" } })
      },
    },
    {
      name: "fullData",
      label: "Action",
      options: {
        resizableColumns: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className="d-flex p-1">
              <StudentlistuserEyeModal studentInfo={value?.el} studentId={value?.el?._id} />
              <StudentManageMenu
                item={value?.el}
                alertCount={usersChatAlertList[value?.el?._id]}
                StudentTypeOrInterest={StudentTypeOrInterest}

              />
            </div>
          );
        },
        setCellProps: () => ({ style: { whiteSpace: "nowrap" } })
      }
    },
  ];

  const handlePageChange = (page) => {
    history.memberpage = page;
  };
  const handlePageRowChange = (rowCount) => {
    history.memberrowCount = rowCount;
  };


  return (
    <div className="card demoTableCard">
     {activeUserActionComponent}
      {listofStudentdata === null ? (
        [1, 2, 3, 4, 5, 12].map((i) => {
          return <RowSkeleton key={i} style={{ marginTop: "10vh" }} />;
        })
      ) : (
        <div className="card">
          <MUIDataTable
            data={data}
            columns={columns}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePageRowChange}
            clearSelectedRows={props.clearSelectedRow}
            paginationDefaultPage={history?.memberpage || 1}
            onRowsDelete={handleSelectRows}
            options={{
              download: false,
              fixedHeader: true,
              selectToolbarPlacement: "none",
              print: false,
              sort: true,
              search: false,
              onRowSelectionChange: handleSelectRows,
              rowsPerPageOptions: [5, 10, 20, 50, 100, 200, 400],
              resizableColumns: true,
              rowHover: true,
              draggableColumns: {
                enabled: true
              },
              responsive: "standard"
            }}
          />
        </div>
      )
      }

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    SearchStudent: state.member.SearchStudent,
    listofStudentdata: state.student.listofStudentdata,
    programList: state.program.programList,
    membershipList: state.shop.membershipList,
    getAfterCamps: state.member.getAfterCamps,
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
    clearSelectedRow: state.student.clearSelectedRow,
  };
};

export default connect(mapStateToProps, {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_PROGRAM_LIST,
  GET_MEMBERSHIP_LIST,
  GET_ACTIVE_STUDENT,
  GET_AFTER_CAMPS,
})(DataTable);



