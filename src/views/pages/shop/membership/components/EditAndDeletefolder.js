import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ManageFolder from "./manageFolder";
import { IconButton } from "@material-ui/core";
import { Edit,Trash } from "react-feather";

const EditAndDeletefolder = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { handeldelete, itemId, folderName, folderId } = props;
  const [isedit, setEdit] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setEdit(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="ml-1">
        <IconButton className="rounded-circle m-0 p-0" onClick={handleClick}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
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
        <MenuItem
          onClick={() => {
            setEdit(true);
          }}
        >
        <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handeldelete(itemId);
          }}
        >
        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
      {isedit ? (
        <ManageFolder
          folderName={folderName}
          folderId={folderId}
          update={true}
        />
      ) : null}
    </div>
  );
};

export default EditAndDeletefolder;
