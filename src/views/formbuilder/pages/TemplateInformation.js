import {
  Grid,
  Typography,
  TextareaAutosize
} from '@mui/material'
import "./home-module.scss"
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Select,
  Input,
} from 'antd'
import {GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN} from "../../../redux/actions/form-builder";
import {Button, FormGroup, Media} from "reactstrap";
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";

const { Option } = Select

const TemplateInformation = (props) => {
  const {
    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN,
    templateCategoryList,
    setState,
    state,
    action,
    error
  } = props


  useEffect(() => {
    GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN()
  }, [GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleChangeCategory = (value) => {
    setState({ ...state, categoryId: value })
  }

  const handleChangeImage = (file) => {
    if(file) {
      setState({ ...state, image: URL.createObjectURL(file), file: file })
    } else {
      setState({ ...state, image: "", file: null })
    }



  }
  return (
    <div id="templateInformation" className='m-4'>
      <Grid container spacing={1}>
        <Grid item sm={12} md={6} lg={6}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Template Name
          </Typography>
          <div>
            <Input
              style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
              type="text"
              name="name"
              placeholder="Template Name"
              onChange={handleChange}
              defaultValue={state?.name}

            />
            <div className='error'>{error?.name}</div>
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <div className='d-flex justify-content-between w-100'>
            <div className='w-100'>
              <Typography className="mb-0 fw-bolder" color="textSecondary">
                Category
              </Typography>
              <div>
                <Select
                  getPopupContainer={() => document.getElementById('templateInformation')}
                  style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%" }}
                  placeholder="Category"
                  onChange={handleChangeCategory}
                  name="categoryId"
                  defaultValue={state?.categoryId}
                >
                  {templateCategoryList?.map((v, i) => (
                    <Option value={v._id} key={v._id}>
                      {v.name}
                    </Option>
                  ))}
                </Select>
                <div className='error'>{error?.categoryId}</div>
              </div>
            </div>

          </div>
        </Grid>

        <Grid item sm={12} md={6} lg={6}>
          <div className='d-flex justify-content-between w-100'>
            <div className='w-100'>
              <Typography className="mb-0 fw-bolder" color="textSecondary">
                Thumbnail Image
              </Typography>
              <div>
                <img className="img-fluid" src={state?.image}  style={{width: '100%'}}/>
                <div className="d-flex flex-wrap justify-content-between mt-2">
                  <label
                    className="btn btn-flat-primary"
                    htmlFor="update-image"
                    color="primary">
                    Upload Image
                    <input
                      type="file"
                      id="update-image"
                      hidden
                      onChange={e => handleChangeImage(e.target.files[0])

                      }
                    />
                  </label>
                  <Button
                    color="flat-danger"
                    onClick={() => handleChangeImage(null)}>
                    Remove Image
                  </Button>
                </div>
                <div className='error'>{error?.image}</div>
              </div>
            </div>
          </div>

        </Grid>

        <Grid item sm={12} md={6} lg={6}>
          <div className='d-flex justify-content-between w-100'>
            <div className='w-100'>
              <Typography className="mb-0 fw-bolder" color="textSecondary">
                Description
              </Typography>
              <TextareaAutosize
                minRows={20}
                style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc", width: "100%", padding: "1em" }}
                fullWidth
                name="description"
                onChange={handleChange}
                defaultValue={state?.description}
              />
            </div>

          </div>

        </Grid>
      </Grid>
      <br />
      <div className='d-flex justify-content-end mt-1'>
        {action}
      </div>
    </div>
  )
}

const mapstateprops = (state) => {
  return {
    templateCategoryList: state.FormBuilderReducer?.templateCategories
  }
}
export default connect(mapstateprops, { GET_TEMPLATE_CATEGORY_LIST_FOR_ADMIN })(TemplateInformation)
