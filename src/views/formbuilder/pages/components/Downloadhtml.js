import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button, Card,
  Dialog,
  DialogContent,
  TextareaAutosize,
  Grid,
  DialogActions
} from '@mui/material';
import LinkIcon from "@mui/icons-material/Link";
import QRCode from "react-qr-code";
import PropTypes from 'prop-types';
import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import {
  DownloadOutlined
} from '@ant-design/icons';

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

const Downloadhtml = ({ form }) => {
  const [open, setOpen] = useState(false)

  const [formCode, setFormCode] = useState()

  useEffect(() => {
    //
    if(!form) {
      return
    }
    let formData = JSON.parse(form.formData.replace(/^"|"$/g, ""))
    
    let html = formData['gjs-html'].replace(/^"|"$/g, "");
    let css =  formData['gjs-css'].replace(/^"|"$/g, "");


    //builder/view/process/newstudent/'+ id
    // html = html?.replace('<body>', '<body><form method="post" action="/builder/view/process/newstudent' + id + '/' + userId + '">')
    // html = html?.replace('</body>', '</form></body>')

    let uform = `<html>
                        <head>
                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
                            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
                            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js"></script>
                            <script type="text/javascript" src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
                            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
                            <script type="text/javascript" src="https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js"></script>
                            <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css">
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
                            <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css">
                            <link rel="stylesheet" href="${window.location.origin}/css/grapes-form.css">
                            <style>
                                ${css}
                            </style>
                            <script>

                            </script>
                        </head>
                        ${html}
                    </html>
                    `
    setFormCode(uform)
  })

  const handleFormCode = (e) => {
    setFormCode(e.target.value)
  }
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
      textField.innerText = formCode;
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
      toast.success("Successfully copied html code", toastCSS())
      return
    }
    navigator.clipboard.writeText(formCode).then(function() {
      toast.success("Successfully copied html code", toastCSS())
    }, function(err) {

    });
  }

  const downloadCode = () => {
    // Generate download with use canvas and stream
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(formCode));
    element.setAttribute('download', "download.html");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <>
      <Card
        className='m-0'
      >
        <Button className='primary w-100'>
          <DownloadOutlined className='mr-1' />  Download HTML
        </Button>
        <div
          className='m-1'
          style={{
            display: "flex",
            justifyContent: "center",
            width: '100%'
          }}>
          <Typography className="textsecondery">
            Download the .html file of your page to host anywhere
          </Typography>
        </div>
        <div className='d-flex justify-content-center m-1'
        >
          <Button
          className='primary'
            onClick={() => { setOpen(!open) }}>Download</Button>
        </div>
      </Card>
      <Dialog open={open}
        onClose={() => { setOpen(!open) }}
      >
        <DialogContent>
          <div style={{ maxHeight: '100%' }}>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 400, width: "100%" }}>
              <TextareaAutosize
                minRows={50}
                style={{ width: '400px', height: '400px' }}
                fullWidth
                value={formCode}
                onChange={handleFormCode}
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
            <Button
              color="primary"
              className="ml-1 btn btn-primary"
              onClick={() => {
                downloadCode();
              }}
            >Download</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Downloadhtml
