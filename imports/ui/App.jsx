import React, { PureComponent } from "react";
import Links from "../api/collections/links";
import Autos from "../api/collections/Autos";
import { withTracker } from "meteor/react-meteor-data";
import Button from "@material-ui/core/Button";
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Agregar John Doe
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Links.insert({
              nombre: "john",
              apellido: "doe",
            });
            console.log("John doe agregado");
          }}>
          Guardar John Doe
        </Button>
        <br />
        <br />
        Listar
        <br />
        {this.props.Links.map(link => {
          return <div>{JSON.stringify(link)}</div>;
        })}
        <br />
        <br />
        Eliminar uno
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Links.remove({ _id: "m9WR99rAM3GjnD8AJ" });
            console.log("John doe eliminado");
          }}>
          Eliminar John Doe
        </Button>
        <br />
        <br />
        Update Does
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Links.update(
              { _id: "Nc8GrXyM3EjMKEgue" },
              {
                $set: { apellido: "do" },
              }
            );
            console.log("John doe eliminado");
          }}>
          Actualizar John Doe
        </Button>
        <br />
        <br />
        User methods
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            Meteor.call(
              "insertJohnDoe",
              { nombre: "john", apellido: "mayer" },
              (err, objectFromServer) => {
                if (err) {
                  alert("hubo un error");
                } else {
                  console.log("se agrego john doe");
                }
              }
            );
          }}>
          Agregar John Doe
        </Button>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("links.all");
  Meteor.subscribe("Autos.all");
  return {
    Links: Links.find().fetch(),
  };
})(App);
