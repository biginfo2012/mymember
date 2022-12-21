import React, { useEffect, useState } from "react";
import { GET_ACTIVE_STUDENT_INFO } from "../../../../../redux/actions/member";
import { connect } from "react-redux";
import ProfileAvatar from "../../../newstudent/components/ProfileAvatar";
import InfoPreViewcard from "../../../newstudent/components/infoPreViewcard";

const MemberInfo = (props) => {
  const [studentinfo, setStudentInfo] = useState(null);
  const { getstudentInfoById, viewActiveStudentInfo, GET_ACTIVE_STUDENT_INFO } =
    props;

  useEffect(() => {
    if (studentinfo === null) {
      GET_ACTIVE_STUDENT_INFO(props.studentId);
      setStudentInfo(getstudentInfoById);
    }
  }, [getstudentInfoById, viewActiveStudentInfo, GET_ACTIVE_STUDENT_INFO, props.studentId]);

  return (
    <div>
      <ProfileAvatar
        studentinfo={viewActiveStudentInfo}
        update={props.update}
        isEdit={false}
      />
      <InfoPreViewcard studentinfo={getstudentInfoById} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    viewActiveStudentInfo: state.member.viewActiveStudentInfo,
    getstudentInfoById: state.member.getstudentInfoById,
  };
};

export default connect(mapStateToProps, { GET_ACTIVE_STUDENT_INFO })(
  MemberInfo
);
