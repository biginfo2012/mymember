import React from "react";
import {
  Card,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { set_viewlist_selected_index } from "../../../../redux/actions/marketing/livechat";
import { connect } from "react-redux";
import { viewlistItems } from "./const";
import { Typography } from "@material-ui/core";

const TicketViewList = (props) => {
  const { viewlistSelectedIndex, set_viewlist_selected_index } = props;

  const handleListItemClick = (event, index) => {
    set_viewlist_selected_index(index);
  };

  const ViewListSubHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Tickets</Typography>
        <Chip label="2" color="primary" />
      </div>
    );
  };

  return (
    <div>
      <Card style={{ width: "250px", margin: "1rem", paddingTop:'1rem' }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          subheader={<ListItemText sx={{marginLeft: '20px', fontSize: '16px', fontWeight: "bold"}} primary="Tickets" />}
        >
          <Divider />
          {viewlistItems.map((item, index) => {
            return (
              <ListItemButton
                selected={viewlistSelectedIndex === index}
                key={index}
                onClick={(event) => handleListItemClick(event, index)}
                sx={{justifyContent:'space-between'}}
              >
                <ListItemText primary={item} />
                <Chip label="2" color="primary" size="small" />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    viewlistSelectedIndex: state.livechat.viewlistSelectedIndex,
  };
};

export default connect(mapStateToProps, { set_viewlist_selected_index })(
  TicketViewList
);
