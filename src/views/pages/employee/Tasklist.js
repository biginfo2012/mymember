import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import Editanddelete from './Editanddelete'
import { Chip, CircularProgress } from '@material-ui/core'
import CreateStatus from '../../apps/task-and-goals/task/Tablecells/createStatus';

const Tasklist = ({ }) => {
  return (
    <div>
      <TableContainer sx={{ minWidth: 500, }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='start'
                className='p-0'><b>Task Name</b></TableCell>
              <TableCell align='start'
                className='p-0'><b>Due Date</b></TableCell>
              <TableCell align='start'
                className='p-0'><b>Mark</b></TableCell>
              <TableCell align='start'
                className='p-0'>
                <b>Assignee Activity</b></TableCell>
              <TableCell align='start'
                className='p-0'><b>Status</b></TableCell>
              <TableCell align='start'
                className='p-0'><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody showRowHover={true} >
            <TableRow className='border-top'>
              <TableCell align='start'
                className='p-0'>hjhj</TableCell>
              <TableCell align='start'
                className='p-0'>Assignee</TableCell>
              <TableCell align='start'
                className='p-0'>
                <div>
                  <Chip
                    size='small'
                    style={{
                      color: 2 >= 2 ? "#fff" : "#2896f3",
                      border: '1px solid #2896f3',
                      backgroundColor: 2 >= 2 ? "#2896f3" : "#fff",
                      borderRight: 2 >= 2 ? "1px solid #fff" : "1px solid #2896f3",
                      borderRadius: '0px'
                    }}
                    label={false === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "1"}
                  />
                  <Chip
                    size='small'
                    style={{
                      color: 2 >= 2 ? "#fff" : "#2896f3",
                      border: '1px solid #2896f3',
                      backgroundColor: 2 >= 2 ? "#2896f3" : "#fff",
                      borderRight: 2 >= 2 ? "1px solid #fff" : "1px solid #2896f3",
                      borderRadius: '0px'
                    }}
                    label={false === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "2"}
                  />
                  <Chip
                    size='small'
                    style={{
                      color: 2 >= 2 ? "#fff" : "#2896f3",
                      border: '1px solid #2896f3',
                      backgroundColor: 2 >= 2 ? "#2896f3" : "#fff",
                      borderRight: 2 >= 2 ? "1px solid #fff" : "1px solid #2896f3",
                      borderRadius: '0px'
                    }}
                    label={false === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "3"}
                  />
                  <Chip
                    size='small'
                    style={{
                      color: 2 >= 2 ? "#fff" : "#2896f3",
                      border: '1px solid #2896f3',
                      backgroundColor: 2 >= 2 ? "#2896f3" : "#fff",
                      borderRight: 2 >= 2 ? "1px solid #fff" : "1px solid #2896f3",
                      borderRadius: '0px'
                    }}
                    label={false === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "4"}
                  />
                  <Chip
                    size='small'
                    style={{
                      color: 1 >= 2 ? "#fff" : "#2896f3",
                      border: '1px solid #2896f3',
                      backgroundColor: 1 >= 2 ? "#2896f3" : "#fff",
                      borderRight: 1 >= 2 ? "1px solid #fff" : "1px solid #2896f3",
                      borderRadius: '0px'
                    }}
                    label={false === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "5"}
                  />
                </div>
              </TableCell>
              <TableCell align='start'
                className='p-0'>Type</TableCell>
              <TableCell align='start'
                className='p-0'>
                <CreateStatus />
              </TableCell>
              <TableCell align='cenetr'
                className='p-0'>
                <Editanddelete />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Tasklist;