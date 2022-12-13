import { styled } from '@mui/styles'
import React, { useState, lazy } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import BreadCrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb'
import Employeesidebar from './Employeesidebar'

const Myemplyee = lazy(() =>
    import("./Myemplyee")
);
const MyForm = lazy(() => {
    import('./MyFormData')
})
const Scheduled =  lazy(() => {
    import('./Schedule')
})

const Employeesetting = lazy(() =>
    import("./formelemnts/Employeesetting")
);
const RootStyle = styled("div")(({ }) => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    padding: '1rem',

}));
const MainStyle = styled("div")(({ }) => ({
    flexGrow: 1,
    overflow: "auto",
    width: '100%',
    overflowX: "hidden",
    minHeight: "100%",
}));

const Employee = () => {
    const [selectOption, setselectOption] = useState("my-employees")
    const history = useHistory()

    const handlechangeoption = (value) => {
        setselectOption(value)
        history.push("/app/employee/my-employee")
        selectOption()
    }

    return (
        <div>
            <BreadCrumbs
                breadCrumbTitle="Employee"
                breadCrumbParent="Members"
                breadCrumbActive="Employee"
            />
            <Employeesidebar />
        </div>
    )
}

export default Employee