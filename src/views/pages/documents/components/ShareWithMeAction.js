import React, { useState } from 'react'
import { Message } from '@mui/icons-material'
import Search from '@material-ui/icons/Search';
import { QuestionMark } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AttachDocxfile from './attacheFiles';
import { UPLOAD_DOCUMENT } from '../../../../redux/actions/document/document';
import { connect } from 'react-redux';
import DocuSign from './DocuSign';
import { X } from 'react-feather';

const ShareWithMeAction = (props) => {
    const { setOpenCreateRecipient, openCreateRecipient } = props
    const [open, setOpen] = useState(false)
    const [openDocuSign, setOpenDocuSign] = useState(false)
    const [state, setState] = useState({});
    const [defaltAlert, setdefaltAlert] = useState(false);


    const fileHandler = async (e) => {
        setdefaltAlert(true);
        // const res = await props.UPLOAD_DOCUMENT(payload, activeSubMainFolder._id);
        setOpen(false);
        setOpenDocuSign(true)
        // if (res) {
        //     setdefaltAlert(false);
        // } else {
        //     setdefaltAlert(true);
        // }
    };

    const HandleFile = (docname, doc) => {
        setState({
            ...state,
            document_name: docname,
            document: doc,
        });
    };

    return (
        <>
            <div className='d-flex justify-content-between align-items-center wrapper'>
                <div>
                    <Message style={{ color: "#00a6e1", fontSize: "40px" }} />
                </div>
                <div className="searchContainer">
                    <Search className="searchIcon" style={{ color: "#00a6e1",height:"4vh"}} />
                    <input className="searchBox" type="search" name="search" placeholder="Search..." />
                </div>
                {/* <div >
                    <button className='createBtn'>Create</button>
                </div> */}
                <div>
                    {!openCreateRecipient ?
                        <Button
                            onClick={() => setOpenCreateRecipient(true)}
                            style={{
                                color: "#fff",
                                height: "4vh",
                                background: "#0184FF",
                                borderRadius: "5px",
                                // width: "90px",
                            }}>
                            Create
                        </Button>
                        : ""}
                    {/* <Dialog
                        open={open}
                        fullScreen
                        onClose={() => setOpen(false)}
                    // aria-labelledby="alert-dialog-title"
                    // aria-describedby="alert-dialog-description"
                    >
                        <DialogContent className="p-1">
                            <AttachDocxfile
                                title={"Click or drag and drop to Attach your DocxFile"}
                                handleDocument={HandleFile}
                            />
                            <div className="d-flex justify-content-around m-1">
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpen(false)}
                                    style={{
                                        textTransform: "none",
                                        fontWeight: "600",
                                        borderRadius: "6px",
                                        margin: "1em",
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        fontWeight: "600",
                                        borderRadius: "6px",
                                        background: "#2796f3",
                                        color: "#fff",
                                        margin: "1em",
                                    }}
                                    onClick={fileHandler}
                                    variant="contained"
                                    autoFocus
                                >
                                    Upload
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog> */}
                </div>
                <div onClick={props.handleClick} className="d-flex justify-content-center align-items-center" style={{ background: "rgb(169 222 240)", padding: "5px", borderRadius: "50%", height: "35px", width:"35px"}}>
                    <QuestionMark style={{ color: "rgb(15 137 179)" }} />
                </div>
                <Dialog className="p-0" fullScreen maxWidth open={openDocuSign}>
                    <DialogTitle className="d-flex justify-content-end">
                        <div className="close-icon">
                            <X
                                className="cursor-pointer"
                                size={20}
                                onClick={() => setOpenDocuSign(false)}
                            />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DocuSign setOpenDocuSign={setOpenDocuSign} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.document,
    };
};

export default connect(mapStateToProps, { UPLOAD_DOCUMENT })(ShareWithMeAction);