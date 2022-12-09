import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import {Link, useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import moment from "moment";
import EditDelete from "./components/EditDelete";
import {Pagination} from "antd";
import ConfirmationModal from "../../../components/gloabal/confirmation";
import {
  DELETE_FUNNEL,
  DELETE_TEMPLATE,
  GET_TEMPLATE,
} from "../../../redux/actions/form-builder";
import NoData from "../../../images/NoData.svg";



const Templates = (props) => {
  const { GET_TEMPLATE, templates } = props
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    GET_TEMPLATE(page, rowsPerPage);
  }, [GET_TEMPLATE]);

  useEffect(() => {
    GET_TEMPLATE(page, rowsPerPage)
  }, [page, rowsPerPage])

  const handleChangePage = (page, newPage) => {
    console.log(page + ":" + newPage);
    // setRowsPerPage(newPage)
    setPage(page - 1);
  };


  const handleCloseModal = () => {
    setOpen(false)
    setSelectedTemplate(null)
  }

  const showDeleteModal = (template) => {
    setSelectedTemplate(template)
    setOpen(true)
  }

  const onDeleteClick = () => {
    dispatch(DELETE_TEMPLATE(selectedTemplate?._id, page, rowsPerPage))
    setOpen(false)
  }

  const onArchiveClick = (id) => {
    // dispatch(ARCHIVE_FORM(id))
  }

  const handleEditForm = (id) => {
    history.push(`/builder/template/view/${id}`)
  }

  return (
    <div
      style={{
        width: "100%",
        margin: "1",
      }}>
      {
        templates?.data?.length > 0 ?
          <>
            <table className='w-100 m-1'>
              <thead>
              <tr>
                <th className='ali-centergn-items'>
                  <ListItemText className='d-flex justify-content-center'>
                    <b>Type</b>
                  </ListItemText>
                </th>
                <th>
                  <ListItemText className='d-flex justify-content-center'>
                    <b>Name</b>
                  </ListItemText>
                </th>
                <th>
                  <ListItemText className='d-flex justify-content-center'>
                    <b>Steps</b>
                  </ListItemText></th>

                <th>
                  <ListItemText className='d-flex justify-content-center'>
                    <b>Last Update</b>
                  </ListItemText></th>
                <th>
                  <ListItemText className='d-flex justify-content-center'>
                    <b>Action</b>
                  </ListItemText></th>
              </tr>
              </thead>
              <tbody>
              {templates?.data?.map((template, i) => {
                return (
                  <tr class="first-row shadow p-2 mb-2 bg-body rounded" key={i}>
                    <td
                    >
                      <ListItemText className='d-flex justify-content-center'>
                        {template?.category[0]?.name}

                      </ListItemText>
                    </td>
                    <td>
                      <ListItemText
                        className='d-flex justify-content-center'>
                        {template?.name}
                      </ListItemText>
                    </td>
                    <td>
                      <ListItemText className='d-flex justify-content-center'>
                        {template?.forms?.length}
                      </ListItemText>
                    </td>

                    <td>
                      <ListItemText className='d-flex justify-content-center'>
                        {moment(template?.created_on).startOf('day').fromNow()}
                      </ListItemText>
                    </td>
                    <td
                    >
                      <ListItemText className='d-flex justify-content-center'>
                        <EditDelete
                          isTemplate={true}
                          handleEditForm={() => handleEditForm(template._id)}
                          showDeleteModal={() => { showDeleteModal(template) }}
                        />
                      </ListItemText>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            <div className='d-flex justify-content-end'>
              <Pagination
                page={page + 1}
                pageSize={rowsPerPage}
                total={templates?.totalCount}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
              />
            </div>
          </>: <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh'
            }}>
            <div className='align-items-center'>
              <img
                src={NoData} className="no-data"
                alt="No data"
                style={{
                  height: '400px'
                }} />
              <div
                className='d-flex justify-content-center align-items-center'
                style={{
                  fontSize: "20px",
                  fontWeight: 'bold'
                }}>No templates created yet!</div>
            </div>
          </div>
          }

      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={open}
        title="Delete Template?"
        onConfirm={onDeleteClick}
        onCancel={() => {
          handleCloseModal();
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you Delete it ?"
      />
    </div >
  );
}

const mapStateToProps = (state) => {

  return {
    templates: state.FormBuilderReducer?.templates
  };
};
export default connect(mapStateToProps, {
  GET_TEMPLATE,
})(Templates);
