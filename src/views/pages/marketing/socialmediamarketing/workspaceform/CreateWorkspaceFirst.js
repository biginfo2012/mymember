import React, { useState, useMemo } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";

function CreateWorkSpaceFirst() {


  return (
    <div className="mt-4">
      <div className="text-center">
        <p style={{fontSize: "38px"}}>Create a workspace</p>
        <span>
          A workspace is a group of social media channels and collaborators, a
          place where you can organize your <br /> campaigns, workflows and assets.
        </span>
      </div>
      <FormGroup className="mt-5" style={{ width: "300px", marginLeft: "44%" }}>
        <span>Workspace Name</span>
        <Input type="text" name="work-space" placeholder="Work space..." />
      </FormGroup>
      <FormGroup className="mt-2" style={{ width: "300px", marginLeft: "44%" }}>
        <span>Workspace Name</span>
        <select style={{width: "300px", borderRadius: "5px", border:"1px solid #d4d4d4", height:"40px", background: "#fff"}}>
          <option>(GMT+5:30) India Standard Time</option>
          <option>(GMT+5:30) Colombo</option>
          <option>(GMT+4:30) Kabul</option>
          <option>(GMT+1:30) Kathmandu</option>
        </select>
      </FormGroup>
    </div>
  );
}

export default CreateWorkSpaceFirst;
