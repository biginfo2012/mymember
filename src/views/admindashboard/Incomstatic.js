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
import { GET_INCOME_STATISTICS } from "../../redux/actions/admin/adminDashboard";

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

const Incomstatic = (props) => {
  const { GET_INCOME_STATISTICS, incomeStatistic } = props
  const [option, setOption] = useState("monthly");
  const [pageSize] = useState(5);
  const [allPage, setAllPage] = useState(1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(months[new Date().getMonth()]);

  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 5; i > 0; i--) {
      data.push(currentYear - i);
    }
    data.reverse();
    return [currentYear, ...data];
  })
  const handleMonthlyOrYearly = (item) => {
    let currentMonth
    months.forEach((m, i) => {
      if (m === month) {
        currentMonth = i
      }
    })
    console.log(currentMonth)

    setOption(item)
    GET_INCOME_STATISTICS(5, 0, item, currentMonth, year)
  }
  const handleYear = (e) => {
    let currentMonth
    months.forEach((m, i) => {
      if (m === month) {
        currentMonth = i
      }
    })
    setYear(e)
    GET_INCOME_STATISTICS(5, 0, option, currentMonth, e)
  }
  const handleMonths = (e) => {
    let currentMonth
    months.forEach((m, i) => {
      if (m === e) {
        currentMonth = i
      }
    })
    setMonth(e)
    GET_INCOME_STATISTICS(5, 0, option, currentMonth, year)
  }
  const fetchMemberStatistics = async (perpage, pageNumber) => {
    let currentMonth
    months.forEach((m, i) => {
      if (m === month) {
        currentMonth = i
      }
    })
    await GET_INCOME_STATISTICS(perpage, pageNumber, option, currentMonth, year);
  }
  useEffect(() => {
    let currentMonth
    months.forEach((m, i) => {
      if (m === month) {
        currentMonth = i
      }
    })
    console.log(currentMonth)
    GET_INCOME_STATISTICS(5, 0, option, currentMonth, year)
    // fetchMemberStatistics(0, 5)
  }, [GET_INCOME_STATISTICS])


  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#deffe6" }}>
                <TimerIcon style={{ color: "#00D12E" }} />
              </div>
              <span> Income Statistics</span>
            </div>

            <div className="d-flex justify-content-between">
              <Select
                style={{ width: '150px', marginRight: "1em" }}
                placeholder="Month"
                value={month}
                onChange={handleMonths}
                disabled={option !== "monthly"}

              >{months.map((x) => {
                return (
                  <Option key={x} value={x}>{x}</Option>
                )
              })
                }
              </Select>
              <Select
                style={{ width: '100px', marginRight: "1em" }}
                placeholder="Year"
                value={year}
                onChange={handleYear}
              >{years.map((x) => {
                return (
                  <Option key={x} value={x}>{x}</Option>
                )
              })
                }
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
            <button
              onClick={() => handleMonthlyOrYearly("monthly")}
              className={
                option === "monthly"
                  ? "btn-filter-primary"
                  : "btn-filter-secondary"
              }
            >
              Monthly
            </button>
            <button
              onClick={() => handleMonthlyOrYearly("yearly")}
              className={
                option !== "monthly"
                  ? "btn-filter-primary m-r-10"
                  : "btn-filter-secondary"
              }
            >
              Yearly
            </button>
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
                      <StyledTableCell>Income</StyledTableCell>
                      <StyledTableCell>Expense</StyledTableCell>
                      <StyledTableCell>Net</StyledTableCell>
                      {/* <StyledTableCell>Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incomeStatistic?.map((row) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell align="left">
                          {row?.locationName !== undefined
                            ? `${row?.locationName}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.incomeByProduct !== undefined
                            ? `${row.incomeByProduct[0]?.income}`
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.incomeByProduct !== undefined
                            ? `${row.incomeByProduct[0]?.expense}`
                            : "N/A"}{" "}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row.incomeByProduct !== undefined
                            ? `${row.incomeByProduct[0]?.net}`
                            : "N/A"}{" "}
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
    incomeStatistic: state.adminDashboardReducer.incomeStatistic,
  };
};
export default connect(mapStateToProps, { GET_INCOME_STATISTICS })(Incomstatic);
