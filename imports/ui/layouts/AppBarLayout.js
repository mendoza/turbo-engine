import React, { PureComponent } from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

class AppBarLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  toggleDrawer = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  render() {
    const { open } = this.state;
    const { Routes, children } = this.props;
    return (
      <div className="RealBody">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon onClick={this.toggleDrawer} />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Kike's Autos
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onBackdropClick={this.toggleDrawer}>
          <List>
            {Routes.map(route => (
              <ListItem button key={route.name}>
                <ListItemText
                  primary={(
                    <NavLink className="MuiLink-root" to={route.path}>
                      {route.name}
                    </NavLink>
                    )}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {children}
      </div>
    );
  }
}

export default AppBarLayout;
