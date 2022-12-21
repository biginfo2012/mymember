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
import { useHistory, useParams } from "react-router-dom";

const TicketViewList = (props) => {
  const history = useHistory();
  const { viewlistSelectedIndex, set_viewlist_selected_index, tickets } = props;
  const { ticketStatus } = useParams();
  const handleListItemClick = (event, index) => {
    set_viewlist_selected_index(index);
    let ticketStatus;
    if (index === 0) ticketStatus = "all";
    else ticketStatus = viewlistItems[index];
    history.push(`/app/ticket/ticketview/overview/${ticketStatus}`);
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
      <Card style={{ width: "250px", margin: "1rem", paddingTop: "1rem" }}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          // subheader={<ListItemText sx={{marginLeft: '20px', fontSize: '16px', fontWeight: "bold"}} primary="Tickets" />}
        >
          {viewlistItems.map((item, index) => {

            let result;
            if (index === 0) result = tickets;
            else {
              result = tickets?.filter(
                (ticket) => ticket.status.toLowerCase() === item.toLowerCase()
              );
            }
            const count = result.length.toString();
            return (
              <>
                <ListItemButton
                  selected={viewlistSelectedIndex === index}
                  key={index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{ justifyContent: "space-between" }}
                >
                  <ListItemText primary={item} />
                  <Chip label={count} color="primary" size="small" />
                </ListItemButton>
                {index === 0 ? <Divider /> : null}
              </>
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
    tickets: state.ticket.tickets,
  };
};

export default connect(mapStateToProps, { set_viewlist_selected_index })(
  TicketViewList
);
