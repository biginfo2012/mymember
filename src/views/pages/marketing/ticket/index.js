import { Card } from "@mui/material";
import React, { useEffect } from "react";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import FilterDrawer from "./filterDrawer";
import TicketTable from "./ticketTable";
import TicketViewList from "./ticketViewList";
import { useParams } from "react-router-dom";

const TicketPage = () => {
  
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

export default TicketPage;
