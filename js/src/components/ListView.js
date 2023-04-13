import React from "react";
import { useTheme } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { greenPrimaryColor } from "../styles/themeGreen";
const ListView = props => {
  const theme = useTheme();
  return (
    <Box style={props.containerStyle}>
      <List
        style={{ backgroundColor: "white", paddingTop: 0, paddingBottom: 0 }}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItem
          style={{
            backgroundColor:
              props.headerBackgroundColor || theme.palette.primary.main
          }}
        >
          {props.columns.map((col, i1) => (
            <ListItemText key={i1} style={{ color: "white" }}>
              {col.label}
            </ListItemText>
          ))}
        </ListItem>
        {props.items.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <Divider />
              <ListItem
                style={{
                  backgroundColor: "white",
                  borderBottom: `1px solid ${greenPrimaryColor}`
                }}
              >
                {props.columns.map((col, i2) => (
                  <ListItemText style={{ flex: 1 }} key={i2}>
                    {item[col.key]}
                  </ListItemText>
                ))}
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
};

export default ListView;
