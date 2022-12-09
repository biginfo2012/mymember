import React from "react";
import { CardBody } from "reactstrap";

class DocumentChange extends React.Component {

    state = {
        activeTab: "1",
        ListselectedProgramCategory: [],
        ListselectedProgramRank: [],
    };

    toggle = (tab) => {
        this.setState({
            activeTab: tab,
        });
    };

    render() {
        return (
            <div>
                <CardBody>
                    <div className="section-header">
                        <span className="section-title">Documents</span>
                        <div className="divider" />
                    </div>
                    
                    {/* <Col sm="10">
                        <Card style={{ minHeight: '84vh' }}>
                            <CardBody>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col> */}
                    {/* <div
                    onClick={(_) => changePath("/company/documenets/sharewithme")}
                    className="d-flex align-items-center finance-nav cursor-pointer"
                >
                    <div
                        className={`${activePath === "taskonly" ? "bullet active-bullet" : "bullet"}`}
                    />
                    <CardText className={`${activePath === "taskonly" && "active"}`}>
                        Shared with me
                    </CardText>
                </div>
                <div
                    onClick={(_) => changePath("/company/documents/trash")}
                    className="d-flex align-items-center finance-nav cursor-pointer"
                >
                    <div
                        className={`${activePath === "trash" ? "bullet active-bullet" : "bullet"
                            }`}
                    />
                    <CardText className={`${activePath === "trash" && "active"}`}>
                        Trash
                    </CardText>
                </div> */}
                </CardBody>
            </div>
        );
    }
};

export default DocumentChange;