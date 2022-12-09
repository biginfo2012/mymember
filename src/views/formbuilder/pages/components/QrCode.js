import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Input,
  InputAdornment,
  TextareaAutosize,
  FormControl, Button, Card, Dialog, DialogContent
} from '@mui/material';
import LinkIcon from "@mui/icons-material/Link";
import QRCode from "react-qr-code";
import PropTypes from 'prop-types';
import { ArrowBack } from "@mui/icons-material";
import { toast } from "react-toastify";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

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

const Publish = ({ form }) => {
  const [open, setOpen] = useState(false)



  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const [formLink, setFormLink] = useState("")
  // const [iframeCode, setIFrameCode] = useState(

  // )

  // const [formCode, setFormCode] = useState(

  // )

  // const [pageHtml, setPageHtml] = useState("")
  // const [pageCss, setPageCss] = useState("")
  // const [pageJs, setPageJs] = useState("")
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
      console.log(formLink)
      textField.innerText = formLink;
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()
      toast.success("Successfully copied link", toastCSS())
      return
    }
    navigator.clipboard.writeText(formLink).then(function() {
      toast.success("Successfully copied link", toastCSS())
    }, function(err) {

    });

  }

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const svg = document.getElementById("qr-gen");
    const uriData = `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`
    const img = new Image()
    img.src = uriData
    const size = 256;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      [canvas.width, canvas.height] = [size, size]
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0, size, size)

      // 👇 download
      const a = document.createElement("a")
      const quality = 1.0 // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
      a.href = canvas.toDataURL("image/png", quality)
      a.download = "qr-code.png"
      a.append(canvas)
      a.click()
      a.remove()
    }
  };
  useEffect(() => {
    //
    if(!form) {
      return
    }
    let formId = form._id;
    let userId = localStorage.getItem("user_id")
    let link = `${process.env.REACT_APP_BASE_URL}/builder/view/${formId}/${userId}`
    setFormLink(link)

  })

  // const handleFormCode = (e) => {
  //   setFormCode(e.target.value)
  // }
  // const toastCSS = () => {
  //   return {
  //     position: "top-right",
  //     autoClose: 3000,
  //     icon: true,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   };
  // };
  // const copyToClipboard = () => {
  //   var textField = document.createElement('textarea')
  //   textField.innerText = formLink;
  //   document.body.appendChild(textField)
  //   textField.select()
  //   document.execCommand('copy')
  //   textField.remove()
  //   toast.success("Successfully copied link", toastCSS())
  // }

  // const downloadQRCode = () => {
  //   // Generate download with use canvas and stream
  //   const svg = document.getElementById("qr-gen");
  //   const uriData = `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`
  //   const img = new Image()
  //   img.src = uriData
  //   const size = 256;
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     [canvas.width, canvas.height] = [size, size]
  //     const ctx = canvas.getContext("2d")
  //     ctx.drawImage(img, 0, 0, size, size)

  //     // 👇 download
  //     const a = document.createElement("a")
  //     const quality = 1.0 // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
  //     a.href = canvas.toDataURL("image/png", quality)
  //     a.download = "qr-code.png"
  //     a.append(canvas)
  //     a.click()
  //     a.remove()
  //   }
  // };

  return (
    <>
      {/* <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Publish"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Quick Share"  {...a11yProps(0)}/>
                    <Tab label="Embed" {...a11yProps(1)} />
                    <Tab label="Code"  {...a11yProps(2)}/>
                    <Tab label="QR Code"  {...a11yProps(3)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <FormControl>
                        <Input
                            placeholder="link"
                            startAdornment={
                                <InputAdornment position="start">
                                    <LinkIcon />
                                </InputAdornment>
                            }
                            value={formLink}
                            style={{width: 500}}
                        />
                    </FormControl>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TextareaAutosize
                        minRows={20}
                        style={{width: 500}}
                        fullWidth
                        value={iframeCode}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div style={{maxHeight: '100%'}}>
                    <TextareaAutosize
                      minRows={50}
                      style={{width: 500, height: 450}}
                      fullWidth
                      value={formCode}
                      onChange={handleFormCode}
                    />
                  </div>

                </TabPanel>
                <TabPanel value={value} index={3}>
                  <div style={{maxHeight: '100%'}}>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                      <QRCode
                        id="qr-gen"
                        size={512}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={formLink}
                        viewBox={`0 0 512 512`}
                      />
                    </div>
                    <div className="mt-1 d-flex">
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          copyToClipboard();
                        }}>Copy</Button>
                      <Button
                        color="primary"
                        className="ml-1 btn btn-primary"
                        onClick={() => {
                          downloadQRCode();
                        }}
                        >Download</Button>
                    </div>
                  </div>

                </TabPanel> */}

      <Card
        className='m-0'>
        <Button className='primary w-100'>
          <DocumentScannerIcon />  Embed Code
        </Button>
        <div className='m-1'
          style={{
            display: "flex",
            justifyContent: "center",
            width: '100%'
          }}>
          <Typography className="textsecondery">
            Scan the Qr code
          </Typography>
        </div>
        <div className='d-flex justify-content-center m-1'
        >
          <Button
          className='primary'
            onClick={() => { setOpen(!open) }}>View</Button>
        </div>
      </Card>
      <Dialog open={open}
        onClose={() => { setOpen(!open) }}
      >
        <DialogContent>
          <div style={{ maxHeight: '100%' }}>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
              <QRCode
                id="qr-gen"
                size={512}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={formLink}
                viewBox={`0 0 512 512`}
              />
            </div>
            <div className="mt-1 d-flex justify-content-center">
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
                  downloadQRCode();
                }}
              >Download</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Publish
