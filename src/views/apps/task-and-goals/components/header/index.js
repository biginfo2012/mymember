import React from "react";
import { useParams } from 'react-router-dom';
import { Grid, InputBase } from "@material-ui/core";
import { Search } from "react-feather";
import BreadCrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AddGoals from "../../goals/AddGoals";
import { connect } from "react-redux";
import AddTask from "../../task/AddTask";
import Collaborators from "./Collaborators";

const TaskAndGoalsHeader = (props) => {
    const { breadCrumbValue } = props
    const { featureType, filtertype } = useParams()
    const handleChange = (e) => {
        // props?.TASK_AND_GOALS_SEARCH_FOR_TASK(e.target?.value)
    }
    return (
        <div className="pt-1">
            <Grid container spacing={2}>
                <Grid item sm={6} lg={6} md={6}>
                    {
                        featureType === 'task' ?
                            <BreadCrumbs
                                breadCrumbTitle="Task and Goals"
                                breadCrumbParent={<span className="text-capitalize">{featureType}</span>}
                            /> : <BreadCrumbs
                                breadCrumbTitle=""
                                breadCrumbParent={<span className="text-capitalize">{featureType}</span>}
                                breadCrumbActive={<span className="text-capitalize">{filtertype}</span>}
                            />
                    }

                </Grid>
                <Grid item sm={6} lg={6} md={6} className="d-flex justify-content-between align-items-center">
                    <Collaborators />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="goal-search-box d-flex align-items-center pl-1 mt-1">
                            <InputBase
                                className="w-100"
                                onChange={handleChange}
                                type="text"
                                placeholder={`Search ${featureType}`}
                            />
                            <Search size={18} color="#878787" />
                        </div>
                        <div class="mt-1">
                            {featureType === 'task' ? <AddTask /> : <AddGoals />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
    };
};
export default connect(mapStateToProps, null)(TaskAndGoalsHeader);


