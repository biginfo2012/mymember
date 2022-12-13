import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  useMediaQuery,
  Button
} from "@mui/material";
import {
  Add
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Formcard from './components/Formcard';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  GET_FUNNEL,
  GET_TRASH,
} from "../../../redux/actions/form-builder/index"
import BreadCrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import './home-module.scss'
import Templates from "./Templates";
import TemplateCategoryList from "./components/templateCategory/templateCategoryList";
import Radio from '@mui/material/Radio';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CardText } from 'reactstrap';

const drawerWidth = 270;

const Index = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [status, setStatus] = useState(0)
  const { uforms } = props
  const [filter, setFilter] = useState(false)
  const [allForms, setAllForms] = useState([]);
  const [page, setpage] = useState(0)
  const [perpage, setperpage] = useState(10)
  const { userinformation } = props
  useEffect(() => {
    dispatch(GET_FUNNEL(page, perpage));
  }, [dispatch]);

  useEffect(() => {
    if (status === 3) {
      dispatch(GET_TRASH(page, perpage))
    }
  }, [GET_TRASH, status])

  useEffect(() => {
    if (uforms) {
      if (uforms && status === 0) {
        setAllForms(uforms)
      } else if (uforms && status === 1) {
        const data = uforms?.memberdata?.filter((item) => item?.isFavorite === true)
        setAllForms({
          memberdata: data
        })
      } else if (uforms && status === 2) {
        const data = uforms?.memberdata?.filter((item) => item?.isArchived === true)
        setAllForms({
          memberdata: data
        })
      } else if (uforms && status === 3) {
        const data = uforms?.memberdata?.filter((item) => item?.isDeleted === true)
        setAllForms({
          memberdata: data
        })
      } else if (uforms && status === 4) {

      }
    }
  }, [uforms, status]);

  const tablet = useMediaQuery('(max-Width: 479px)');
  const desktop = useMediaQuery('(min-width: 480px)');

  const onFavouriteFormsClick = () => {
    setFilter(true)
    setStatus(1)
  }

  const onArchivedFormsClick = () => {
    setFilter(true)
    setStatus(2)
  }

  const onDeletedFormsClick = () => {
    setFilter(true)
    setStatus(3)
  }

  const onMyFormClick = () => {
    setFilter(false)
    setStatus(0)
  }

  const onTemplatesClick = () => {
    setStatus(4)
    setFilter(false)

  }
  const drawer = (
    <div
      style={{
        padding: "1rem"
      }}>
      <div
        className="d-flex align-items-center finance-nav cursor-pointer"
        onClick={onMyFormClick}>
        <div
          className={`${0 === status ? "bullet active_bullet" : "bullet"
            }`}
        />
        <CardText className={`${0 === status && "text-primary"}`}>
          My Form
        </CardText>
      </div>
      {
        userinformation?.role === 1 &&
        <div
          className="d-flex align-items-center finance-nav cursor-pointer"
          onClick={onTemplatesClick}>
          <div
            className={`${4 === status ? "bullet active_bullet" : "bullet"
              }`}
          />
          <CardText className={`${4 === status && "text-primary"}`}>
            Templates
          </CardText>
        </div>
      }
      <div
        className="d-flex align-items-center finance-nav cursor-pointer"
        onClick={onFavouriteFormsClick}>
        <div
          className={`${1 === status ? "bullet active_bullet" : "bullet"
            }`}
        />
        <CardText className={`${1 === status && "text-primary"}`}>
          Favorite
        </CardText>
      </div>
      <div
        className="d-flex align-items-center finance-nav cursor-pointer"
        onClick={onArchivedFormsClick}>
        <div
          className={`${2 === status ? "bullet active_bullet" : "bullet"
            }`}
        />
        <CardText className={`${2 === status && "text-primary"}`}>
          Archive
        </CardText>
      </div>
      <div
        className="d-flex align-items-center finance-nav cursor-pointer"
        onClick={onDeletedFormsClick}>
        <div
          className={`${3 === status ? "bullet active_bullet" : "bullet"
            }`}
        />
        <CardText className={`${3 === status && "text-primary"}`}>
          Trash
        </CardText>
      </div>
    </div>
  );

  const navToNewForm = () => {
    if (status == 4) {
      history.push("/builder/template/create")
    } else {
      history.push("/builder/create")
    }

  }

  const handleChangePage = (event, newPage) => {
    setpage(newPage - 1);
  };

  useEffect(() => {
    dispatch(GET_FUNNEL(page, perpage));
  }, [page])

  const showTemplateCategories = () => {
    setFilter(true);
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <BreadCrumbs
          breadCrumbTitle="Tools"
          breadCrumbParent="Form Builder"
          breadCrumbActive=""
        />
        <Box className='w-100'>
          <div className='w-100 d-flex justify-content-end'>
            {!filter &&
              (
                <div className='w-100 d-flex justify-content-end'>
                  {status === 4 &&
                    <Box onClick={() => showTemplateCategories()} sx={{ textAlign: 'center', marginTop: '1em', marginRight: '1em' }}>
                      {desktop &&

                        <div>
                          <Button
                            variant='contained'
                            style={{
                              borderRadius: '10px',
                              background: "rgb(251, 135, 0)",
                            }}
                          >
                            Categories
                          </Button>
                        </div>
                      }
                      {tablet &&
                        <Button variant='contained'
                          style={{
                            border: '1px solid transparent',
                            borderRadius: '10px !importent'
                          }}>
                          {<Add />}
                        </Button>
                      }
                    </Box>
                  }
                  <Box onClick={() => navToNewForm()} sx={{ textAlign: 'center', marginTop: '1em' }}>
                    {desktop &&

                      <div>
                        <Button
                          variant='contained'
                          style={{
                            borderRadius: '10px',
                            background: "#1890ff",
                          }}
                        >
                          +  Create New
                        </Button>
                      </div>
                    }
                    {tablet &&
                      <Button variant='contained'
                        style={{
                          border: '1px solid transparent',
                          borderRadius: '10px !important'
                        }}>
                        {<Add />}
                      </Button>
                    }
                  </Box>
                </div>
              )

            }
          </div>
        </Box>
      </div>
      <div className='d-flex'>
        <div
          style={{
            width: drawerWidth,
            backgroundColor: '#fff',
            padding: '0.3em'
          }}
          className='first-row shadow mb-2 bg-body rounded'
        >
          {drawer}
        </div>
        {status != 4 && allForms &&
          <Formcard allfunnels={allForms}
            page={page}
            perpage={perpage}
            handleChangePage={handleChangePage} />}
        {status == 4 && filter &&
          <TemplateCategoryList />}
        {status == 4 && !filter &&
          <Templates />}
      </div>
    </div >
  );
}

Index.propTypes = {

  window: PropTypes.func,
};

const mapstateprops = (state) => {
  return {
    uforms: state?.formbuilder.uforms,
    userinformation: state.userinfo.userinformation,
  }
}

export default connect(mapstateprops)(Index);
