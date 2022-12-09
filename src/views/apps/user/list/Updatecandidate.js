import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Edit, Trash } from "react-feather";

const EditDeleteFolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handleEdit, handleDelete, isDisable, handleCancelEdit } = props;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="ml-1">
        <MoreVertIcon fontSize="small" onClick={handleClick} />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(-77%) translateY(32%)",
          },
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        {
          isDisable ?
            <MenuItem
              onClick={handleEdit}
            >
              <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
              Edit
            </MenuItem>
            :
            <MenuItem
              onClick={handleCancelEdit}
            >
              <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
              Cancel Edit
            </MenuItem>
        }

        <MenuItem
          onClick={handleDelete}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EditDeleteFolder;
