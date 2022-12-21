import React from "react";
// import StudentlistuserCallRecordModal from "../../../pages/studentlistEmailicon/studendListUserCallRecordModal";
import StudentlistuserCallModal from "../../../pages/studentlistEmailicon/studentlistuserCallModal";
import StudentlistuserEmailModal from "../../../pages/studentlistEmailicon/studentlistuserEmailModal";

import QuickSendSMS from "./components/quickSend-sms";
// ----------------------------------------------------------------------

export default function QuickSMSstudent(props) {

  const { item, alertCount, StudentTypeOrInterest } = props;

  return (
    <div className="d-flex justify-content-start" style={{ width: "100%" }}>
      <QuickSendSMS badgeContent={alertCount ? alertCount : 0} item={item} StudentTypeOrInterest={StudentTypeOrInterest} />
      <StudentlistuserEmailModal item={item} />
      {/* */}
      <StudentlistuserCallModal item={item} />
      {/* <StudentlistuserCallRecordModal  item={item} /> */}
    </div>
  );
}
