import * as React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Edit, Trash } from "react-feather";
import { IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import archive from "../../../../assets/images/small/archive.jpeg";

const EditDeleteFolder = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {
        handleEditForm,
        showDeleteModal,
        onArchiveClick,
        onFavouriteClick,
        items,
        isTemplate
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
                    sx={{
                        background: "#e6f8ff"
                    }}
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
              {!isTemplate && (
                <MenuItem >
                  <ShareIcon size={16} style={{ marginRight: "1em" }} />
                  Share
                </MenuItem>
              )}
              {!isTemplate && (
                <MenuItem >
                <StarBorderIcon size={16} style={{ marginRight: "1em" }}
                onClick={onFavouriteClick}
                />
                {`${items?.isFavorite ? 'Unmark' : 'Mark'} as favorite`}
                </MenuItem>
              )}

                <MenuItem onClick={handleEditForm}>
                    <Edit size={16} style={{ color: "#5aa65c", marginRight: "2em" }} />
                    Edit
                </MenuItem>
              {!isTemplate && (
                <MenuItem
                    onClick={onArchiveClick} >
                    <div style={{
                        height: "20px",
                        widht: "20px"
                    }}>
                        <img src={archive}
                            alt=""
                            style={{
                                height: "20px",
                                widht: "20px",
                                marginRight: "1.5em"
                            }} />
                    </div>
                    {`${items?.isFavorite ? 'UnArchive' : 'Archive'} as favorite`}
                </MenuItem>
              )}
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

export default EditDeleteFolder;
