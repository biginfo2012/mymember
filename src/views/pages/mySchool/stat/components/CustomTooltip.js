import React, { useState } from 'react'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import moment from 'moment';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from "@material-ui/core/styles";



const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#F0F0F0",
  },
  body: {
    fontSize: 14
  }
}))(TableCell);


const headCells = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'Full Name' },
  { id: 'studentType', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'Date', numeric: false, disablePadding: false, label: 'Activity' },
  { id: 'Membership', numeric: false, disablePadding: false, label: 'Membership Type' },

];
const labels =
{
  "Jan": "January",
  "Feb": "February",
  "Mar": "March",
  "Apr": "April",
  "May": "May",
  "Jun": "June",
  "Jul": "July",
  "Aug": "August",
  "Sep": "September",
  "Oct": "October",
  "Nov": "November",
  "Dec": "December",
}

const CustomTooltip = ({
  data,
  tooltip,
  statisticsYear,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Card style={{
        overflow: "scroll"
      }}>
        <div div className='m-1'>
          {tooltip === "Not Joined" && <>
            <div className='d-flex justify-content-between m-0'>
              <h5 className='m-1'><b>{labels[data?.name]} {statisticsYear}</b></h5>
              <div className="pl-1 m-1 d-flex justify-content-end ">
                <h6 style={{
                  color: "#ff2929"
                }} >
                  <b> Not Joined</b>
                  <span style={{
                    background: "#ff2929"
                  }} className="st-number2 m-1">
                    {data?.quite?.count || 0}
                  </span>
                </h6>
              </div>
            </div>
            <div>

              {data?.quite?.data?.length > 0 ?
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      {headCells.map((headCell) => (
                        <StyledTableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                          padding={headCell.disablePadding ? 'none' : 'normal'}
                          sortDirection={orderBy === headCell.id ? order : false}
                          className='border-left'
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className="text-nowrap"
                          >
                            <b>{headCell.label}</b>
                          </TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableHead>
                    <TableBody>
                      {stableSort(data?.quite?.data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={row.name}
                            >
                              <TableCell className='text-nowrap border-left'>{`${row?.firstName} ${row?.lastName}`}</TableCell>
                              <TableCell className='text-nowrap border-left'>{row?.studentType}</TableCell>
                              <TableCell className='text-nowrap border-left'>{moment(row?.Date).format("MM/DD/YYYY")}</TableCell>
                              <TableCell className='text-nowrap border-left border-right'></TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer> :
                <div className='d-flex justify-content-center border'>No data</div>}
              <TablePagination
                className='m-0'
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.join?.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </>
          }
        </div>
        <div className='m-1'>
          {tooltip === "Joined" && <>
            <div className='d-flex justify-content-between m-0'>
              <h5 className='m-1'><b>{labels[data?.name]} {statisticsYear}</b></h5>
              <div className="pl-1 m-1 d-flex justify-content-end ">
                <h6 style={{
                  color: "#0184FF"
                }}>
                  <b> Joined</b>
                  <span className="st-number2 m-1" style={{
                    background: "#0184FF"
                  }}>
                    {data?.join?.count || 0}
                  </span>
                </h6>
              </div>
            </div>
            {data?.join?.data?.length ?
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
                        <StyledTableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                          padding={headCell.disablePadding ? 'none' : 'normal'}
                          sortDirection={orderBy === headCell.id ? order : false}
                          className='border-left w-100'
                        >
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className="text-nowrap"

                          >
                            <b>{headCell.label}</b>
                          </TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(data?.join?.data, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.name}
                          >
                            <TableCell className='text-nowrap border-left'>{`${row?.firstName} ${row?.lastName}`}</TableCell>
                            <TableCell className='text-nowrap border-left'>{row?.studentType}</TableCell>
                            <TableCell className='text-nowrap border-left'>{moment(row?.Date).format("MM/DD/YYYY")}</TableCell>
                            <TableCell className='text-nowrap border-left border-right'></TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer> : <div className='d-flex justify-content-center border'>No data</div>}
            <TablePagination
              className='m-0'
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.join?.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
          }
        </div>
      </Card >

    </div>
  );

}
export default CustomTooltip

