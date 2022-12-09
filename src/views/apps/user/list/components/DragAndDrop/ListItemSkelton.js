import { Draggable } from "react-beautiful-dnd";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const ListItemSkelton = (props) => {
  const { item, index } = props;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              padding: "10px",
              borderRadius: "6px",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              background: "#ffffff",
              margin: "0 0 8px 0",
              display: "grid",
              gridGap: "20px",
              flexDirection: "column",
            }}
          >
            <Box sx={{ fontWeight: "500" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton
                animation="wave"
                height={20}
                width="70%"
                sx={{ padding: "10px" }}
              />
            </Box>
            <Box>
              <Box>
                <Skeleton />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="rectangular" width={210} height={60} />
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default ListItemSkelton;
