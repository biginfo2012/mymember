import { Droppable } from "react-beautiful-dnd";
import ListItemSkelton from "./ListItemSkelton";
import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const DraggableElementSkelton = ({ prefix, color, elements }) => {
  return (
    <Box
      sx={{
        borderTop: `5px solid ${color}`,
        padding: "10px",
        borderRadius: "initial",
        background: "#f8f8f8",
        borderBottomRightRadius: "5px",
        borderBottomLeftRadius: "5px",
      }}
    >
      <Box
        sx={{
          textTransform: "capitalize",
          marginBottom: "10px",
          fontSize: "22px",
          color: "#b5b5b5",
        }}
      >
        {prefix}
      </Box>
      <Box
        sx={{
          marginBottom: "10px",
        }}
      >
        <Skeleton
          animation="wave"
          height={20}
          width="70%"
          sx={{ padding: "10px" }}
        />
      </Box>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <ListItemSkelton key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default DraggableElementSkelton;
