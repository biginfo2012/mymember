// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { CardBody, Button, Input, Label } from 'reactstrap'

// ** illustration import
import illustration from '../../../assets/images/small/calendar-illustration.png'

// ** Filters Checkbox Array
const filters = [
    { label: 'Events', color: 'danger', className: 'form-check-primary mb-1' },
    {
        label: 'Appointments',
        color: 'danger',
        className: 'form-check-primary mb-1'
    },
    { label: 'Personal', color: 'danger', className: 'form-check-danger mb-1' },
    {
        label: 'Business',
        color: 'primary',
        className: 'form-check-primary mb-1'
    },
    { label: 'Family', color: 'warning', className: 'form-check-warning mb-1' },
    {
        label: 'Holiday',
        color: 'success',
        className: 'form-check-success mb-1'
    },
    { label: 'ETC', color: 'info', className: 'form-check-info' }
]

const SidebarLeft = (props) => {
    // ** Props
    const {
        handleAddEventSidebar,
        handleAddAppSidebar,
        toggleSidebar,
        updateFilter,
        updateAllFilters,
        store,
        dispatch
    } = props

    // ** Function to handle Add Event Click
    const handleAddEventClick = () => {
        toggleSidebar(false)
        handleAddEventSidebar()
    }

    // ** Function to handle Add Appointment Click
    const handleAddAppointmentClick = () => {
        toggleSidebar(false)
        handleAddAppSidebar()
    }

    return (
        <Fragment>
            <div className="sidebar-wrapper">
                <CardBody className="card-body">
                    <Button
                        color="primary"
                        outline
                        block
                        onClick={handleAddEventClick}
                        className="mb-1"
                    >
                        <span className="align-middle"> Add New Event</span>
                    </Button>
                    <Button
                        color="primary"
                        outline
                        block
                        onClick={handleAddAppointmentClick}
                    >
                        <span className="align-middle">New Appointment</span>
                    </Button>
                </CardBody>
                <CardBody>
                    <h5 className="section-label mb-1">
                        <span className="align-middle">Filter</span>
                    </h5>
                    <div className="form-check mb-1">
                        {console.log(store )}
                        <Input
                            id="view-all"
                            type="checkbox"
                            label="View All"
                            className="select-all"
                            checked={
                                store?.selectedCalendars?.length ===
                                filters?.length
                            }
                            onChange={(e) =>
                                dispatch(updateAllFilters(e.target.checked))
                            }
                        />
                        <Label className="form-check-label" for="view-all">
                            View All
                        </Label>
                    </div>
                    <div className="calendar-events-filter">
                        {filters.length &&
                            filters.map((filter) => {
                                return (
                                    <div
                                        key={`${filter.label}-key`}
                                        className={classnames('form-check', {
                                            [filter.className]: filter.className
                                        })}
                                    >
                                        <Input
                                            type="checkbox"
                                            key={filter.label}
                                            label={filter.label}
                                            className="input-filter"
                                            id={`${filter.label}-event`}
                                            checked={store?.selectedCalendars?.includes(
                                                filter.label
                                            )}
                                            onChange={() => {
                                                dispatch(
                                                    updateFilter(filter.label)
                                                )
                                            }}
                                        />
                                        <Label
                                            className="form-check-label"
                                            for={`${filter.label}-event`}
                                        >
                                            {filter.label}
                                        </Label>
                                    </div>
                                )
                            })}
                    </div>
                </CardBody>
            </div>
            <div className="mt-auto">
                <img
                    className="img-fluid"
                    src={illustration}
                    alt="illustration"
                />
            </div>
        </Fragment>
    )
}

export default SidebarLeft
