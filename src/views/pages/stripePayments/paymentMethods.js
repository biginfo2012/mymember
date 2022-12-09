import React, { useState } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const RenderLabel = ({ item }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      paddingRight: "10px",
    }}
  >
    <Box>
      <Typography
        sx={{
          margin: "0px !important",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        {item?.brand}
      </Typography>
      <Typography
        sx={{ margin: "0px !important" }}
      >{`xxxx xxxx xxxx ${item?.last4}`}</Typography>
    </Box>
    <Box>
      <Typography
        sx={{
          margin: "0px !important",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        expire by{" "}
      </Typography>
      <Typography
        sx={{ margin: "0px !important" }}
      >{`${item?.exp_month}/${item?.exp_year}`}</Typography>
    </Box>
  </Box>
);

const Cards = ({ item, setStripePayload }) => {
  return (
    <ListItem
      sx={{
        background: "#f6f6f6",
        border: "none",
        boxShadow: "0px 0px 2px 3px rgb(242 239 242)",
        "&:hover": {
          inset: -1,
          border: "3px solid",
          borderColor: "#2796f3",
        },
      }}
      variant="outlined"
      key={item?.card_id}
    >
      <ListItemDecorator>
        <CreditCardIcon />
      </ListItemDecorator>
      <Radio
        overlay
        color="primary"
        value={item?.card_id}
        label={<RenderLabel item={item} />}
        onChange={(event) => {
          setStripePayload({
            stripePaymentMethod: "existingCard",
            card_id: item?.card_id,
            email: item?.email,
          });
        }}
        sx={{
          flexGrow: 1,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
        componentsProps={{
          action: ({ checked }) => ({
            sx: (theme) => ({
              ...(checked && {
                inset: -1,
                borderColor: theme.vars.palette.primary[500],
                color: "#fff",
              }),
            }),
          }),
        }}
      />
    </ListItem>
  );
};

export default function PaymentMethods({
  stripePaymentMethodList,
  setStripePayload,
}) {
  return (
    <RadioGroup
      aria-label="Payment Method"
      name="card_id"
      defaultValue={stripePaymentMethodList[0]?.card_id}
      sx={{
        flexDirection: "row",
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "3px solid",
            borderColor: "#2796f3",
          },
        },
      }}
    >
      <List
        sx={{
          minWidth: 240,
          "--List-gap": "0.8rem",
          "--List-item-paddingY": "1rem",
          "--List-item-radius": "8px",
          "--List-decorator-size": "32px",
        }}
      >
        {stripePaymentMethodList?.map((item, index) => (
          <Cards
            key={index}
            item={item}
            index={index}
            setStripePayload={setStripePayload}
          />
        ))}
      </List>
    </RadioGroup>
  );
}
