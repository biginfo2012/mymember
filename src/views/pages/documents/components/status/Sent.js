import * as React from 'react';
import MUIDataTable from "mui-datatables";
import UpdateCandidate from "../../../../apps/user/list/Updatecandidate"
import "../style.css"

const columns = [
  {
    name: "title",
    label: "Title",
    options: {
      filter: true,
      sort: true,
    },
    setCellProps: () => ({ style: {width: "400px !important" } })
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
    setCellProps: () => ({ style: {width: "200px !important" } })
  },
  {
    name: "value",
    label: "Value",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "modified",
    label: "Modified",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        return (
          <div className="d-flex p-1">
            <UpdateCandidate />
          </div>
        );
      },
    }
  },
];

const data = [
  { title: "Joe James", status: "Test Corp", value: "Yonkers", modified: "NY" },
  { title: "John Walsh", status: "Test Corp", value: "Hartford", modified: "CT" },
  { title: "Bob Herm", status: "Test Corp", value: "Tampa", modified: "FL" },
  { title: "James Houston", status: "Test Corp", value: "Dallas", modified: "TX" },
];

const options = {
  filterType: 'checkbox',
  download: false,
  print: false,
  search: false,
  filter: false,
};

export default function Sent() {
  return (
    <div style={{width: '100%' }}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
