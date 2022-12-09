import React from "react";
import CreateStudentForm from "./createStudent";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../assets/scss/pages/users.scss";

const CreateMembermain = () => {
  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="New Member"
        breadCrumbParent="Members"
        breadCrumbActive="New Member"
      />
      <div>
        <CreateStudentForm update={false} isCreate={true} />
      </div>
    </div>
  );
};
export default CreateMembermain;
