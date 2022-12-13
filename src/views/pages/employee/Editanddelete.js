import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Edit, Trash } from "react-feather";
import { IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Editanddelete = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    handleEditForm,
    showDeleteModal,
  } = props;
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
        <IconButton
          className='rounded-circle'
          onClick={handleClick}
        >
          <MoreHorizIcon />
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
            transform: "none !importent",
          },
        }}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <MenuItem onClick={handleEditForm}>
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "2em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={showDeleteModal}
        >
          <Trash style={{ color: "#e05252", marginRight: "1.9em" }} size={16} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Editanddelete;
