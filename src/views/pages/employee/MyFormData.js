import { makeStyles } from '@material-ui/core';
import { Button, Card } from '@mui/material'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const data = [
  {
    "id": 1,
    "formId": "167-161211",
    "name": "New Jersey",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 2,
    "formId": "167-161211",
    "name": "New Jersey",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 3,
    "formId": "167-112071",
    "name": "New York NJ-W4",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 4,
    "formId": "167-178071",
    "name": "Taxes NJ-W4",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 5,
    "formId": "167-878071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 6,
    "formId": "167-168071",
    "name": "New export NJ-W4",
    "type": "none",
    "created": "JAN 27 2021"
  },
  {
    "id": 7,
    "formId": "167-65671",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2022"
  },
  {
    "id": 8,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 9,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 10,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 11,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 12,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "created": "FEB 27 2024"
  },
  {
    "id": 13,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 14,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 15,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
  },
  {
    "id": 16,
    "formId": "167-433071",
    "name": "New Jersey NJ-W4",
    "type": "none",
    "created": "FEB 27 2024"
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
    gridTemplateColumns: "5% 15% 20% 20% 20% 20% ",
  },
  rows: {
    display: "grid",
    gridTemplateColumns: "5% 15% 20% 20% 20% 20% ",
  },
}));

function MyFormData() {
  const classes = useStyles();

  return (
    <div>
      <Card style={{ boxShadow: "none" }}>
        <div className="pl-1 pr-1 pt-0">
          <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
            <div className="d-flex justify-content-start">

            </div>
            <div className="d-flex justify-content-start">
              <b>Form Id </b>
            </div>
            <div className="d-flex justify-content-start ml-2">
              <b>Form Name</b>
            </div>
            <div className="d-flex justify-content-start ml-2">
              <b>Type</b>
            </div>
            <div className="d-flex justify-content-start ml-2">
              <div>
                <b>Created</b> <br />
              </div>
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
                  <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: "13px" }}>
                    <AddCircleOutlineIcon />
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    {res.formId}
                  </div>
                  <div className="d-flex justify-content-start align-items-center ml-2">
                    {res.name}
                  </div>
                  <div className="d-flex justify-content-start align-items-center ml-2">
                    {res.type}
                  </div>
                  <div className="d-flex justify-content-start align-items-center ml-1">
                    {res.created}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Button>View</Button>
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

export default MyFormData