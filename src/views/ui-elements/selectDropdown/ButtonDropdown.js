import React, { useState } from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import { UPDATE_LEAD_STATUS } from "../../../redux/actions/newstudent";

const useStyles = makeStyles(() => ({
  formControl: {
    "& .MuiInputBase-root": {
      color: "#00a9e2",
      borderColor: "#00a9e2",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "100px",
      minWidth: "85px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#00a9e2",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#00a9e2",
    },
    "& li.Mui-selected:hover": {
      background: "#00a9e2",
    },
  },
}));

const ButtonDropDown = ({ value, handleChange, items, leadId }) => {
  const classes = useStyles();
  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };

  const [stageValue, setStageValue] = useState(value);

  const handleStageClick = async (leadStatus) => {
    console.log(leadStatus, leadId, "clicked");
    setStageValue(leadStatus);
    const response = await UPDATE_LEAD_STATUS(
      {
        leadStatus: leadStatus,
      },
      leadId
    );
    if (!response.success) {
      return;
    }
  };

  return (
    <UncontrolledButtonDropdown
      tag="li"
      className="dropdown-user nav-item"
      key={leadId}
    >
      <DropdownToggle className="p-0">
        <Chip
          label={stageValue}
          size="small"
          style={{
            color: "#00a6e1",
            background: "#b7c9cf !important",
            minWidth: "80px",
          }}
        />
      </DropdownToggle>
      <DropdownMenu right>
        {items?.map((item, i) => {
          return (
            <DropdownItem
              style={{
                width: "100%",
                color: item.color,
                background: `${item.color} !important`,
                fontWeight: "600",
              }}
              key={i}
              onClick={() => handleStageClick(item.key)}
            >
              {item.key}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

export default ButtonDropDown;
