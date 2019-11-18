import React, { PureComponent } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";

class Empresa extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      empresa: {},
      name: "",
      RTN: "",
      CAI: "",
      open: false,
    };
    Meteor.call("getEmpresa", (error, result) => {
      this.setState({
        empresa: result,
        id: result._id,
        name: result.name,
        RTN: result.RTN,
        CAI: result.CAI,
      });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { name, RTN, CAI, empresa, id, open } = this.state;
    return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`Nombre: ${empresa.name}`}</Typography>
            <TextField
              label="Nombre"
              fullWidth
              value={name}
              onInput={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`RTN: ${empresa.RTN}`}</Typography>
            <TextField
              label="RTN"
              fullWidth
              value={RTN}
              onInput={e => {
                this.setState({ RTN: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="body1">{`CAI: ${empresa.CAI}`}</Typography>
            <TextField
              label="CAI"
              fullWidth
              value={CAI}
              onInput={e => {
                this.setState({ CAI: e.target.value });
              }}
            />
          </Paper>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            Meteor.call("updateEmpresa", { _id: id, name, RTN, CAI }, (error, result) => {
              this.setState({
                empresa: result,
                id: result._id,
                name: result.name,
                RTN: result.RTN,
                CAI: result.CAI,
                open: true,
              });
            });
          }}>
          Actualizar
        </Button>
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
          message={<span id="message-id">Datos Actualizados excitosamente</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </Grid>
    );
  }
}

export default Empresa;
