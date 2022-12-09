import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button, Card,
    Dialog,
    DialogContent,
    TextareaAutosize,
    DialogActions
} from '@mui/material';
import PropTypes from 'prop-types';
import {
    LinkOutlined,
} from '@ant-design/icons';
import {toast} from "react-toastify";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const EmbedCode = ({ form }) => {
    const [open, setOpen] = useState(false)
    const [iframeCode, setIFrameCode] = useState(

    )

    useEffect(() => {
        //
      if(form) {
        let userId = localStorage?.getItem("user_id")
        let link = `${process?.env?.REACT_APP_BASE_URL}/builder/view/${form._id}/${userId}`

        setIFrameCode(`<iframe src="${link}" width='100%'> </iframe>`)
      }

    })

    const toastCSS = () => {
      return {
        position: "top-right",
        autoClose: 3000,
        icon: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };
    };
    const copyToClipboard = () => {
      if (!navigator.clipboard) {
        var textField = document.createElement('textarea')
        textField.innerText = iframeCode;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success("Successfully copied iframe code", toastCSS())
        return
      }
      navigator.clipboard.writeText(iframeCode).then(function() {
        toast.success("Successfully copied iframe code", toastCSS())
      }, function(err) {

      });
    }
    return (
        <>
            <Card
                className='m-0'>
                <Button className='primary w-100'>
                    <LinkOutlined className='mr-1' />  Embed Code
                </Button>
                <div className='m-1' style={{
                    display: "flex",
                    justifyContent: "center",
                    width: '100%'
                }}>
                    <Typography className="textsecondery">
                        Add your page inside of an iframe to embed on any website
                    </Typography>
                </div>
                <div className='d-flex justify-content-center m-1'
                >
                    <Button
                        className='primary'
                        onClick={() => { setOpen(!open) }}>View</Button>
                </div>            </Card>
            <Dialog open={open}
                onClose={() => { setOpen(!open) }}
            >
                <DialogContent>
                    <div style={{ maxHeight: '100%' }}>
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 400, width: "100%" }}>
                            <TextareaAutosize
                                minRows={20}
                                style={{ width: '400px' }}
                                fullWidth
                                value={iframeCode}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className=' d-flex justify-content-center'>
                    <div className="mt-1 d-flex justify-content-between">
                        <Button
                            className="btn btn-primary"
                            onClick={() => {
                              copyToClipboard();
                            }}
                        >Copy</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EmbedCode
