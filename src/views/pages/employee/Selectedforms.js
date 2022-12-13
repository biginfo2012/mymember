import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import Editanddelete from './Editanddelete'

const Selectedforms = ({}) => {
  return (
    <div>
      <TableContainer sx={{ minWidth: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='start' className='p-0'><b>Form Name</b></TableCell>
              <TableCell align='start' className='p-0'><b>Role name</b></TableCell>
              <TableCell align='start' className='p-0'><b>Type</b></TableCell>
              <TableCell align='start' className='p-0'><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody showRowHover={true} >
            <TableRow className='border-top'>
              <TableCell align='start' className='p-0'>Form Name</TableCell>
              <TableCell align='start' className='p-0'>Role name</TableCell>
              <TableCell align='start' className='p-0'>Type</TableCell>
              <TableCell align='start' className='p-0'>
                <Editanddelete />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Selectedforms