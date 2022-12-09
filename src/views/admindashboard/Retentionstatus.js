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
import Pagination from '@mui/lab/Pagination';
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { Select } from "antd";
import { Avatar, makeStyles } from "@material-ui/core";
import { GET_RETENTION_STATISTICS } from "../../redux/actions/admin/adminDashboard";
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

const useStyles = makeStyles((theme) => ({
  textFontSize: {
    fontSize: "1em",
    width: "1.2em",
    height: "1,2em",
  },
}));

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

const Retentionstatus = (props) => {
  const { GET_RETENTION_STATISTICS, retentionStatistic } = props
  const dispatch = useDispatch();
  const [option, setOption] = useState("month");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);
  const history = useHistory();
  const classes = useStyles()


  const fetchMemberStatistics = async (perpage, pageNumber) => {
    await GET_RETENTION_STATISTICS(perpage, pageNumber);
  }

  console.log(retentionStatistic)

  useEffect(() => {
    GET_RETENTION_STATISTICS(5, 0)
    // fetchMemberStatistics(0, 5)
  }, [GET_RETENTION_STATISTICS])

  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#deffe6" }}>
                <TimerIcon style={{ color: "#00D12E" }} />
              </div>
              <span>Retention status</span>
            </div>
            <div className="d-flex justify-content-between">
              <Select
                style={{ width: '200px', marginRight: "1em" }}
                defaultValue={"Active Member"}
              >
                <Option value="Active Member">Active Member</Option>
                <Option value="Former Member">Former Member</Option>
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
                      <StyledTableCell>Total</StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                          }} >
                          {'0+'}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                            backgroundColor: "#60aa0ed4",
                          }} >
                          {'7+'}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                            backgroundColor: "#ffc107"
                          }} >
                          {'14+'}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                            backgroundColor: "#1890ff"
                          }} >
                          {'30+'}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                            backgroundColor: "#f58e21"
                          }} >
                          {'60+'}
                        </Avatar>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Avatar className={classes.textFontSize}
                          style={{
                            fontWeight: "bold",
                            width: "2.5em",
                            height: "2.5em",
                            backgroundColor: "#ff3f00"
                          }} >
                          {'90+'}
                        </Avatar>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {/* retentionStatistic */}
                    {[]?.map((row) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.locationName !== undefined
                            ? `${row?.locationName} `
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.zero +
                            row.ratingCount[0]?.sevenToFourteen +
                            row.ratingCount[0]?.fourteenToThirty +
                            row.ratingCount[0]?.thirtyToSixty +
                            row.ratingCount[0]?.sixtyToNinty +
                            row.ratingCount[0]?.nintyPlus
                            }`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.zero}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.sevenToFourteen}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.fourteenToThirty}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.thirtyToSixty}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.sixtyToNinty}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.ratingCount !== undefined &&
                            row?.ratingCount.length ?
                            `${row?.ratingCount[0]?.nintyPlus}`
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
    retentionStatistic: state.adminDashboardReducer.retentionStatistic,
  };
};
export default connect(mapStateToProps, { GET_RETENTION_STATISTICS })(Retentionstatus);
