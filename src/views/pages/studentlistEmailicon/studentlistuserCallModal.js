import React, { useState } from "react";
import { ModalHeader, ModalBody } from "reactstrap";
import { PhoneCall } from "react-feather";
import HorizontalCallForm from "./CallstForm";
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
// import EmailstForm from "./emailstForm";
import { Dialog, IconButton } from "@material-ui/core";
import VoicemailIcon from '@mui/icons-material/Voicemail';
import Avatar from "../../../assets/avatar-profile.jpg"
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
const StudentlistuserCallModal = (props) => {
  const [state, setState] = useState(false);

  const toggleModal = () => {
    setState(!state);
  };

  return (
    <div>
      <React.Fragment >
        <IconButton onClick={toggleModal} style={{ paddingLeft: "0" }}>
          <PhoneCall size={20} />
        </IconButton>
        <Dialog open={state} maxWidth="lg" >
          {/* <ModalHeader toggle={toggleModal} style={{backgroundColor:'black' , borderRadius:0}}>Calling Module</ModalHeader> */}
          <ModalBody style={{ backgroundColor: 'black' , padding:20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src={Avatar} style={{ width: 50, height: 50, borderRadius: 100, marginRight: 15 }} />
                <div style={{ display: 'flex',justifyContent:"center", flexDirection: 'row', }}>
                  <LockIcon size={15} style={{ color: 'white' }} />
                  <p style={{ color: 'white' }}>end-to-end encrypted</p>
                </div>
              </div>
              <div>
                <IconButton onClick={toggleModal}>
                  <CloseIcon size={20} style={{ color: 'white' }} />
                </IconButton>
              </div>
            </div>
            <HorizontalCallForm item={props.item} toggleModal={toggleModal} />
            {/* <EmailstForm item={props.item} toggleModal={toggleModal} /> */}
          </ModalBody>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default StudentlistuserCallModal;
