import { Card } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";

import EditDeleteCategory from "./EditDeleteCategory";
//import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";
import AddTemplateCategory from "./AddTemplateCategory";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import {
  GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
  DELETE_TEMPLATE_CATEGORY_FOR_ADMIN,
  GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN
} from "../../../../../redux/actions/form-builder";

const TemplateCategoryList = (props) => {
  const {
    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
    GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN,
    DELETE_TEMPLATE_CATEGORY_FOR_ADMIN,
    templateCategoryTypeList,
    templateCategoryList
  } = props;
  const [Id, setId] = React.useState(null);
  const [defaultAlert, setDefaultAlert] = React.useState(false);
  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,
    },
    {
      field: "type",
      headerName: "Category Type",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderCell: (params) => {
        console.log(params)
        return (
          <>
            {params.row?.type[0].name}
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,

      renderCell: (params) => {
        return (
          <>
            <span>{moment(params.row?.createdAt).format("MM/DD/YYYY")}</span>
          </>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      filter: false,
      sortable: false,
      disableColumnMenu: true,
      width: 200,

      renderCell: (params) => {
        return (
          <>
            <span>
              <EditDeleteCategory
                opentAlert={opentAlert}
                item={params?.row}
                EditFolder={<AddTemplateCategory templateCategoryTypeList={templateCategoryTypeList} handleSuccess={handleSuccess} IsEdit={true} item={params?.row} />}
              />
            </span>
          </>
        );
      },
    },
  ];
  useEffect(() => {

    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN();
    GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN();
  }, [GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN]);

  const opentAlert = (id) => {
    setId(id);
    setDefaultAlert(true);
  };
  const HandleDelete = async () => {
    await DELETE_TEMPLATE_CATEGORY_FOR_ADMIN(Id);

    setDefaultAlert(false);
    handleSuccess();
  };

  const handleSuccess = () => {
    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN();
  }
  return (
    <div style={{ height: "80vh", width: '100%' }} className="p-1">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="d-flex justify-content-between">
            <div>Category</div> <AddTemplateCategory handleSuccess={handleSuccess} templateCategoryTypeList={templateCategoryTypeList}/>
          </div>
        </Col>
        <Col sm={12}>
          <Card
            style={{
              marginTop: "1em",
              height: 630,
              width: "100%",
              overflowX: "hidden !important",
            }}
          >
            <DataGrid
              rows={templateCategoryList || []}
              columns={columns}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert}
        title="Delete Category ?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setDefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    templateCategoryTypeList:
      state.FormBuilderReducer?.templateCategoryTypes,
    templateCategoryList:
    state.FormBuilderReducer?.templateCategories,
  };
};
export default connect(mapStateToProps, {
  GET_TEMPLATE_CATEGORY_TYPE_LIST_FOR_ADMIN,
  GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
  DELETE_TEMPLATE_CATEGORY_FOR_ADMIN,
})(TemplateCategoryList);
