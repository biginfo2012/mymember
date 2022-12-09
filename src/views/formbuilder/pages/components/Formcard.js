import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Checkbox,
  ListItemText,
  Pagination,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DELETE_FUNNEL,
  UPDATE_FUNNEL_FIELD
} from "../../../../redux/actions/form-builder/index";
import moment from "moment";
import EditDelete from './EditDelete';
import ConfirmationModal from "../../../../../src/components/gloabal/confirmation"
import "./style.css"
import NoData from "../../../../../src/images/NoData.svg";

const Formcard = ({
  allfunnels,
  perpage,
  page,
  handleChangePage
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null)
  const count = Math.ceil(allfunnels?.totalCount / perpage);

  const onFavouriteClick = (id, item) => {
    const payload = {
      isFavorite: !item?.isFavorite
    }
    dispatch(UPDATE_FUNNEL_FIELD(payload, id, "Favorite", page, perpage))
  }

  const handleCloseModal = () => {
    setOpen(false)
    setSelectedForm(null)
  }

  const showDeleteModal = (form) => {
    setSelectedForm(form)
    setOpen(true)
  }

  const onDeleteClick = () => {
    dispatch(DELETE_FUNNEL(selectedForm?._id, page, perpage))
    setOpen(false)
  }

  const onArchiveClick = (id, items) => {
    const payload = {
      isArchived: !items?.isArchived
    }
    dispatch(UPDATE_FUNNEL_FIELD(payload, id, "Archived", page, perpage))

  }

  const handleEditForm = (id) => {
    history.push(`/builder/create/${id}`)
  }

  return (
    <div
      style={{
        width: "100%",
        margin: "1",
      }}>
      {
        allfunnels?.memberdata?.length > 0 ?
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
                      <b>Form</b>
                    </ListItemText>
                  </th>
                  <th>
                    <ListItemText className='d-flex justify-content-center'>
                      <b>Steps</b>
                    </ListItemText></th>
                  <th>
                    <ListItemText className='d-flex justify-content-center'>
                      <b>Smartlist Tags</b>
                    </ListItemText>
                  </th>
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
                {allfunnels?.memberdata?.map((form, i) => {
                  return (
                    <tr class="first-row shadow p-2 mb-2 bg-body rounded" key={i}>
                      <td
                      >
                        <ListItemText className='d-flex justify-content-center'>

                          <div className='d-flex justify-content-between'>
                            {form?.isFavorite === true ?
                              <Checkbox
                                icon={<StarBorderIcon
                                  sx={{ color: "#d3dde6" }} />}
                                defaultChecked
                                checkedIcon={<StarIcon sx={{ color: "#FFD700" }} />}
                                onClick={() => onFavouriteClick(form._id, form)}
                              />
                              :
                              <Checkbox
                                icon={<StarBorderIcon
                                  sx={{ color: "#d3dde6" }} />}
                                checkedIcon={<StarIcon sx={{ color: "#FFD700" }} />}
                                onClick={() => onFavouriteClick(form._id, form)}
                              />

                            }
                            <ListItemText className='d-flex align-items-center'>
                              <div
                                style={{
                                  background: "#d3dde6",
                                  color: '#295266',
                                  borderColor: '#d3dde6',
                                  borderRadius: '6px',
                                  padding: '0.3em',
                                  fontWeight: 'bold',
                                  fontSize: '12px',
                                  alignItems: "center",
                                  width: '100%',
                                  height: '24px'
                                }}>
                                {form?.funnelType}
                              </div>
                            </ListItemText>
                          </div>
                        </ListItemText>
                      </td>
                      <td>
                        <ListItemText
                          className='d-flex justify-content-center'>
                          <Link to={{ pathname: `/builder/create/${form._id}`, state: form }}>
                            {form?.funnelName}
                          </Link>
                        </ListItemText>
                      </td>
                      <td>
                        <ListItemText className='d-flex justify-content-center'>
                          N/A
                        </ListItemText>
                      </td>
                      <td>
                        <ListItemText className='d-flex justify-content-center'>
                          Smartlist tags
                        </ListItemText>
                      </td>
                      <td>
                        <ListItemText className='d-flex justify-content-center'>
                          {moment(form?.updatedAt).startOf('day').fromNow()}
                        </ListItemText>
                      </td>
                      <td
                      >
                        <ListItemText className='d-flex justify-content-center'>
                          <EditDelete
                            handleEditForm={() => handleEditForm(form._id)}
                            showDeleteModal={() => { showDeleteModal(form) }}
                            onArchiveClick={() => { onArchiveClick(form._id, form) }}
                            onFavouriteClick={() => { onFavouriteClick(form._id, form) }}
                            items={form}
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
                count={count}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
              />
            </div>
          </>
          : <div
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
                }}>No forms created yet!</div>
            </div>
          </div>
      }
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={open}
        title="Delete Funnel?"
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

export default Formcard;
