import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";
import Title from "../components/Title";
import Autos from "../../api/collections/Autos/Autos";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";
import { Estados } from "../Constants";

class Vender extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { autos } = this.props;
    return (
      <DashboardLayout>
        <Title>Vender</Title>
        <Grid container spacing={2} justify="center">
          {autos.map(auto => {
            return (
              <Grid item key={auto._id} xs={12} sm={6} md={4}>
                <ItemCard
                  title={`Marca: ${auto.marca}`}
                  body={`Modelo: ${auto.modelo}`}
                  description={`Estado: ${Estados[0]}`}
                  labelButton="Comprar"
                  image={(() => {
                    try {
                      return AutosFiles.findOne({ _id: auto.pictures[0] }).link();
                    } catch (error) {
                      return undefined;
                    }
                  })()}
                  action1={() => {
                    console.log("action 1");
                  }}
                  action2={() => {
                    Meteor.call("marcarComprado", auto);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Autos.all");
  return {
    autos: Autos.find({}).fetch(),
  };
})(Vender);
