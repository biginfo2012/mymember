import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  nameAvatar: {
    borderRadius: "50%",
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    color: "white",
    height: "40px",
    width: "47px",
    padding: "auto",
    display: "flex",
    fontSize: "16px",
    alignItems: "center",
    justifyContent: "center",
  },
  color: (props) => props.color,
});

const NameAvatar = (props) => {
  const classes = useStyles(props);
  const displayNames = props.displayName?.split(" ");

  return <div className={classes.nameAvatar}>{displayNames?.map((item) => item.charAt())}</div>;
};

export default NameAvatar;
