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
import { Card } from "@mui/material";
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const mockRows = [
  createData("Project 1", "03:17:23", "03:18:20", "1m 3s"),
  createData("Project 1", "15:53:32", "16:58:45", "1m 5m 13s"),
];

// const base_url = 'http://localhost:3001'
const base_url = 'https://mymember.com'
export default function BasicTable(props) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);
  const [screenshots, setScreenshots] = React.useState([]);
  const toggleDrawer = async (index) => {
    setSelectedRowIndex(index);
    console.log("props data", props.data);
    if(openDrawer === false) {
      const response = await axios.get(`${base_url}/api/workhistory/screenshot/${props.data[index]._id}`);
      if(response.status === 200){
        setScreenshots(response.data)
      }
    }
    setOpenDrawer(!openDrawer);
    
  };
  const rows = props.data.map((item) => {
    const displayStartTime = new Date(item.startTime).toLocaleDateString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    const displayEndTime = new Date(item.endTime).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);

    return createData(
      item.description,
      displayStartTime,
      displayEndTime,
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
            {rows.map((row, index) => (
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
                  <button onClick={(e) => toggleDrawer(index)}>
                    View Screenshot
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <div style={{ width: "400px", backgroundColor: "#f8f8f8" }}>
          <h2 style={{ margin: "2rem" }}>Screenshots</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {screenshots.length > 0 && 
              screenshots.map((screenshot) => {
                return (
                  <Card style={{ margin: "1rem" }}>
                    <img
                      src={screenshot.screenshot}
                      width={200}
                      height={150}
                      alt="screenshot"
                    />
                    <p>
                      {new Date(screenshot.trackTime).toLocaleDateString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </Card>
                );
              })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
