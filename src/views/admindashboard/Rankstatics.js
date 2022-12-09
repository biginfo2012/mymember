import React, { useEffect, useState } from "react";
import TimerIcon from "@material-ui/icons/Timer";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import NoData from "../../../src/images/NoData.svg";
import StudentlistuserEyeModal from "../dashboard1/StudentlistuserEyeModal";
import { Card, CardBody } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import Pagination from "@material-ui/lab/Pagination";
import Pagination from '@mui/lab/Pagination';
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { Select } from "antd";
import { GET_RANK_STATISTICS } from "../../redux/actions/admin/adminDashboard";
import { GET_PROGRAM_LIST } from "../../redux/actions/programe";
import { Avatar } from "@mui/material";
const { Option } = Select

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FCFCFC",
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FAFAFA",
    },
  },
}))(TableRow);

const Rankstatics = (props) => {
  const { GET_PROGRAM_LIST, programList, GET_RANK_STATISTICS, rankStatistic } = props
  const [option, setOption] = useState("month");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);
  const history = useHistory();
  const [Ranks, setRanks] = useState([])
  const [selectPName, setselectPName] = useState('')

  console.log(rankStatistic)
  const handleChangeprogram = (value) => {
    let getSelectProgram = programList.filter(
      (item) => item.programName === value
    )
    setselectPName(value)
    setRanks(getSelectProgram)
  }

  const fetchMemberStatistics = async (perpage, pageNumber) => {
    await GET_RANK_STATISTICS(perpage, pageNumber);
  }

  useEffect(() => {
    GET_RANK_STATISTICS(5, 0)
    GET_PROGRAM_LIST()
  }, [])
  // console.log(Ranks)
  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#deffe6" }}>
                <TimerIcon style={{ color: "#00D12E" }} />
              </div>
              <span> Rank Statistics</span>
            </div>
            <div className="d-flex justify-content-between">
              <Select
                style={{ width: '200px', marginRight: "1em" }}
                defaultValue={programList[0]?.programName}
                onChange={handleChangeprogram}
                placeholder="Select Program"
              >
                {/* <Option>Select Program</Option> */}
                {programList?.map((v) => (
                  <Option
                    value={v.programName}
                    key={v._id}
                  >
                    {v.programName}
                  </Option>
                ))}
              </Select>
              {/* <button
                onClick={() => {
                  // history.push(`/app/student/active-trail/list`);
                }}
                className="viewAllBtn"
              >
                View All
              </button> */}
            </div>
          </div>
          <div className="stat-filter-area">
            {/* <button
              onClick={() => setOption("month")}
              className={
                option === "month"
                  ? "btn-filter-primary"
                  : "btn-filter-secondary"
              }
            >
              This Month
            </button>
            <button
              onClick={() => setOption("all")}
              className={
                option !== "month"
                  ? "btn-filter-primary m-r-10"
                  : "btn-filter-secondary"
              }
            >
              All
            </button> */}
            <br />
            {false ? <span className="data-center">
              <img src={NoData} className="no-data" alt="No data" />
            </span>

              :
              <TableContainer component={Paper}>
                <Table
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell >Location Name</StyledTableCell>
                      {Ranks[0]?.program_rank?.map((item) =>
                      (<StyledTableCell>
                        <Avatar src={item?.rank_image} />
                      </StyledTableCell>)
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rankStatistic?.map((row) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.locationName !== undefined
                            ? `${row?.locationName}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.studentType !== undefined &&
                            row.studentType.length
                            ? `${row.studentType}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.primaryPhone !== undefined &&
                            row.primaryPhone.length
                            ? `${row.primaryPhone}`
                            : "N/A"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="table-action-area">
                            <Tooltip
                              arrow
                              title={
                                <p
                                  style={{
                                    fontSize: "1.5em",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <b>{"no notes"}</b>
                                </p>
                              }
                            >
                              <InfoIcon className="action-icon-info" />
                            </Tooltip>
                            <StudentlistuserEyeModal studentInfo={row} />
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="table-pagination">
                  <Pagination
                    page={allPage}
                    onChange={(a, b) => {
                      setAllPage(b);
                      fetchMemberStatistics(pageSize, b - 1);
                    }}
                    count={10}
                    className="dash-pagination"
                  />
                </div>
              </TableContainer>}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    rankStatistic: state.adminDashboardReducer.rankStatistic,
    programList: state.program.programList

  }
}
export default connect(mapStateToProps, {
  GET_PROGRAM_LIST,
  GET_RANK_STATISTICS,
})(Rankstatics)

