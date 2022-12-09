import { makeStyles } from '@material-ui/core';
import { Button, Card, Chip, FormGroup, MenuItem, Select } from '@mui/material'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Circle, Print } from '@mui/icons-material';
import { CardHeader } from 'reactstrap';

const data = [
    {
        "id": 1,
        "formname": "New Jersey",
        "type": "Document",
        "lastupdate": "JAN 27 2022",
        "status": "Assigned",
    },
    {
        "id": 2,
        "formname": "New Jersey",
        "type": "Digital",
        "lastupdate": "JAN 27 2022",
        "status": "Approved",
    },
    {
        "id": 3,
        "formname": "New Jersey",
        "type": "Digital",
        "lastupdate": "JAN 27 2022",
        "status": "Active",
    },
    {
        "id": 4,
        "formname": "New Jersey",
        "type": "Document",
        "lastupdate": "JAN 27 2022",
        "status": "Approved",
    },
    {
        "id": 5,
        "formname": "New Jersey",
        "type": "Digital",
        "lastupdate": "JAN 27 2022",
        "status": "Active",
    },
    {
        "id": 6,
        "formname": "New Jersey",
        "type": "Dcoument",
        "lastupdate": "JAN 27 2022",
        "status": "Assigned",
    },
    {
        "id": 7,
        "formname": "New Jersey",
        "type": "Document",
        "lastupdate": "JAN 27 2022",
        "status": "Assigned",
    },
    {
        "id": 8,
        "formname": "New Jersey",
        "type": "Digital",
        "lastupdate": "JAN 27 2022",
        "status": "Active",
    },
]
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
        gridTemplateColumns: "10% 15% 15% 15% 15% 15% 15%",
    },
    rows: {
        display: "grid",
        gridTemplateColumns: "10% 15% 15% 15% 15% 15% 15%  ",
    },
}));

function DocumentEmployeeTable() {
    const classes = useStyles();

    return (
        <div style={{ margin: "5px", border: "1px solid #E9E9E9" }}>
            <div style={{ background: "#f3f3f399", padding: "8px" }}>
                <h2>Employee Forms</h2>
            </div>
            {/* <div className='d-flex justify-content-end mb-1 mt-1'>
                <h3 style={{ marginTop: "5px", fontWeight: "bold" }}>Display:</h3>
                <FormGroup style={{ width: "200px" }}>
                    <Select
                        variant="outlined"
                        style={{
                            border: '1px solid #ced4da',
                            background: "white",
                            width: '100%'
                        }}>

                        <MenuItem >
                            hjj
                        </MenuItem>
                    </Select>
                </FormGroup>
            </div> */}
            <Card style={{ boxShadow: "none" }}>
                <div className="pl-1 pr-1 pt-0" style={{ background: "#f3f3f399" }}>
                    <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
                        <div className="d-flex justify-content-start">
                        </div>
                        <div className="d-flex justify-content-center">
                            <b>Form Name</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Type</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Last Update</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Status</b>
                        </div>
                        <div className="d-flex justify-content-center ml-2">
                            <b>Take Action</b>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <b>View</b>
                        </div>
                    </div>
                </div>
                {
                    data?.map((res) => {
                        return (
                            <div
                                style={{ borderBottom: "1px solid #dddddd" }}
                                className="p-1"
                            >
                                <div className={classes.rows}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Circle style={{ color: "#37c6f9" }} />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ml-2">
                                        {res.formname}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ml-2">
                                        {res.type}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ml-2">
                                        {res.lastupdate}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ml-2">
                                        {
                                            <Chip
                                                size="small"
                                                label={
                                                    res?.status.toLowerCase() === "Active"
                                                        ? "New"
                                                        : res?.status
                                                }
                                                style={{
                                                    marginRight: "1px",
                                                    background:
                                                        res?.status.toLowerCase() === "active"
                                                            ? "#def8e7"
                                                            : res?.status.toLowerCase() === "assigned"
                                                                ? "#eaf4fe"
                                                                : "#f9d2d0",
                                                    color:
                                                        res?.status.toLowerCase() === "active"
                                                            ? "#55a65b"
                                                            : res?.status.toLowerCase() === "assigned"
                                                                ? "#2796f3"
                                                                : "#e05252",
                                                    fontWeight: "bold",
                                                    fontSize: "0.8  em",
                                                }}
                                            />
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Button>View</Button>
                                    </div>
                                    <div className="d-flex justify-content-start ml-5 align-items-center">
                                        <Print style={{fontSize: "24px", color: "#37c6f9"}} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </Card>
        </div>
    )
}

export default DocumentEmployeeTable