import React, { PureComponent } from "react";
import Links from "../api/links";
import { withTracker } from "meteor/react-meteor-data";

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
        <button
          onClick={() => {
            Links.insert({
              nombre: "john",
              apellido: "doe",
            });
            console.log("John doe agregado");
          }}>
          Guardar John Doe
        </button>
        <br />
        <br />
        Listar
        <br />
        {this.props.links.map(link => {
          return (
            <div>
              {link._id},{link.title},{link.apellido},{link.nombre}
            </div>
          );
        })}
        <br />
        <br />
        Eliminar uno
        <br />
        <button
          onClick={() => {
            Links.remove({ _id: "m9WR99rAM3GjnD8AJ" });
            console.log("John doe eliminado");
          }}>
          Eliminar John Doe
        </button>
        <br />
        <br />
        Update Does
        <button
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
        </button>
        <br />
        <br />
        User methods
        <button
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
        </button>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("links.all");
  return {
    links: Links.find().fetch(),
  };
})(App);
