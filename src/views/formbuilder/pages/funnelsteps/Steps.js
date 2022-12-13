import {
    TextField, Button, Card,
    CardContent
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Edit } from 'react-feather';
import { CREATE_FORM } from "../../../../redux/actions/form-builder";
import { useDispatch, } from "react-redux";
import { useHistory } from "react-router-dom";
import ConfirmationModal from '../../../../components/gloabal/confirmation';
import { toast } from "react-toastify";

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
const Steps = ({
    formId,
    removeStep, activeStep
    , openFormProperties,
}) => {
    const [defaultAlert, setdefaultAlert] = useState(false)
    const [publicLink, setPublicLink] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const editTemplate = async () => {

        if (formId !== undefined) {
            history.push(`/builder/home/${formId}`)
        } else {
            let response = await dispatch(CREATE_FORM())
            let newFormId = await response.data.formId
            history.push(`/builder/home/${newFormId}`)
        }
    }


    useEffect(() => {
      if(formId) {
        let userId = localStorage.getItem("user_id")
        let link = `${process.env.REACT_APP_BASE_URL}/builder/view/${formId}/${userId}`;
        setPublicLink(link);
      }

    }, [formId]);

    const copyClipBoard = () => {
        var textField = document.createElement('textarea')
        textField.innerText = publicLink;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success("Successfully copied link", toastCSS())
    }
    return (
        <div className='w-100'>
            <div className='d-flex justify-content-around w-100'>
                <div className='d-flex w-100'>
                    <TextField
                        fullWidth
                        style={{
                            border: "1px solid #b8c2cc",
                            width: "80%",
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                        }}
                        variant={"outlined"}
                        size="small"
                        type="text"
                        name="customId"
                        value={publicLink}
                        contentEditable={false}
                    />
                    <Button className='primary'
                        style={{
                            borderRadius: '0px 10px 10px 0px'
                        }}
                        variant='contained'
                        onClick={()=> copyClipBoard()}
                    >
                        <FileCopyIcon /> Copy Url
                    </Button>
                </div>
                <Button variant='outlined'
                    style={{
                        borderRadius: '8px',
                        width: '20%'
                    }}
                >
                    <RemoveRedEyeIcon /> View
                </Button>
            </div>
            <div>
                <Card
                    style={{ height: "100%", borderRadius: 10, marginTop: "1em" }}
                    className={`shadow`}
                >
                    <CardContent>
                        <iframe
                            scrolling="no"
                            className="shadow-sm"
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                border: "none",
                                height: "400px",
                                borderRadius: 10,
                            }}
                            src={"https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"}
                        />
                    </CardContent>
                </Card>
                <div className='d-flex justify-content-end mt-2' >
                    <Button variant='contained' className='primary' onClick={() => editTemplate()}>
                        <Edit /> Edit Page
                    </Button>
                    <Button variant='outlined' className='ml-1'
                        onClick={() => { setdefaultAlert(!defaultAlert) }}
                    >
                        Remove
                    </Button>
                    <Button variant='outlined' className='ml-1' color="info">
                        Clone
                    </Button>
                </div>
            </div>
            <ConfirmationModal
                primaryColor="#0483fd"
                secondaryColor="#fff"
                imagePath="/images/delete.png"
                open={defaultAlert}
                title="Are you sure?"
                onConfirm={() => {
                    removeStep(activeStep);
                    setdefaultAlert(false)
                }}
                onCancel={() => {
                    setdefaultAlert(!defaultAlert);
                }}
                onCancelButtonTitle={"Cancel"}
                contiunuebuttonTitle={"Yes"}
                description="Do you want to Remove this step ?"
            />
        </div >
    )
}

export default Steps
