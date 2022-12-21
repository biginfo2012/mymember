import { Card } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { makeStyles } from "@material-ui/styles";
import InfoCard from "./InfoCard";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { get_ticket_by_id } from "../../../../redux/actions/marketing/ticket";
const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 220px)",
  },
  messageBodyCard: {
    padding: "30px",
    width: "100%",
    marginRight: "1rem",
    height: "100%",
  },
  infoPanel: {
    width: "400px",
  },
});

const TicketDetailPage = (props) => {
  const classes = useStyle();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rendering hook functions
  useEffect(scrollToBottom, [ticket]);

  useEffect(() => {
    (async () => {
      const response = await get_ticket_by_id(ticketId);
      setTicket(response);
      console.log("response is ", response);
    })();
  }, []);

  const updateTicket = (newTicket) => {
    setTicket(newTicket);
  }

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle={ticket.ticketName} // Ticket Name
        breadCrumbParent="ticket"
        breadCrumbActive="Detail"
      />
      <div className={classes.container}>
        <Card className={classes.messageBodyCard}>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                flex: "1 1 auto",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {ticket &&
                ticket.messages &&
                ticket.messages.length > 0 &&
                ticket.messages.map((message) => {
                  return <Message
                    senderName="Xing Liao"
                    message={message.msg}
                    dateTime="Thu, 9 Dec 2022, 6.04 PM"
                  />;
                })}
              <div style={{ display: "inline-block" }}>
                Xing Liao changed ticket status from <b>Open</b> to{" "}
                <b>Pending</b>
              </div>
              <Message
                senderName="Xing Liao"
                attachments={[]}
                message="This ticket is opened now"
                dateTime="Thu, 9 Dec 2022, 6.04 PM"
              />
              <div ref={messagesEndRef} />
            </div>
            <div
              style={{
                display: "flex",
                flex: "0 0 auto",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MessageInput ticket={ticket} setTicket={updateTicket} />
            </div>
          </div>
        </Card>
        <div className={classes.infoPanel}>
          <InfoCard ticket={ticket} />
          <InfoCard />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tickets: state.ticket.tickets,
  };
};

export default connect(mapStateToProps, {})(TicketDetailPage);
