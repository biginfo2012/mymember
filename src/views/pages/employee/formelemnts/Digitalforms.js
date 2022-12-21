import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  GET_FUNNEL,
  GET_SINGLE_FUNNLE,
} from "../../../../redux/actions/form-builder/index";
import { CREATE_ROLE_LIST } from "../../../../redux/actions/employee_subusers_roles";
import { Select } from "antd";
const { Option } = Select;

const Digitalforms = ({
  uforms,
  GET_FUNNEL,
  goBack,
  roleName,
  setRoleName,
  handleNext,
  CREATE_ROLE_LIST,
}) => {
  const [page, setpage] = useState(0);
  const [perpage, setperpage] = useState(10);
  const [selected, setselected] = useState(null);
  const [funnels, setfunnels] = useState([]);
  const dispatch = useDispatch();
  const [forms, setforms] = useState([]);
 
  console.log(roleName)

  const handleselected = async (value) => {
    await setselected(value);
    const request = await dispatch(GET_SINGLE_FUNNLE(value));
    await roleName?.digitalId?.push(request?.data?._id);
    if (request?.success) {
      setforms(request?.data?.forms);
    }
  };

  const handleChangePage = () => {
    setpage(page + 1);
  };
  useEffect(() => {
    GET_FUNNEL(page, perpage);
  }, [page, perpage]);

  useEffect(() => {
    if (uforms?.memberdata) {
      let copydata = [...funnels];
      copydata.push(...uforms?.memberdata);
      setfunnels(copydata);
    }
  }, [uforms?.memberdata]);

  return (
    <div
      id="digitalform"
      style={{
        width: "100%",
        margin: "1em",
        padding: "1em",
      }}
    >
      <div>
        <h4>Type - Digital</h4>
        <Grid container spacing={2}>
          <Grid item lg="6" md="6" sm="6">
            <Select
              onPopupScroll={handleChangePage}
              style={{
                width: "200px",
              }}
              onChange={handleselected}
              getPopupContainer={() => document.getElementById("digitalform")}
              defaultValue={"Select one"}
            >
              {funnels.length > 0 &&
                funnels?.map((item, i) => {
                  return (
                    <Option value={item?._id} key={i}>
                      {item?.funnelName}
                    </Option>
                  );
                })}
            </Select>
          </Grid>
          <Grid item lg="6" md="6" sm="6">
            <Select
              style={{
                width: "200px",
              }}
              getPopupContainer={() => document.getElementById("digitalform")}
              defaultValue={"Select funnle"}
            >
              {forms?.map((item, i) => {
                return (
                  <Option key={i} value={item?._id}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex justify-content-between">
          <Button className="m-1" variant="outlined" onClick={goBack}>
            Back
          </Button>
          <Button className="m-1" variant="contained">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapstateprops = (state) => {
  return {
    uforms: state?.formbuilder.uforms,
  };
};

export default connect(mapstateprops, { GET_FUNNEL, CREATE_ROLE_LIST })(
  Digitalforms
);
