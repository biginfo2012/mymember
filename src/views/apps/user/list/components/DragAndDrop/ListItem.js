import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import moment from "moment";
import StudentlistuserEyeModal from "../../../../../dashboard1/StudentlistuserEyeModal";
import StudentManageMenu from "../../UserMoreMenu";
import { connect } from "react-redux";
import { Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  SelectSmList: {
    borderRadius: "6px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
    cursor: "pointer",
  },
  classTypography: {
    fontSize: "10.5px",
    marginBottom: "0.5px !important",
  },
}));

const ListItem = (props) => {
  const classes = useStyles();
  const { item, index, chatUsersList, usersChatAlertList } = props;
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              padding: "10px",
              borderRadius: "6px",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              background: "#ffffff",
              margin: "0 0 8px 0",
              display: "grid",
              gridGap: "5px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "90%" }}>
                <Link
                  to={`/student-info/${item._id}`}
                  title={`${item?.firstName} ${item?.lastName}`}
                  style={{
                    cursor: "pointer",
                    alignItems: "center",
                    fontSize: "16px",
                  }}
                  className="d-flex align-items-center justify-content-start text-capitalize"
                >
                  <Avatar
                    style={{ width: "1.8em", height: "1.8em" }}
                    alt={item?.firstName}
                    src={item?.memberprofileImage}
                    className="mr-1"
                  />
                  {item?.firstName
                    ? `${item?.firstName} ${item?.lastName}`
                    : item.fullName}
                </Link>
              </Box>
            </Box>
            <Box>
              {item?.leadsTracking.length > 0 ? (
                <Box>
                  {React.Children.map(item?.leadsTracking, (item) => {
                    if (item !== "") {
                      return (
                        <Chip
                          size="small"
                          className={classes.SelectSmList}
                          label={item}
                          key={item}
                        />
                      );
                    }
                    return (
                      <Chip
                        size="small"
                        className={classes.SelectSmList}
                        label="N/A"
                        key={item}
                      />
                    );
                  })}
                </Box>
              ) : (
                <Chip
                  size="small"
                  className={classes.SelectSmList}
                  label="N/A"
                  key={`source-${item._id}`}
                />
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "block", width: "61%" }}>
                <Typography
                  className={classes.classTypography}
                >{`Entry Date: ${moment(item?.createdAt).format(
                  "MM/DD/YYYY"
                )}`}</Typography>
                {/*${moment(item?.createdAt).format(
                  "hh:mm a"
                )}*/}
              </Box>

              <Box sx={{ display: "flex", width: "39%" }}>
                <StudentlistuserEyeModal studentInfo={item} />
                <StudentManageMenu
                  chatUsersList={chatUsersList}
                  item={item}
                  alertCount={usersChatAlertList[item?._id]}
                />
              </Box>
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};

const mapStateToProps = (state) => {
  return {
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    chatUsersList: state.chatUsers.chatUsersList,
  };
};

export default connect(mapStateToProps)(ListItem);
