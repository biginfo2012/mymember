import React, { useEffect, useState } from "react";
import { ModalHeader, ModalBody } from "reactstrap";
import { PhoneCall } from "react-feather";
import HorizontalCallForm from "./CallstForm";
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
// import EmailstForm from "./emailstForm";
import { Dialog, IconButton } from "@material-ui/core";
import VoicemailIcon from '@mui/icons-material/Voicemail';
import DataTable from "react-data-table-component";

import axios from "axios";

// import { customStyles } from "../../apps/user/list/noteCard";

import moment from "moment";
import { ArrowDown } from "react-feather";
import { customStyles } from "../../apps/user/list/noteCard";



const baseUrl = process.env.REACT_APP_BASE_URL;
const StudentlistuserCallRecordModal = (props) => {
    const [callRecord, setCallRecord] = useState([])
    const [state, setState] = useState(false);
    const toggleModal = () => {
        setState(!state);
    };

    useEffect(() => {
        const init = async () => {
            let user_id = await localStorage.getItem("user_id");
            console.log("user_id", user_id);
            let res = await axios.get(`${baseUrl}/v1/showCallHistory/${user_id}`)
            console.log("res here", res.data?.data);
            let user_Own_History = res.data?.data.filter(item => item.user_id == user_id)
            setCallRecord(user_Own_History.length > 0 ? user_Own_History : [])
        }
        init()
    }, []);

    const columns = [
        {
            name: "Date",
            selector: (row) => row.Date,
            sortable: false,
            cell: (params) => {
                return (
                    <>
                        <span>{moment(params?.date).format("MM/DD/YYYY")}</span>
                    </>
                );
            },
        },
        {
            selector: (row) => row.num,
            name: "Number",
            sortable: true,
        },

        {
            selector: (row) => row.duration + " sec",
            name: "Duration",
            sortable: true,
        },
        {
            selector: (row) => row.recording_url,
            name: "Recording",
            sortable: true,
            cell: (params) => {
                return (
                    <>
                        {console.log("params", params?.recording_url)}
                        <div className="text">
                            <audio controls>

                                <source src={params?.recording_url} type="audio/mpeg" />

                            </audio>
                        </div>
                    </>
                );
            },
        },
    ];
    return (
        <div >
            <React.Fragment>
                <IconButton onClick={toggleModal} style={{ paddingLeft: "0" }}>
                    <VoicemailIcon size={20} />
                </IconButton>
                <Dialog open={state}  >
                    <ModalHeader toggle={toggleModal} >Recording Module</ModalHeader>
                    <ModalBody id="222" >
                        {callRecord.length > 0 ? (
                            <DataTable
                                responsive={true}
                                columns={columns}
                                data={callRecord || []}
                                noHeader
                                defaultSortDirection={"asc"}
                                defaultSortField="firstName"
                                defaultSortAsc={true}
                                pagination
                                sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        ) : (
                            <div className="d-flex justify-content-center mt-5 pt-1"  style={{ width: "500px",  }}>
                                <div className="align-self-center">
                                    {/* <img src={NoRankSvg} height="160px" alt="No rank found" /> */}
                                    <b />
                                    <h4>No Record Found !</h4>
                                </div>
                            </div>
                        )}


                    </ModalBody>
                </Dialog>
            </React.Fragment>
        </div >
    );
};

export default StudentlistuserCallRecordModal;
