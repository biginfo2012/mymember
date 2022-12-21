import { Card, Divider } from "@mui/material";
import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  container: {
    border: "solid 1px #e4e8ec",
    borderRadius: "8px",
    marginTop: "8px",
    padding: "18px 18px 10px",
    fontSize: "15px",
    lineHeight: "16px",
    overflow: "hidden",
    color: "#424D57",
  },
  caption: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "16px",
    marginBottom: "14px",
    textAlign: "left",
  },

  detailRow: {
    marginBottom: "8px",
    display: "flex",
    flexDirection: "row",
    lineHeight: "20px",
  },
  detailCaption: {
    color: "#677179",
    marginRight: "3px",
  },
  clickLabel: {
    color: "#4284f5",
    cursor: "pointer",
    marginLeft: "5px",
  },
  linkUrl: {
    display: "flex",
    flexDirection: "row",
  },
});

const InfoCard = ({ ticket }) => {
  const classes = useStyle();
  const createdDate = useMemo(() => {
    if(ticket && ticket.messages){
      const created = new Date(ticket.createdAt);
      return created.getFullYear() + "." + (created.getMonth() + 1).toString() + "." + created.getDate(); 
      
    }
  }, [ticket])
  
  const updatedDate = useMemo(() => {
    if(ticket && ticket.messages){
      const updated = new Date(ticket.messages[ticket.messages.length - 1].createdAt);
      return updated.getFullYear() + "." + (updated.getMonth() + 1).toString() + "." + updated.getDate(); 
    }
  }, [ticket])
  

  return (
    <div>
      {ticket && ticket.messages && ticket.messages.length > 0 && (
        <Card className={classes.container}>
          <div className={classes.caption}>Ticket Info</div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Ticket ID:</div>
            <div className={classes.linkUrl}>
              {ticket._id}
              <div className={classes.clickLabel}>Copy URL</div>
            </div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Created:</div>
            <div>{createdDate}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Last Message:</div>
            <div>{updatedDate}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Status:</div>
            <div>{ticket.status}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Priority:</div>
            <div>{ticket.priority}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Source:</div>
            <div>Created Manually</div>
          </div>
          <Divider sx={{ marginY: "12px" }} />
          <div className={classes.detailRow}>
            <div className={classes.detailCaption}>Tags:</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.clickLabel}>+ Add Tag</div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default InfoCard;
