import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { Plus, PlusCircle } from "react-feather";
import WorkSpaceCard from "./WorkSpaceCard";
import { Card, Chip, Divider, Grid } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";





function SocialMediaConnecting() {
  const history = useHistory()

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="Social Connect"
        breadCrumbParent="Marketing"
        breadCrumbActive="Social Connect"
      />
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex">
          <div className="d-flex">
            <Avatar
              variant="rounded"
              style={{ background: "rgb(214, 26, 127)", color: "#fff" }}
            >
              M
            </Avatar>
            <select
              style={{ background: "none", border: "none", fontWeight: "bold" }}
            >
              <option>Testing</option>
            </select>
          </div>
          <div
            className="ml-2"
            style={{
              background: "rgb(64 167 225 / 13%)",
              padding: "8px 20px 0px 20px",
              borderRadius: "10px",
              color: "#40A7E1",
            }}
          >
            <PlusCircle />
            <span style={{ marginLeft: "5px" }}>Upgrade</span>
          </div>
        </div>
        <div className="d-flex" style={{ marginTop: "10px" }}>
          <div>New Workspace</div>
          <Plus
            style={{
              background: "#fff",
              padding: "5px",
              marginLeft: "5px",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
      <hr />
      <WorkSpaceCard />
      <Divider />
      <Grid spacing={2} container>
        <Grid item sm={3} md={3} lg={3}>
          <Link to={`/app/marketing/social-media-connecting/workspace`}>
            <Card className="p-2 ">
              <div className="d-flex">
                <Avatar
                  variant="rounded"
                  style={{ background: "rgb(215, 61, 50)", color: "#fff" }}
                >
                  N
                </Avatar>
                <div>
                  <h3> Sample Workspace </h3>
                  <span>0 pages</span>
                </div>
              </div>
              <div style={{ marginTop: "100px" }}>
                <span>1h</span>
              </div>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default SocialMediaConnecting;
