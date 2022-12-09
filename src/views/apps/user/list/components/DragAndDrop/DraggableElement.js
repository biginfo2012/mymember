import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DraggableElement = ({ prefix, color, elements }) => {
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
        <Typography
          component="span"
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
            color: "#b5b5b5",
          }}
        >
          {elements.length > 0 ? `${elements.length} Leads` : `0 Leads`}{" "}
        </Typography>
        <Typography
          component="span"
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
            color: "#00c551",
          }}
        >
          $0
        </Typography>
      </Box>

      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.length > 0
              ? elements.map((item, index) => (
                  <ListItem key={item._id} item={item} index={index} />
                ))
              : "No Lead Found!"}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default DraggableElement;
