import React, {useState} from "react";
// import { useParams } from 'react-router-dom';
import TaskAndGoalsHeader from "./components/header";
import TaskAndGoalsSidebar from './components/sidebar'
import TaskAndGoalsLayout from "./layout";
import './task-and-goals.css'
import {CardContent, Drawer, IconButton, useMediaQuery} from "@material-ui/core";
import MemberShipFolder from "../../pages/shop/membership/components/foldersidebar";
import MenuIcon from "@material-ui/icons/Menu";
import NewMembership from "../../pages/shop/membership/addMembershipModal";

const TaskAndGoalsMain = (props) => {
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
    // const { featureType, filtertype } = useParams()
  const [FoldermenuOpen, setFoldermenuOpen] = useState(false);
    return (
        <div>
            <TaskAndGoalsHeader />
            <div className="d-flex justify-content-between w-100 p-1">
              {IsSmallDevise ? (
                <IconButton
                  onClick={() => {
                    setFoldermenuOpen(!FoldermenuOpen);
                  }}
                  className="rounded-circle pt-0"
                >
                  <MenuIcon />
                </IconButton>
              ) : null}

            </div>
            <div className="d-flex justify-content-start pt-1">

                {IsSmallDevise ? (
                  <Drawer
                    variant="persistent"
                    onClose={() => {

                    }}
                    PaperProps={{
                      elevation: 0,
                      style: {
                        width: IsSmallDevise ? "100%" : "50%",
                      },
                    }}
                    open={FoldermenuOpen}
                  >
                    <div style={{ width: "100%" }}>
                      <TaskAndGoalsSidebar setFoldermenuOpen={setFoldermenuOpen}/>
                    </div>
                  </Drawer>
                ) : (
                  <div style={{ width: 320 }}>
                    <TaskAndGoalsSidebar setFoldermenuOpen={setFoldermenuOpen}/>
                  </div>
                )}


              <TaskAndGoalsLayout />
            </div>


        </div>
    )
}

export default TaskAndGoalsMain;
