// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { X } from 'react-feather'
import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Reactstrap Imports
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Form
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '../../../../utility/Utils'

// ** Styles Imports
// import '@styles/react/libs/react-select/_react-select.scss'
import "../../../../assets/scss/plugins/forms/react-select/_react-select.scss"

// import '@styles/react/libs/flatpickr/flatpickr.scss'
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


const AddAppointment = (props) => {
    // ** Props
    const { open, handleAddAppSidebar } = props

    // ** States
    const [allDay, setAllDay] = useState(false)
    const [startPicker, setStartPicker] = useState(new Date())
    const [calendarLabel, setCalendarLabel] = useState([
        { value: 'Business', label: 'Business', color: 'primary' }
    ])

    // ** Select Options
    const options = [
        { value: 'Business', label: 'Business', color: 'primary' },
        { value: 'Personal', label: 'Personal', color: 'danger' },
        { value: 'Family', label: 'Family', color: 'warning' },
        { value: 'Holiday', label: 'Holiday', color: 'success' },
        { value: 'ETC', label: 'ETC', color: 'info' }
    ]

    // ** Custom select components
    const OptionComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <span
                    className={`bullet bullet-${data.color} bullet-sm me-50`}
                ></span>
                {data.label}
            </components.Option>
        )
    }

    // ** Close BTN
    const CloseBtn = (
        <X className="cursor-pointer" size={15} onClick={handleAddAppSidebar} />
    )

    return (
        <Modal
            isOpen={open}
            className="sidebar-lg"
            toggle={handleAddAppSidebar}
            contentClassName="p-0 overflow-hidden"
            modalClassName="modal-slide-in event-sidebar"
        >
            <ModalHeader
                className="mb-1"
                toggle={handleAddAppSidebar}
                close={CloseBtn}
                tag="div"
            >
                <h5 className="modal-title">Add Appointment</h5>
            </ModalHeader>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
                <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
                    <Form>
                        <div className="mb-1">
                            <Label className="form-label" for="title">
                                Title <span className="text-danger">*</span>
                            </Label>
                            <Input id="title" placeholder="Title" />
                        </div>
                        <div className="mb-1">
                            <Label className="form-label" for="label">
                                Label
                            </Label>
                            <Select
                                id="label"
                                value={calendarLabel}
                                options={options}
                                theme={selectThemeColors}
                                className="react-select"
                                classNamePrefix="select"
                                isClearable={false}
                                onChange={(data) => setCalendarLabel([data])}
                                components={{
                                    Option: OptionComponent
                                }}
                            />
                        </div>
                        <div className="mb-1">
                            <Label className="form-label" for="startDate">
                                Date & Time
                            </Label>
                            <Flatpickr
                                required
                                id="startDate"
                                name="startDate"
                                className="form-control"
                                onChange={(date) => setStartPicker(date[0])}
                                value={startPicker}
                                options={{
                                    enableTime: allDay === false,
                                    dateFormat: 'Y-m-d H:i'
                                }}
                            />
                        </div>
                        <div className="mb-1">
                            <Label className="form-label" for="location">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Appointment Location"
                            />
                        </div>
                        <div className="mb-1">
                            <Label className="form-label" for="description">
                                Description
                            </Label>
                            <Input
                                type="textarea"
                                name="text"
                                id="description"
                                rows="3"
                                placeholder="Description"
                            />
                        </div>
                        <div className="d-flex mb-1">
                            <Button
                                className="me-1"
                                type="submit"
                                color="primary"
                            >
                                Add
                            </Button>
                            <Button
                                color="secondary"
                                type="reset"
                                onClick={handleAddAppSidebar}
                                outline
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </PerfectScrollbar>
        </Modal>
    )
}

export default AddAppointment
