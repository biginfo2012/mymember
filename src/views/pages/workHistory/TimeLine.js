import { Card } from "@mui/material";
import React from "react";
import TimeRuler from "./TimeRuler";
import { makeStyles } from "@material-ui/styles";
import { PlayArrow, Stop } from "@mui/icons-material";
import { formatTime } from "./utils";

const useStyle = makeStyles({
  timelineBox: {
    marginTop: "-15px",
  },
  timelineHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  startEndDiv: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "12px",
    marginRight: "12px",
    color: "#a4a7b2",
  },
  indexWrapper: {
    display: "flex",
    flexDirection: "row",
    color: "#a4a7b2",
    marginRight: "20px",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
  },
});

const TimeLineCard = (props) => {
  const classes = useStyle();
  return (
    <div style={{ width: "100%" }}>
      <Card sx={{ marginTop: "1rem", marginBottom: "1rem", padding: "20px" }}>
        <div
          style={{ fontSize: "20px", fontWeight: "600", textAlign: "start" }}
        >
          Today
        </div>
        <div className={classes.timelineBox}>
          <div className={classes.timelineHeader}>
            <div className={classes.startEndDiv}>
              <PlayArrow />
              <div style={{ marginLeft: "4px", marginRight: "4px" }}>
                Start time:
              </div>
              <div>
                {" "}
                {props.timelineData && props.timelineData.length > 0
                  ? formatTime(props.timelineData[0].start)
                  : "--"}
              </div>
            </div>
            <div className={classes.startEndDiv}>
              <Stop />
              <div style={{ marginLeft: "4px", marginRight: "4px" }}>
                End time:
              </div>
              <div>
                {props.timelineData && props.timelineData.length > 0
                  ? formatTime(
                      props.timelineData[props.timelineData.length - 1].end
                    )
                  : "--"}
              </div>
            </div>
          </div>
          <TimeRuler data={props.timelineData} />
        </div>
        <div className={classes.flexRow}>
          <div className={classes.indexWrapper}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#27c26c",
              }}
            ></div>
            <div style={{ fontSize: "12px", marginLeft: "8px" }}>
              Tracked Time
            </div>
          </div>
          <div className={classes.indexWrapper}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#f7b82f",
              }}
            ></div>
            <div style={{ fontSize: "12px", marginLeft: "8px" }}>
              Manual Time
            </div>
          </div>
          <div className={classes.indexWrapper}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#a4a7b2",
              }}
            ></div>
            <div style={{ fontSize: "12px", marginLeft: "8px" }}>
              Ideal Time
            </div>
          </div>
          <div className={classes.indexWrapper}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#3c4ad9",
              }}
            ></div>
            <div style={{ fontSize: "12px", marginLeft: "8px" }}>Rest Time</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimeLineCard;
