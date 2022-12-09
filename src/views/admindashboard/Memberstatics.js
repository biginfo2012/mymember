import React, { useEffect, useState } from "react";
import TimerIcon from "@material-ui/icons/Timer";
import { connect } from "react-redux";
import NoData from "../../../src/images/NoData.svg";
import { Card, CardBody } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from '@mui/lab/Pagination';
import { Select } from "antd";
import { GET_MEMBER_STATISTICS } from "../../redux/actions/admin/adminDashboard";

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

const Memberstatics = (props) => {
  const { GET_MEMBER_STATISTICS, memberStatistic } = props
  const [option, setOption] = useState("month");
  const [pageSize] = useState(5);
  const [allPage, setAllPage] = useState(1);
  const [studentType, setStudentType] = useState("Active Student");

  const handleStudentType = (e) => {
    setStudentType(e);
    fetchMemberStatistics(5, 0, e)
  };

  const fetchMemberStatistics = async (perpage, pageNumber, studentType) => {
    console.log(studentType)
    await GET_MEMBER_STATISTICS(perpage, pageNumber, studentType);
  }

  useEffect(() => {
    GET_MEMBER_STATISTICS(5, 0, studentType)
  }, [GET_MEMBER_STATISTICS])


  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#deffe6" }}>
                <TimerIcon style={{ color: "#00D12E" }} />
              </div>
              <span> Member Statistics</span>
            </div>
            <div className="d-flex justify-content-between">
              <Select
                style={{ width: '200px', marginRight: "1em" }}
                value={studentType}
                onChange={handleStudentType}
              >
                <Option value="Active Student">Active Member</Option>
                <Option value="Former Student">Former Member</Option>
                <Option value="Leads">Leads</Option>
                <Option value="Active Trial">Active Trial</Option>
                <Option value="Former Trial">Former Trial</Option>
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
                      <StyledTableCell>Location Name</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                      <StyledTableCell>Last Login</StyledTableCell>
                      <StyledTableCell>Total</StyledTableCell>
                      {/* <StyledTableCell>Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {memberStatistic?.map((row) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.locationName !== undefined
                            ? `${row?.locationName}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.studentData.studentType !== undefined
                            ? `${row.studentData?.studentType}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.userData !== undefined &&
                            row?.userData?.length
                            ? `${row.userData?.isLogin}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.studentData.count !== undefined
                            ? `${row.studentData.count}`
                            : "N/A"}
                        </StyledTableCell>
                        {/* <StyledTableCell>
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
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="table-pagination">
                  <Pagination
                    page={allPage}
                    onChange={(a, b) => {
                      setAllPage(b);
                      fetchMemberStatistics(pageSize, b - 1, studentType);
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
    memberStatistic: state.adminDashboardReducer.memberStatistic,
  };
};
export default connect(mapStateToProps, { GET_MEMBER_STATISTICS })(Memberstatics);
