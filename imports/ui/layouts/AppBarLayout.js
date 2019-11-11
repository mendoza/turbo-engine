import React, { PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import FontIcon from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
class AppBarLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
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
        <Drawer
          open={this.state.open}
          onBackdropClick={this.toggleDrawer}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

export default AppBarLayout;
