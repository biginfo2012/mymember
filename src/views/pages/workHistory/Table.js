import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import { formatDuration } from "./utils";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Project 1", "03:17:23", "03:18:20", "1m 3s"),
  createData("Project 1", "15:53:32", "16:58:45", "1m 5m 13s"),
];

export default function BasicTable(props) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const rows = props.data.map((item) => {
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);
    return createData(
      item.description,
      item.startTime,
      item.endTime,
      formatDuration(
        new Date(
          0,
          0,
          0,
          endTime.getHours(),
          endTime.getMinutes(),
          endTime.getSeconds()
        ) -
          new Date(
            0,
            0,
            0,
            startTime.getHours(),
            startTime.getMinutes(),
            startTime.getSeconds()
          )
      )
    );
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Work Description</b>
              </TableCell>
              <TableCell align="right">
                <b>Start time</b>
              </TableCell>
              <TableCell align="right">
                <b>end time</b>
              </TableCell>
              <TableCell align="right">
                <b>Duration</b>
              </TableCell>
              <TableCell align="right">
                <b></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">
                  <button onClick={toggleDrawer}>View Screenshot</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <div style={{ width: "500px" }}>
          <h2 style={{ margin: "2rem" }}>Screenshots</h2>
        </div>
      </Drawer>
    </div>
  );
}
