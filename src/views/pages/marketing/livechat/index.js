import { Card } from "@mui/material";
import React from "react";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import FilterDrawer from "../ticket/filterDrawer";
import TicketTable from "./ticketTable";
import TicketViewList from "./ticketViewList";

const LiveChatPage = () => {
  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Live Chat"
        breadCrumbParent="Marketing"
        breadCrumbActive="Live Chat"
      />
      <div style={{ display: "flex", flexDirection: "row", fontSize: '14px',}}>
        <TicketViewList />
        <Card sx={{ padding: "20px", margin: '1rem', width:'100%'}}>
          <TicketTable />
        </Card>
        <FilterDrawer />
      </div>
    </React.Fragment>
  );
};

export default LiveChatPage;
