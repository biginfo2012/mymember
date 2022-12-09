import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Eye, X } from "react-feather";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Trash } from "react-feather";


import {
    Avatar,
    Dialog,
    Card,
    DialogContent, TextField,
    DialogTitle,
    IconButton,
} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    cardStyle: {
        boxShadow: "0 5px 10px #e4e0e0",
        borderRadius: "8px",
    },
    avtStyle: {
        height: "30px",
        width: "30px",
    },
    inputStyle: {
        height: "3em",
        borderRadius: "0.4em",
        border: "1px solid #b8c2cc",
        "& div": {
            padding: "0px !important",
        },
    },
    row: {
        display: "grid",
        gridTemplateColumns: "30% 10% 15% 10% 10% 10% 14%",
        padding: "0px",
    },
    displaybox: {
        padding: "0em",
        display: "flex",
        alignItems: "center",
        fontSize: "0.9em",
        cursor: "pointer",
    },
}));


function NonMemberTable(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        modal: false,
    });
    const toggleModal = () => {
        setState({
            modal: !state.modal,
        });
    };

    return (
        <>
            <Card>
                <div className='d-flex justify-content-end mr-2 mt-2'>
                    <button className='btn btn-primary' onClick={toggleModal}>Add</button>
                </div>
                <Dialog open={state.modal} onClose={toggleModal} >
                    <div className="d-flex justify-content-end">
                        <IconButton onClick={toggleModal} className="p-0">
                            <X />
                        </IconButton>
                    </div>
                    <div className="ml-2">
                        <h3>Add Guest</h3>
                    </div>
                    <div className="m-2" style={{ width: "450px", height: "300px" }}>
                        <div className="justify-content-between">
                            <div>
                                <input
                                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "425px", height: "50px", margin: "10px" }}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="mt-1">
                                <input
                                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "425px", height: "50px", margin: "10px" }}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mt-1">
                                <input
                                    style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "425px", height: "50px", margin: "10px" }}
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="mt-1 mr-1 d-flex justify-content-end">
                                <button className="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <div className={classes.divStyle}>
                    <div className="pl-2 pr-2 pt-0">
                        <div className={`${classes.row} mt-1 d-flex justify-content-between ml-2 mr-2`}>
                            <div className={classes.displaybox}>
                                <b>First Name</b>
                            </div>
                            <div className={classes.displaybox}>
                                <b>Email</b>
                            </div>
                            <div className={`${classes.displaybox}`}>
                                <b>Phone</b>
                            </div>
                            <div className={classes.displaybox}>
                                <b>Action</b>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className={`${classes.row} d-flex justify-content-between mb-2 ml-2 mr-2`} >
                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        Amar
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        amar@gmail.com
                                    </span>
                                </div>
                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        9877676767
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                                    </span>
                                </div>
                            </div>
                            <div className={`${classes.row} d-flex justify-content-between mb-2 ml-2 mr-2`} >
                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        siohan
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        solahan@gmail.com
                                    </span>
                                </div>
                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        9877671167
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                                    </span>
                                </div>
                            </div>
                            <div className={`${classes.row} d-flex justify-content-between mb-2 ml-2 mr-2`} >
                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        Raju 
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        raju@gmail.com
                                    </span>
                                </div>
                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        9877679000
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                                    </span>
                                </div>
                            </div>
                            <div className={`${classes.row} d-flex justify-content-between mb-2 ml-2 mr-2`} >
                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        Kumar singh
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        kumar@gmail.com
                                    </span>
                                </div>
                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        9871216767
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                                    </span>
                                </div>
                            </div>
                            <div className={`${classes.row} d-flex justify-content-between mb-2 ml-2 mr-2`} >
                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        lovely Roy
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        lovely@gmail.com
                                    </span>
                                </div>
                                <div className={`${classes.displaybox}`}>
                                    <span className="">
                                        8888676767
                                    </span>
                                </div>

                                <div className={`${classes.displaybox}`}>
                                    <span>
                                        <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {

})(NonMemberTable);
