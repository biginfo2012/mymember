import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import BasicTable from "./Table";
import { Card } from "@mui/material";
import { Col, Row } from "reactstrap";
import axios from "axios";

const base_url = "http://localhost:3001";
const columns = [
  { type: "string", id: "Room" },
  { type: "string", id: "Name" },
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" },
];

const rows = [
  ["Magnolia Room", "", new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)],
  [
    "Magnolia Room",
    "Project 1",
    new Date(0, 0, 0, 12, 0, 0),
    new Date(0, 0, 0, 13, 30, 0),
  ],
  [
    "Magnolia Room",
    "Project 2",
    new Date(0, 0, 0, 14, 0, 0),
    new Date(0, 0, 0, 15, 30, 0),
  ],
  [
    "Magnolia Room",
    "Project 1",
    new Date(0, 0, 0, 16, 0, 0),
    new Date(0, 0, 0, 17, 30, 0),
  ],
  [
    "Magnolia Room",
    "",
    new Date(0, 0, 0, 24, 0, 0),
    new Date(0, 0, 0, 24, 0, 0),
  ],
];
const data = [columns, ...rows];

const pieChartColumns = [
  { type: "string", id: "DailyReport" },
  { type: "number", id: "WorkPercent" },
];

export const options = {
  title: "My Daily Activities",
};

export const WorkHistoryPanel = (props) => {
  const [timelineData, setTimelineData] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  const { employeeId } = props;
  React.useEffect(() => {
    async function initialize() {
      const response = await axios.get(
        `${base_url}/api/workhistory/${employeeId}`
      );
      console.log("work history is", response.data);
      const responseTimeline = [
        ["Shimiro", "", new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0)],
      ];
      let totalworktime = 0;
      setTableData(response.data);
      response.data.map((item) => {
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);
        totalworktime += endTime - startTime;
        responseTimeline.push([
          "Shimiro",
          "Project1",
          new Date(
            0,
            0,
            0,
            startTime.getHours(),
            startTime.getMinutes(),
            startTime.getSeconds()
          ),
          new Date(
            0,
            0,
            0,
            endTime.getHours(),
            endTime.getMinutes(),
            endTime.getSeconds()
          ),
        ]);
      });
      const totalDaytime =
        new Date(0, 0, 0, 24, 0, 0) - new Date(0, 0, 0, 0, 0, 0);
      const currentTime = new Date();
      const restTime =
        new Date(
          0,
          0,
          0,
          currentTime.getHours(),
          currentTime.getMinutes(),
          currentTime.getSeconds()
        ) -
        new Date(0, 0, 0, 0, 0, 0) -
        totalworktime;

      const remainingTime = totalDaytime - totalworktime - restTime;
      setPieChartData([
        ["Task", "Hours per Day"],
        ["Work", totalworktime],
        ["Rest", restTime],
        ["Remaining", remainingTime],
      ]);
      responseTimeline.push([
        "Shimiro",
        "",
        new Date(0, 0, 0, 24, 0, 0),
        new Date(0, 0, 0, 24, 0, 0),
      ]);
      setTimelineData([columns, ...responseTimeline]);
    }
    initialize();
  }, []);

  return (
    <div className="App">
      <Col sm="12">
        <Row>
          {timelineData && timelineData.length && (
            <Chart
              chartType="Timeline"
              data={timelineData}
              width="100%"
              height="100px"
              controls={[
                {
                  controlType: "CategoryFilter",

                  options: {
                    filterColumnIndex: 1,
                  },
                  controlPosition: "bottom",
                },
              ]}
            />
          )}
        </Row>
        <Row>
          <Col sm="6">
            <Card style={{ width: "100%" }}>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={pieChartData}
                options={options}
              />
            </Card>
          </Col>
          <Col sm="6">
            <BasicTable data={tableData} />
          </Col>
        </Row>
      </Col>
    </div>
  );
};
