import {
  Button, Grid
} from "@mui/material";
import
React,
{
  useEffect,
  useState
} from "react";
import { connect, useDispatch } from "react-redux";
import { Select } from "antd";
import { GET_DOCUMENT_FOLDER_LIST } from "../../../../redux/actions/document/document"
const { Option } = Select

const Documents = ({
  documentFolderList,
  GET_DOCUMENT_FOLDER_LIST,
  goBack,
  handleNext
}) => {
  const [page, setpage] = useState(0)
  const [perpage, setperpage] = useState(10)
  const [selected, setselected] = useState(null)
  const [Document, SetDocument] = useState([])
  const dispatch = useDispatch()
  const [subfolder, setsubfolder] = useState([])

  const handleselected = async (value) => {
    const filterdata = documentFolderList.filter((item) => item?._id === value)
    await setselected(value)
    await setsubfolder(filterdata[0])

  }
  const handleChangePage = () => {
    setpage(page + 1);
  };
  useEffect(() => {
    GET_DOCUMENT_FOLDER_LIST()
  }, [])

  useEffect(() => {
    if (documentFolderList) {
      let copydata = [...Document]
      copydata.push(...documentFolderList)
      SetDocument(copydata)
    }
  }, [documentFolderList])
  return (
    <div
      style={{
        width: "100%",
        margin: "1em",
        padding: '1em'
      }}>
      <div
        id="formdoc"
      >
        <h4>Type - Document</h4>
        <Grid container spacing={2}>
          <Grid item lg="6" md="6" sm="6">
            <Select
              style={{
                width: '200px'
              }}
              onChange={handleselected}
              getPopupContainer={() => document.getElementById('formdoc')}
              defaultValue={"Select one"}
            >
              {Document.length > 0 && Document?.map((item, i) => {
                return (
                  <Option value={item?._id} key={i}>
                    {item?.folderName}
                  </Option>
                )
              })}
            </Select>
          </Grid>
          <Grid item lg="6" md="6" sm="6">
            <Select
              style={{
                width: '200px'
              }}
              getPopupContainer={() => document.getElementById('formdoc')}
              defaultValue={"Select funnle"}
            >{subfolder?.subFolder?.map((item, i) => {
              return (
                <Option key={i} value={item?._id} >{item?.subFolderName}</Option>)
            })}
            </Select>
          </Grid>
        </Grid>
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex justify-content-between">
          <Button className="m-1" variant="outlined" onClick={goBack}>Back</Button>
          <Button className="m-1" variant="contained" onClick={handleNext}>Add</Button>
        </div>
      </div>
    </div >
  );
}
const mapstateprops = (state) => {
  return {
    documentFolderList: state.document.documentFolderList,

  }
}

export default connect(mapstateprops, { GET_DOCUMENT_FOLDER_LIST })(Documents);
