import React, { useState } from "react";
import { Card, Col, Row, CardTitle } from "reactstrap";
import { ModalHeader, ModalBody } from "reactstrap";
import { Dialog, IconButton } from "@material-ui/core";
import { Flag, Users, Star } from "react-feather";
import Facebook from "../../../../../assets/img/social/facebook.svg";
import Google from "../../../../../assets/img/social/google.svg";
import { Store } from "@material-ui/icons";
import { DialogActions } from "@mui/material";

function SocialMediaCard() {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);

  const toggleModal = () => {
    setState(!state);
  };

  const googleModal = () => {
    setState1(!state1);
  };

  return (
    <>
      <div className="mt-4">
        <div className="text-center">
          <p style={{ fontSize: "38px" }}>Connect (name) pages</p>
          <span>
            Add the social media pages related to this brand. And don't worry,
            you can always add more later.
          </span>
        </div>
        <div className="mt-5 align-items-center">
          <div className="social_cards">
            <Card
              className="align-items-center onboarding-add-pages text-center"
              onClick={toggleModal}
            >
              <img src={Facebook} alt="" style={{ width: "40px" }} />
              <span style={{ fontSize: "12px" }}>
                Facebook <br />
                Page or group
              </span>
            </Card>
            <Card
              className="ml-1 align-items-center onboarding-add-pages text-center"
              onClick={googleModal}
            >
              <img src={Google} alt="" style={{ width: "40px" }} />
              <span style={{ fontSize: "12px" }}>
                Google Business Profile <br /> Business location
              </span>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={state} maxWidth="lg">
        <ModalHeader toggle={toggleModal} className="p-1">
          <div className=" d-flex">
            <img src={Facebook} alt="" style={{ width: "40px" }} />
            <div style={{ marginLeft: "5px" }}>
              <span>
                Connect pages <br />
                Select with type of pages you want to connect
              </span>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="facebook-modal-body">
          <div className="connect-page">
            <div className="page-list">
              <div className="responsive-square">
                <div className="responsive-square-inner">
                  <div className="panel-dashed full-width">
                    <div className="social_icon">
                      <Flag />
                    </div>
                    <div className="media-body">Add Facebook Pages</div>
                  </div>
                </div>
                <div className="responsive-square-inner">
                  <div className="panel-dashed full-width">
                    <div className="social_icon">
                      <Users />
                    </div>
                    <div className="media-body">Add Facebook groups</div>
                  </div>
                </div>
                <div className="responsive-square-inner">
                  <div className="panel-dashed full-width">
                    <Star />
                    <div className="media-body">Create a mockup page</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Dialog>

      <Dialog open={state1} maxWidth="lg">
        <ModalHeader toggle={googleModal} className="p-1">
          <div className="d-flex">
            <img src={Google} alt="" style={{ width: "40px" }} />
            <div style={{ marginLeft: "5px" }}>
              <span>
                Connect pages <br />
                Select with type of pages you want to connect
              </span>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="facebook-modal-body" style={{ width: "90vh" }}>
          <div className="connect-page">
            <div className="page-list">
              <div className="responsive-square">
                <div className="responsive-square-inner">
                  <div className="panel-dashed full-width">
                    <div className="social_icon">
                      <Store />
                    </div>
                    <div className="media-body">
                      Add Google <br /> Business Profile pages
                    </div>
                  </div>
                </div>
                <div className="responsive-square-inner">
                  <div
                    className="panel-dashed full-width"
                    style={{ height: "170px" }}
                  >
                    <Star />
                    <div className="media-body">Create a mockup page</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Dialog>
    </>
  );
}

export default SocialMediaCard;
