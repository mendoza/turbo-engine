import React, { PureComponent } from "react";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withTracker } from "meteor/react-meteor-data";
import Piezas from "../../api/collections/Piezas/Piezas";
import DashboardLayout from "../layouts/DashboardLayout";
import ItemCard from "../components/ItemCard";

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class PiezasPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, piezas } = this.props;
    return (
      <DashboardLayout>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                Piezas
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum urna
                mauris, non tempus quam ultricies sit amet. Pellentesque pharetra et tellus aliquam
                malesuada.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Agregar otra Pieza
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Eliminar una Pieza
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {piezas.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <ItemCard
                    title="Lorem Ipsum"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum urna mauris, non tempus quam ultricies sit amet. Pellentesque pharetra et tellus aliquam malesuada."
                    action1={() => {}}
                    action2={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </DashboardLayout>
    );
  }
}

export default withStyles(useStyles)(
  withTracker(() => {
    Meteor.subscribe("piezas.all");
    return {
      piezas: Piezas.find().fetch(),
    };
  })(PiezasPage)
);
