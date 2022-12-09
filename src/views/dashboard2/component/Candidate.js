import React, { useState, useEffect, useMemo } from "react";
import "../../../assets/scss/pages/dashboard2.scss";

import { Card, CardBody } from "reactstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import Pagination from "@material-ui/lab/Pagination";
import Pagination from '@mui/lab/Pagination';
import NoData from "./../../../images/NoData.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { connect } from "react-redux";
import { GET_RECOMENDED_CANDIDATE } from "./../../../redux/actions/dashboard2";

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

const Candidate = (props) => {
  const { recomendedCandiate, type } = props;

  const [option, setOption] = useState("BBC Candidate List (Beta)");
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const stp = (p) => setOption(p);
  const dispatch = useDispatch();
  function fetchCandidate(type, page, size) {
    dispatch(GET_RECOMENDED_CANDIDATE(type, page, size));
  }

  useEffect(() => {
    fetchCandidate(option, 5, 0);
  }, [option]);
 
  useMemo(() => {
    if (option === "BBC Candidate List (Beta)") {
      setDataSource("BBC Candidate List (Beta)");
    }
    if (option === "Leadership Club") {
      setDataSource("Leadership Clubs");
    }
    if (option === "IC") {
      setDataSource("");
    }
    if (option === "AC") {
      setDataSource("");
    }
  }, [option]);

  return (
    <Card className="_card stat-card">
      <CardBody>
        <div className="stat-card-header">
          <div className="sch-left">
            <div className="sch-icon" style={{ backgroundColor: "#DDF6FF" }}>
              <GroupAddIcon style={{ color: "#155871" }} />
            </div>
            <span>Candidate</span>
          </div>
          <button className="viewAllBtn">View All</button>
        </div>
        <div className="stat-filter-area">
          <button
            onClick={() => stp("BBC Candidate List (Beta)")}
            className={
              option === "BBC Candidate List (Beta)"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            BBC
          </button>
          <button
            onClick={() => stp("Leadership Club")}
            className={
              option === "Leadership Club"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            LC
          </button>
          <button
            onClick={() => stp("IC")}
            className={
              option === "IC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            IC
          </button>
          <button
            onClick={() => stp("AC")}
            className={
              option === "AC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            AC
          </button>
        </div>
        <div>
          {dataSource === null || dataSource?.total === 0 ? (
            <div className="data-center">
              <img src={NoData} className="no-data" alt="No data" />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table
                // className={classes.table}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Rank</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Last Strive Given</StyledTableCell>
                    <StyledTableCell>Candidate Type</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recomendedCandiate &&
                    recomendedCandiate?.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="left">{row.firstName + ' ' + row.lastName}</StyledTableCell>
                        <StyledTableCell>{row.current_rank_name ? row.current_rank_name : "N/A"}</StyledTableCell>
                        <StyledTableCell>{row.status ? row.status : "N/A"}</StyledTableCell>
                        <StyledTableCell>{moment(row?.last_stripe_given).format("MM/DD/YYYY") ? moment(row?.last_stripe_given).format("MM/DD/YYYY") : "N/A"}</StyledTableCell>
                        <StyledTableCell>{row?.candidate ? row?.candidate : "N/A"}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div className="table-pagination">
          <Pagination
            page={page}
            onChange={(a, b) => {
              setPage(b);
              GET_RECOMENDED_CANDIDATE(type, b - 1, pageSize);
            }}
            // count={recomendedCandiate ? Math.ceil(recomendedCandiate.total / 5) : 0}
            className="dash-pagination"
          />
        </div>
      </CardBody>
    </Card>
  );
};

function Tble({ type, dataSource, fetchCandidate }) {
  const [page, setPage] = useState(1);

  return (
    <>
      <Table
        // className={classes.table}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Last Strive Given</StyledTableCell>
            <StyledTableCell>Candidate Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource &&
            dataSource.data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{row.student_name ? row.student_name : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.rank ? row.rank : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.status ? row.status : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.lastStrive ? row.lastStrive : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.membership_type ? row.membership_type : "N/A"}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        {/* <TableFooter>

      </TableFooter> */}
      </Table>
      <div className="table-pagination">
        <Pagination
          page={page}
          onChange={(a, b) => {
            setPage(b);
            fetchCandidate(type, b, 5);
          }}
          count={dataSource ? Math.ceil(dataSource.total / 5) : 0}
          className="dash-pagination"
        />
      </div>
    </>
  );
}

export default Candidate;
