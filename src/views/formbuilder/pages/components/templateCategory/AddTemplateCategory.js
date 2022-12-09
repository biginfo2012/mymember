import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Input } from "reactstrap";
import { FormGroup, FormLabel } from "@material-ui/core";
// import {
//   CREATE_EXPENSE_FOR_ADMIN,
//   EDIT_EXPENSES_CATEGROY_FOR_ADMIN,
// } from "../../../../../../redux/actions/mymoney";
import { connect } from "react-redux";
import {CREATE_TEMPLATE_CATEGORY_FOR_ADMIN, EDIT_TEMPLATE_CATEGORY_FOR_ADMIN} from "../../../../../redux/actions/form-builder";
import {toast} from "react-toastify";

const CreateTemplateCategory = (props) => {
  const [open, setOpen] = React.useState(props.IsEdit ? true : false);
  const {
    templateCategoryTypeList,
    CREATE_TEMPLATE_CATEGORY_FOR_ADMIN,
    EDIT_TEMPLATE_CATEGORY_FOR_ADMIN,
    IsEdit,
    item,
    handleSuccess
  } = props;
  const [state, setState] = React.useState({ ...item });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toastCSS = () => {
    return {
      position: "top-center",
      autoClose: 3000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };

  const handleCreate = async() => {
    if(state.name.trim().length === 0) {
      toast.error("Input Category name", toastCSS());
      return;
    }
    if (!IsEdit) {
      await CREATE_TEMPLATE_CATEGORY_FOR_ADMIN(state);
      setOpen(false);
      handleSuccess();
    } else {
      await EDIT_TEMPLATE_CATEGORY_FOR_ADMIN(
        {
          name: state.name,
          typeId: state.typeId
        },
        item?._id
      );
      setOpen(false);
      handleSuccess();
    }
  };

  return (
    <div>
      {IsEdit ? null : (
        <Button
          variant="contained"
          style={{ background: "#40a7e1", color: "#ffff", borderRadius: "6px" }}
          onClick={handleClickOpen}
        >
          Create
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // maxWidth="md"
      >
        <DialogContent>
          <div style={{minWidth:300}}>
            <FormGroup>
              <FormLabel>Category Type</FormLabel>
              <Input
                type="select"
                name="template_category_type"
                // id="exampleSelect"
                defaultValue={item?.typeId}
                onChange={(e) => {
                  setState({ ...state, typeId: e.target.value });
                }}
              >
                {/* <option>Student Belt Size</option> */}
                {templateCategoryTypeList?.map((v, i) => (
                  <option value={v._id} key={v._id}>
                    {v.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <br></br>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Category Name"
                name="template_category_name"
                id="template_category_name"
                defaultValue={item?.name}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                }}
              />
            </FormGroup>

          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{
              color: "#878787",
              borderRadius: "6px",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "#40a7e1",
              color: "#ffff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleCreate}
            variant="contained"
          >
            {IsEdit ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default connect(null, {
  EDIT_TEMPLATE_CATEGORY_FOR_ADMIN,
  CREATE_TEMPLATE_CATEGORY_FOR_ADMIN
})(CreateTemplateCategory);
