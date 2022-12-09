import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "../../../assets/scss/pages/users.scss";
import Schedule from "./schedule/Calendar";
import StripTable from "./strip/stripTable";
import ProgramTable from "./Program/programeTable";
import RankTable from "./Program/category/RankTable";
import GatewayapiForm from "./gatewayapi/gatewayapiForm";
import Gatewayapi1Form from "./gatewayapi/gatewayapi1Form";
import Gatewayapi2Form from "./gatewayapi/gatewayapi2Form";
import Billing1Table from "./billing/billing1Table";
import General1Form from "./general1/general1Form";
import SettingSmartlistMain from "./Smratlist/SettingSmartlistMain";
import ChatbotScripts from "./chatbot/scripts";
import { List, ListItem } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import DvrIcon from '@mui/icons-material/Dvr';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { makeStyles } from "@material-ui/core";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationSetting from "./NotificationSetting/NotificationSetting";

class UserEdit extends React.Component {
  state = {
    activeTab: "2",
    ListselectedProgramCategory: [],
    ListselectedProgramRank: [],
  };

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  handleSelectProgram = (
    selectProgramCatList,
    selectProgramRankList,
    programName
  ) => {
    this.setState({
      ListselectedProgramCategory: selectProgramCatList,
      ListselectedProgramRank: selectProgramRankList,
      selectPName: programName,
    });
  };

  render() {
    const {
      ListselectedProgramRank,
      selectPName,
    } = this.state;
    return (
      <div>
        <div className="content-header row">
          <div className="content-header-left col-md-9 col-12 mb-2">
            <div className="row breadcrumbs-top">
              <div className="col-12">
                <h2 className="content-header-title float-left">
                  {"Settings"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Row>
          <Col sm="2">
            <Card className="pt-2">
              <List dense style={{ minHeight: '82vh' }} className=' m-0'>
                <ListItem button
                  style={{ background: (this.state.activeTab === "1" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "1" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0 ${classnames({
                    active: this.state.activeTab === "1",
                  })}`}
                  onClick={() => {
                    this.toggle("1");
                  }} >
                  <div className="d-flex">
                    <SettingsOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "1" ? "#2796f3" : "#878787") }}>
                      <b>General</b>
                    </h5>
                  </div>

                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "2" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "2" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "2",
                  })}`}
                  onClick={() => {
                    this.toggle("2");
                  }} >
                  <div className="d-flex">
                    <ScheduleOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "2" ? "#2796f3" : "#878787") }}>
                      <b>Schedule</b>
                    </h5>
                  </div>

                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "3" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "3" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "3",
                  })}`}
                  onClick={() => {
                    this.toggle("3");
                  }} >
                  <div className="d-flex">
                    <DvrIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "3" ? "#2796f3" : "#878787") }}>
                      <b>Program</b>
                    </h5>
                  </div>

                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "4" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "4" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "4",
                  })}`}
                  onClick={() => {
                    this.toggle("4");
                  }} >
                  <div className="d-flex">
                    <PeopleAltOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "4" ? "#2796f3" : "#878787") }}>
                      <b>Candidate</b>
                    </h5>
                  </div>

                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "5" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "5" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "5",
                  })}`}
                  onClick={() => {
                    this.toggle("5");
                  }} >
                  <div className="d-flex">
                    <AccountBalanceIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "5" ? "#2796f3" : "#878787") }}>
                      <b>Billing</b>
                    </h5>
                  </div>
                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "6" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "6" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "6",
                  })}`}
                  onClick={() => {
                    this.toggle("6");
                  }} >
                  <div className="d-flex">
                    <NotificationsOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "6" ? "#2796f3" : "#878787") }}>
                      <b>Notification</b>
                    </h5>
                  </div>
                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "7" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "7" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0${classnames({
                    active: this.state.activeTab === "7",
                  })}`}
                  onClick={() => {
                    this.toggle("7");
                  }} >
                  <div className="d-flex">
                    <AssistantDirectionOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "7" ? "#2796f3" : "#878787") }}>
                      <b>Gateway API</b>
                    </h5>
                  </div>

                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "8" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "8" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start ${classnames({
                    active: this.state.activeTab === "8",
                  })}`}
                  onClick={() => {
                    this.toggle("8");
                  }} >
                  <div className="d-flex">
                    <ListOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "8" ? "#2796f3" : "#878787") }}>
                      <b>SmartList</b>
                    </h5>
                  </div>
                </ListItem>
                <ListItem button
                  style={{ background: (this.state.activeTab === "9" ? "#eaf4fe" : "#fff"), color: (this.state.activeTab === "9" ? "#2796f3" : "#878787"), paddingTop: "10px" }}
                  className={`d-flex justify-content-start m-0 ${classnames({
                    active: this.state.activeTab === "9",
                  })}`}
                  onClick={() => {
                    this.toggle("9");
                  }} >
                  <div className="d-flex">
                    <CommentOutlinedIcon />
                    <h5 className="text-capitalize ml-1" style={{ color: (this.state.activeTab === "9" ? "#2796f3" : "#878787") }}>
                      <b>Chatbot Scripts</b>
                    </h5>
                  </div>
                </ListItem>
              </List>
            </Card>
          </Col>
          <Col sm="10">
            <Card style={{ minHeight: '84vh' }}>
              <CardBody>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <General1Form />
                  </TabPane>
                  <TabPane tabId="2">
                    <Schedule />
                  </TabPane>
                  {/* <TabPane tabId="2">
                    <EmailAddresses />
                  </TabPane> */}

                  <TabPane tabId="3">
                    <ProgramTable
                      updateParentDefaultCategoryRank={this.setState}
                      handleSelectProgram={this.handleSelectProgram}
                    />
                    {/* <CategoryTable
                      handleSelectProgram={this.handleSelectProgram}
                      selectPName={selectPName}
                      ListselectedProgramCategory={ListselectedProgramCategory}
                    /> */}
                    <RankTable
                      handleSelectProgram={this.handleSelectProgram}
                      selectPName={selectPName}
                      ListselectedProgramRank={ListselectedProgramRank}
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <StripTable />
                  </TabPane>
                  <TabPane tabId="5">
                    <Billing1Table />
                  </TabPane>
                  <TabPane tabId="6">
                    <NotificationSetting />
                  </TabPane>
                  <TabPane tabId="7">
                    <GatewayapiForm />
                    <Gatewayapi1Form />
                    <Gatewayapi2Form />
                  </TabPane>
                  <TabPane tabId={"8"}>
                    <SettingSmartlistMain />
                  </TabPane>
                  <TabPane tabId={"9"}>
                    <ChatbotScripts />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}
export default UserEdit;
