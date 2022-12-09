import * as React from 'react';
import { CustomInput, Button } from "reactstrap";
import { Chip, Grid } from '@material-ui/core'
import DataTable from "react-data-table-component";
import "../style.css"

const columns = [
    {
        id: 1,
        name: "Full Name",
        selector: "fullName",
        sortable: true,
        reorder: true
    },
    {
        id: 2,
        name: "Type",
        selector: "type",
        sortable: true,
        reorder: true
    },
    {
        id: 3,
        name: "Phone",
        selector: "phone",
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 4,
        name: "Email",
        selector: "email",
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 5,
        name: "Payment",
        selector: "payment",
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 6,
        name: "Status",
        selector: "status",
        sortable: true,
        right: true,
        reorder: true
    },
    {
        id: 7,
        name: "Action",
        selector: "action",
        sortable: true,
        right: true,
        reorder: true
    }
];

export const data = [
    {
        id: 1,
        fullName: "Ranjan Roy",
        type: "Former Student",
        phone: 9867667777,
        email: "ranjan17@navgurukul.org",
        payment: "paid",
        status: "Going",
        action: "..."
    },
    {
        id: 2,
        fullName: "Ranjan Roy",
        type: "Former Student",
        phone: 9867667777,
        email: "ranjan17@navgurukul.org",
        payment: "paid",
        status: "Going",
        action: "..."
    },
    {
        id: 3,
        fullName: "Ranjan Roy",
        type: "Former Student",
        phone: 9867667777,
        email: "ranjan17@navgurukul.org",
        payment: "paid",
        status: "Going",
        action: "..."
    },
    {
        id: 4,
        fullName: "Ranjan Roy",
        type: "Former Student",
        phone: 9867667777,
        email: "ranjan17@navgurukul.org",
        payment: "paid",
        status: "Going",
        action: "..."
    },
];

export default function Going(props) {
    const [pending, setPending] = useState(true);
    useEffect(() => {
        if (props.getInvitestudents !== null) {
          setPending(false);
        }
      }, []);

    return (
        <>

            <div style={{ height: 300, width: '100%', justifyContent: "center", display: "flex", textAlign: "center", marginTop: "10px" }}>
                <DataTable
                    data={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>

    );
}
