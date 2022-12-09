import { Avatar, Card } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlusCircle } from "react-feather";
import {
  Modal,
} from "reactstrap"
import { Col, Form, Row } from "reactstrap";
import "./style.css";
import WorkSpaceMain from "./workspaceform/index";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PageConnect from "./workspaceform/PageConnect";

function WorkSpaceCard() {
  const values = [true];
  const history = useHistory();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const pageConnect = () => {
    history.push("/company/marketing/socialmedia");
  };
  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Row>
        <Col sm="3">
          <Card className="p-2 " onClick={pageConnect}>
            <div className="d-flex">
              <Avatar
                variant="rounded"
                style={{ background: "rgb(215, 61, 50)", color: "#fff" }}
              >
                N
              </Avatar>
              <div style={{ marginLeft: "10px" }}>
                <h3> Testing</h3>
                <span>0 pages</span>
              </div>
            </div>
            <div style={{ marginTop: "100px" }}>
              <span>1h</span>
            </div>
          </Card>
        </Col>
        <Col sm="3">
          {values.map((v, id) => (
            <Card
              className="createSpace"
              key={id}
              onClick={() => handleShow(v)}
            >
              <PlusCircle />
              <h3 style={{ marginTop: "10px" }}>Create Workspace</h3>
            </Card>
          ))}
        </Col>
      </Row>

      <Modal isOpen={show} show="true" fullscreen="true" onHide={() => setShow(false)}>
        <div className="d-flex justify-content-end mr-4 mt-4">
          <HighlightOffRoundedIcon
            onClick={handleClose}
            style={{ fontSize: "3.5rem", color: "#989898" }}
          />
        </div>
        <Form>
          <WorkSpaceMain />
        </Form>
      </Modal>
    </div>
  );
}

export default WorkSpaceCard;
