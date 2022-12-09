import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Typography, Grid, Chip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { GET_DOCUSIGN_PDF_BY_ID } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';
import { CustomInput, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from 'react-router-dom';



const styleList = {
    width: '100%',
    marginTop: 4,
    borderLeft: '4px solid #6357c1',
    border: '1px solid #ececec',
    cursor: 'pointer',
    background: '#f8f8f8',
    padding: 4

}
const successBtn = {
    borderLeft: '4px solid #6357c1',
    border: '2px solid #fff',
    cursor: 'pointer',
    background: '#77d568',
    color: "#fff",
}

const HowToUseDocuSign = (props) => {
    const { startProcess, handleSubmitDate, setItems, items, dataAfterInviteUser, GET_DOCUSIGN_PDF_BY_ID, currentEmailToken } = props
    const [loading, setLoading] = useState(false)
    const [isdisabled, setIsdisabled] = useState(true)
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };




    React.useEffect(() => {
        let inviteAndOwner = []
        let copyItems = { ...items };
        for (let [key, value] of Object.entries(copyItems)) {
            for (let [k, v] of Object.entries(value)) {
                for (let itmObj of v) {
                    if (itmObj?.signer === 'owner' && !inviteAndOwner.includes('owner')) {
                        inviteAndOwner.push('owner')
                    } else if (itmObj?.signer === 'invite' && !inviteAndOwner.includes('invite')) {
                        inviteAndOwner.push('invite')
                    }
                }
            }
        }
        if (inviteAndOwner.includes('owner') && inviteAndOwner.includes('invite')) {
            setIsdisabled(false)
        }
    }, [items])

    const downloadPdf = async () => {
        setLoading(true)
        let res = await GET_DOCUSIGN_PDF_BY_ID(dataAfterInviteUser?._id, currentEmailToken)
        if (res?.success) {
            setLoading(false)
            let linkSource = `data:application/pdf;base64,${res.data}`;
            let downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
            downloadLink.href = linkSource;
            downloadLink.target = '_self';
            downloadLink.download = 'yourSignature.pdf';
            downloadLink.click();
        } else {
            setLoading(false)
        }
    }

    return (
        <div className='p-1'>
            <Grid container spacing={2}>
                <Grid item sm={6} md={6} lg={6}>
                    <div className='d-flex'>
                        <Chip onClick={() => {
                            history.fromback = true
                            history.goBack()
                        }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                        <Button
                            className='ml-1'
                            startIcon={<CloseIcon />}
                            variant='outlined'
                            style={{ color: "#c94d59", borderColor: "#c94d59" }}
                        // onClick={() => { setOpen(false) }}
                        // color='secondary'
                        >

                            Close
                        </Button>
                    </div>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                    <div className='d-flex justify-content-end align-items-center'>
                        <div>
                            <Button
                                onClick={handleClick}
                                style={{ color: "black" }}
                            >
                                Action<KeyboardArrowDownIcon fontSize='small' />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Edit Recipients</MenuItem>

                            </Menu>
                        </div>
                        <Button
                            className="ml-2"
                            style={{
                                color: "#6b6b6b",
                                height: 40,
                                borderRadius: "4px",
                                width: "100px",
                                border: "1px solid #b8c2cc",
                            }}
                        // onClick={props?.handleClose}
                        >
                            Preview
                        </Button>
                        <Button
                            className="ml-2"
                            style={{
                                color: "#fff",
                                height: 40,
                                background: "#0184FF",
                                borderRadius: "4px",
                                width: "90px",
                            }}
                        // onClick={props?.handleClose}
                        >
                            Send
                        </Button>

                    </div>
                </Grid>

            </Grid>
        </div>
    );
}


export default connect(null, { GET_DOCUSIGN_PDF_BY_ID })(HowToUseDocuSign);