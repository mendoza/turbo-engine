import React, { Component } from "react";
import {
  Grid,
  Snackbar,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  Checkbox,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Redirect } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Reportes from "../../api/collections/Reportes/Reportes";
import Title from "../components/Title";

class ListTickets extends Component {
  constructor(props){
    super(props);
    this.state= { 
      shouldRedirect: false, 
      pathname: "", 
      selected: [],
      enabler: false,
      open: "",
      message: "",
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick(event, id){
    const {selected} = this.state;
    let newSelected = []; 
    let newEnabler= false;
    const index = selected.indexOf(id);
    if(index === -1){
      newSelected = newSelected.concat(selected, id);
    } else if(index === 0){
      newSelected = newSelected.concat(selected.slice(1));
    } else if(index === selected.length - 1){
      newSelected = newSelected.concat(selected.slice(0, selected.length - 1))
    } else if(index > 0){  
      newSelected = newSelected.concat(selected.slice(0, index), selected.slice(index+1));
    }

    if(newSelected.length > 0){
      newEnabler = true;
    }
    this.setState({
      selected: newSelected,
      enabler: newEnabler,
    })
  }

  handleButton(){
    const {selected, enabler} = this.state;
    if(!enabler){
      this.setState({
        open: true,
        message: "Debe seleccionar un ticket mínimo"
      })
    } else {
      Meteor.call("updateReporte", {datos: selected});
      this.setState({
        open: true,
        message: "Reportes cerrados exitosamente",
        enabler: false,
        selected: [],
      })
    }
  }

  renderTicketsTable = () => {
    const { reportes } = this.props;
    const { selected } = this.state;
    return (
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"/>
            <TableCell align="left">Prioridad</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Empleado</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Comentario</TableCell>
            <TableCell align="left">Abierto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportes.map(row => {
            if (row.abierto) {
              const date = new Date(row.fecha);
              return (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Checkbox 
                      onClick={event => this.handleClick(event, row._id)}
                      inputProps={{ 'aria-labelledby': row.name }}
                      check={selected.includes(row._id)}
                      />
                  </TableCell>
                  <TableCell align="left">{row.prioridad}</TableCell>
                  <TableCell align="left">{`${date.toLocaleDateString()}`}</TableCell>
                  <TableCell align="left">{`${Meteor.users.findOne({ _id: row.empleado }).profile.firstName}`}</TableCell>
                  <TableCell align="left">{row.tipo}</TableCell>
                  <TableCell align="left">{row.comentario}</TableCell>
                  <TableCell align="left">
                    <i className={`fas fa-${row.abierto ? "check" : "times"}`} style={{ color: row.abierto ? "green" : "red" }}/>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    );
  };

  renderSnackbar = () => {
    const { showSnackbar, snackbarText } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          this.setState({ showSnackbar: false });
        }}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackbarText}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => {
              this.setState({ showSnackbar: false });
            }}>
            <i className="fas fa-times" />
          </IconButton>,
        ]}
      />
    );
  };

  render() {
    const {shouldRedirect, pathname, open, message} = this.state;
    return (
      <DashboardLayout style={{ height: "100vh" }}>
        <Title>Listado de Tickets</Title>
        <Grid container spacing={2} justify="left">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({ pathname: "crearreportes", shouldRedirect: true });
              }}>
              Agregar Ticket
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {this.handleButton()}}>
              Cerrar Tickets Seleccionados
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {this.renderTicketsTable()}
          </Grid>
        </Grid>
        {shouldRedirect ? <Redirect to={pathname} /> : null}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
          />
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Reportes.all");
  //console.log(Reportes.find().fetch());
  return { reportes: Reportes.find().fetch() };
})(ListTickets);
