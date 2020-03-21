/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from "react";
import clsx from "clsx";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { dashboardRoutes } from "../Routes";
import Reportes from "../../api/collections/Reportes/Reportes";
import Title from "../components/Title";
import Empleados from "../../api/collections/Empleados/Empleados";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://github.com/Dmendoza99/turbo-engine">
        Turbo Engine
      </Link>
      {` ${new Date().getFullYear()}.`}
      <br />
      <img src="/imagenes/Logoblack.png" width="8%" height="8%" />
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    padding: 0,
    paddingBottom: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "90vh",
  },
});

class DashboardLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      empresa: {},
      shouldRedirect: false,
      pathName: "",
      anchorElement: null,
    };

    Meteor.call("getEmpresa", (error, result) => {
      this.setState({
        empresa: result,
      });
    });
  }

  render() {
    const { classes, children, currentUser, reportes, empleados } = this.props;
    const { open, anchorEl, anchorElement, empresa, shouldRedirect, pathName } = this.state;

    // Functions
    const isSuperAdminLayout = () => {
      if (currentUser && currentUser.profile.role === "superAdmin") {
        return (
          <MenuItem
            onClick={() => {
              RedirectTo("empresa");
            }}>
            <ListItemIcon>
              <i style={{ fontSize: "24px" }} className="fas fa-cog" />
            </ListItemIcon>
            <ListItemText primary="Empresa" />
          </MenuItem>
        );
      }
      return false;
    };

    const isSuperAdminButton = () => {
      if (currentUser && currentUser.profile.role === "superAdmin") {
        return (
          <IconButton color="inherit" onClick={handleClick}>
            <Badge
              badgeContent={Reportes.find({ abierto: true, visto: false }).count()}
              color="secondary">
              <i className="fas fa-bell" />
            </Badge>
          </IconButton>
        );
      }
      return false;
    };

    const isSuperAdmin = route => {
      if (currentUser && currentUser.profile.role === "superAdmin") {
        return (
          <ListItem
            button
            onClick={() => {
              RedirectTo(route.pathName);
            }}
            key={route.name}>
            <ListItemIcon>
              <i style={{ fontSize: "24px" }} className={route.icon} />
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
      }
      return false;
    };

    const isOtherUser = route => {
      return (
        <ListItem
          button
          onClick={() => {
            RedirectTo(route.pathName);
          }}
          key={route.name}>
          <ListItemIcon>
            <i style={{ fontSize: "24px" }} className={route.icon} />
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      );
    };

    const handleDrawerOpen = () => {
      this.setState({ open: true });
    };
    const handleDrawerClose = () => {
      this.setState({ open: false });
    };

    const handleClick = event => {
      this.setState({ anchorElement: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorElement: null });
    };

    const handleMoreClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleMoreClose = () => {
      this.setState({ anchorEl: null });
    };
    const RedirectTo = where => {
      this.setState({ shouldRedirect: true, pathName: where });
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <i className="fas fa-bars" />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {`${empresa.name}`}
            </Typography>
            {currentUser && currentUser.profile.role === "superAdmin" ? isSuperAdminButton() : null}
            <Menu
              id="long-menu"
              anchorEl={anchorElement}
              keepMounted
              open={Boolean(anchorElement)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              elevation={0}
              getContentAnchorEl={null}>
              {reportes.map(ticket => {
                let badge = "";
                if (currentUser && currentUser.profile.role === "superAdmin") {
                  if (ticket.abierto) {
                    if (ticket.visto) {
                      badge = "fas fa-id-badge";
                    } else {
                      badge = "fas fa-bell";
                    }
                    return (
                      <MenuItem
                        onClick={() => {
                          RedirectTo("tickets");
                          Meteor.call("viewReporte", {
                            _id: ticket._id,
                            prioridad: ticket.prioridad,
                            fecha: ticket.fecha,
                            empleado: ticket.empleado,
                            tipo: ticket.tipo,
                            comentario: ticket.comentario,
                            abierto: ticket.abierto,
                            visto: true,
                          });
                        }}>
                        <ListItemIcon>
                          <i className={badge} />
                        </ListItemIcon>
                        {Meteor.users.findOne({ _id: ticket.empleado }).profile.firstName} envió un
                        ticket
                      </MenuItem>
                    );
                  }
                }
              })}
            </Menu>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMoreClick}>
              <i className="fas fa-ellipsis-v" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMoreClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              elevation={0}
              getContentAnchorEl={null}>
              {currentUser && currentUser.profile.role === "superAdmin"
                ? isSuperAdminLayout()
                : null}
              <MenuItem onClick={() => Meteor.logout()}>
                <ListItemIcon>
                  <i className="fas fa-sign-out-alt" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}>
          <div className={classes.toolbarIcon}>
            <center>
              <img src="/imagenes/Favicon.png" width="65" height="35" />
            </center>
            <IconButton onClick={handleDrawerClose}>
              <i className="fas fa-chevron-left" />
            </IconButton>
          </div>
          <Divider />
          <List>
            {dashboardRoutes.map(Route => {
              if (Route.permission === "superAdmin") {
                return isSuperAdmin(Route);
              }
              return isOtherUser(Route);
            })}
          </List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>{children}</Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </main>
        {shouldRedirect ? <Redirect to={pathName} /> : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(
  withTracker(() => {
    Meteor.subscribe("Reportes.all");
    Meteor.subscribe("Empleados.all");
    return {
      currentUser: Meteor.user(),
      reportes: Reportes.find().fetch(),
      empleados: Empleados.find().fetch(),
    };
  })(DashboardLayout)
);
