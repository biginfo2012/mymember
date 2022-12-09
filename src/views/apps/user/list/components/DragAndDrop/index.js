import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import DraggableElementSkelton from "./DragAndDropSkelton";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";

import {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_CHAT_USERS_LIST,
  UPDATE_LEAD_STATUS,
} from "../../../../../../redux/actions/newstudent";
import { GET_PROGRAM_LIST } from "../../../../../../redux/actions/programe";
import { GET_MEMBERSHIP_LIST } from "../../../../../../redux/actions/shop";
import { GET_AFTER_CAMPS } from "../../../../../../redux/actions/member";

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`,
    };
  });

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(5, listKey) }),
    {}
  );

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["Cold", "Warm", "Hot", "Joined", "Not Joined"];
const listsWithColor = [
  { perfix: "Cold", color: "#00a6e169" },
  { perfix: "Warm", color: "#d71a1c4d" },
  { perfix: "Hot", color: "#ea5455a6" },
  { perfix: "Joined", color: "#01a926" },
  { perfix: "Not Joined", color: "#ef0000" },
];

export const DragAndDropSkeleton = () => {
  const [fakeElements] = React.useState(generateLists());
  return (
    <DragDropContext>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridGap: "8px",
        }}
      >
        {listsWithColor.map((list) => (
          <DraggableElementSkelton
            elements={fakeElements[list.perfix]}
            key={list.perfix}
            prefix={list.perfix}
            color={list.color}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

function DragAndDropLeadView(props) {
  const {
    listofStudentdata,
    GET_MEMBERSHIP_LIST,
    GET_PROGRAM_LIST,
    GET_CHAT_USERS_LIST,
    getDataBack,
    activeUserActionComponent,
    GET_AFTER_CAMPS,
  } = props;
  const history = useHistory();
  const [elements, setElements] = React.useState(null);
  useEffect(() => {
    history.memberpage = 1;
    history.memberrowCount = 10;

    if (!history?.fromback) {
      history.fromback = false;
      history.updated = false;
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
    }
    if (history?.updated) {
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
      history.fromback = false;
      history.updated = false;
    }
  }, [
    GET_AFTER_CAMPS,
    GET_MEMBERSHIP_LIST,
    GET_PROGRAM_LIST,
    getDataBack,
    history.fromback,
    history.memberpage,
    history.memberrowCount,
    history.updated,
  ]);

  useEffect(() => {
    GET_CHAT_USERS_LIST();
  }, [GET_CHAT_USERS_LIST]);

  useEffect(() => {
    if (listofStudentdata !== null) {
      const getItems = (listKey) => {
        /*   let filterKey = "";
        if (listKey === "Cold") {
          filterKey = "Expired";
        } else {
          filterKey = listKey;
        } */
        return listofStudentdata.filter(
          (student) => student.leadStatus === listKey
        );
      };

      setElements(
        lists.reduce(
          (acc, listKey) => ({ ...acc, [listKey]: getItems(listKey) }),
          {}
        )
      );
    }
  }, [listofStudentdata]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );

    const response = await UPDATE_LEAD_STATUS(
      {
        leadStatus: result.destination.droppableId,
      },
      removedElement._id
    );
    if (!response.success) {
      return;
    }
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "5px",
      }}
    >
      {activeUserActionComponent}
      {elements === null ? (
        <DragAndDropSkeleton />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridGap: "8px",
            }}
          >
            {listsWithColor.map((list) => (
              <DraggableElement
                elements={elements[list.perfix]}
                key={list.perfix}
                prefix={list.perfix}
                color={list.color}
              />
            ))}
          </Box>
        </DragDropContext>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    SearchStudent: state.member.SearchStudent,
    listofStudentdata: state.student.listofStudentdata,
    programList: state.program.programList,
    membershipList: state.shop.membershipList,
    getAfterCamps: state.member.getAfterCamps,
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
    clearSelectedRow: state.student.clearSelectedRow,
    chatUsersList: state.chatUsers.chatUsersList,
    isChatUsersListLoading: state.chatUsers.isLoading,
  };
};

export default connect(mapStateToProps, {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_PROGRAM_LIST,
  GET_MEMBERSHIP_LIST,
  GET_AFTER_CAMPS,
  GET_CHAT_USERS_LIST,
})(DragAndDropLeadView);
