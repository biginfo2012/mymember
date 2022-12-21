import React, { useState, useEffect } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import { useHistory } from "react-router-dom";
const PageLink = ({ children }) => {
  const history = useHistory();

  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const path = history.location.pathname;
    let PathArray = path.split("/");
    setActivePath(PathArray[PathArray.length - 1]);
  }, [history]);

  function changePath(path) {
    history.push(path);
  }

  return (
    <Card style={{
      height: '90vh'
    }}>
      <CardBody>
        <div className="section-header">
          <span className="section-title">Finance</span>
          <div className="divider" />
        </div>
        <div
          onClick={(_) => changePath("/company/mymoney/finance/income")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${activePath === "income" ? "bullet active_bullet" : "bullet"
              }`}
          />
          <CardText className={`${activePath === "income" && "text-primary"}`}>
            Income
          </CardText>
        </div>
        <div
          onClick={(_) => changePath("/company/mymoney/finance/expense")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${activePath === "expense" ? "bullet active_bullet" : "bullet"
              }`}
          />
          <CardText className={`${activePath === "expense" && "text-primary"}`}>
            Expense
          </CardText>
        </div>
        <div
          onClick={(_) => changePath("/company/mymoney/finance/ccexp")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${activePath === "ccexp" ? "bullet active_bullet" : "bullet"
              }`}
          />
          <CardText className={`${activePath === "ccexp" && "text-primary"}`}>
            CC Expiring
          </CardText>
        </div>
        <div
          onClick={(_) => changePath("/company/mymoney/finance/invoice")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${activePath === "invoice" ? "bullet active_bullet" : "bullet"}`}
          />
          <CardText className={`${activePath === "invoice" && "text-primary"}`}>
            invoice
          </CardText>
        </div>
        <div
          onClick={(_) => changePath("/company/mymoney/finance/pnl")}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <div
            className={`${activePath === "pnl" ? "bullet active_bullet" : "bullet"
              }`}
          />
          <CardText className={`${activePath === "pnl" && "text-primary"}`}>
            P &amp; L
          </CardText>
        </div>
        {/* {children} */}
        <div className="section-header">
          <span className="section-title">Settings</span>
          <div className="divider" />
        </div>

        <div
          onClick={() => history.push(`/company/settings`)}
          className="d-flex align-items-center finance-nav cursor-pointer"
        >
          <SettingsIcon
            style={{
              fontSize: "2em",
              color: "#AAAAAA",
              marginRight: "10px",
            }}
          />
          <CardText>Setting</CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default PageLink;
