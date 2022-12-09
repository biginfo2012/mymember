import React from "react"
import {
  Row,
  Col,
  Button,
} from "reactstrap"
import {
} from "react-feather"
// import "../../../assets/scss/pages/users.scss"
// import img from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import LocalPrintshopOutlinedIcon from '@material-ui/icons/LocalPrintshopOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';





class UserEdit extends React.Component {
  state = {
    activeTab: "1"
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <div className="icon-list">
        <Row>
          <Col sm="12">
            <div className="list-icon">
              <a href="/data-liDollarSignst/add-new-student">
                <Button className="btn-lg fides btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                  <AddOutlinedIcon />
                  <br/>
                  Clone
                </Button>
              </a>
              <Button className="btn-lg fides5 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <LocalPhoneOutlinedIcon />
                <br/>
                Contact
              </Button>
              <Button className="btn-lg fides4 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <PersonOutlineOutlinedIcon />
                <br/>
                Candidate
              </Button>
              <Button className="btn-lg fides3 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <DescriptionOutlinedIcon />
                <br/>
                Test
              </Button>
              <Button className="btn-lg fides2 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <LocalPrintshopOutlinedIcon />
                <br/>
                Print
              </Button>
              <Button className="btn-lg fides2 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <AttachMoneyOutlinedIcon />
                <br/>
                Buy
              </Button>
              <Button className="btn-lg fides2 btn waves-effect waves-light btn-2" style={{color:'#757575'}}>
                <CheckBoxOutlinedIcon />
                <br/>
                Sign
              </Button>
            </div>
          </Col>
        </Row>
      </div>

    )
  }
}
export default UserEdit
