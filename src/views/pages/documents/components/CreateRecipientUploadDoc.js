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

const CreateRecipientUploadDoc = (props) => {
    const { setOpenCreateRecipient } = props

    const [openDocuSign, setOpenDocuSign] = useState(false)
    const [state, setState] = useState({});
    const [defaltAlert, setdefaltAlert] = useState(false);

    const handleCloseCreate = () => {
        setOpenDocuSign(false)
        setOpenCreateRecipient(false)
    }

    const fileHandler = async (e) => {
        setdefaltAlert(true);
        // const res = await props.UPLOAD_DOCUMENT(payload, activeSubMainFolder._id);
        // setOpenCreateRecipient(false);
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
            <div className='mt-2'>
                <AttachDocxfile
                    title={"Click or drag and drop to Attach your DocxFile"}
                    handleDocument={HandleFile}
                />
                <div className="d-flex justify-content-between mx-4 mb-2">
                    <Button
                        variant="outlined"
                        onClick={() => setOpenCreateRecipient(false)}
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
                        onClick={() => setOpenDocuSign(true)}
                        variant="contained"
                        autoFocus
                    >
                        Upload
                    </Button>
                </div>

                <Dialog className="p-0" fullScreen open={openDocuSign}>
                    <DialogTitle className="d-flex justify-content-end">
                        <div className="close-icon">
                            <X
                                className="cursor-pointer"
                                size={20}
                                onClick={
                                    // () => setOpenDocuSign(false)
                                    handleCloseCreate
                                }
                            />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DocuSign setOpenDocuSign={setOpenDocuSign} setOpenCreateRecipient={setOpenCreateRecipient} />
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

export default connect(mapStateToProps, { UPLOAD_DOCUMENT })(CreateRecipientUploadDoc);