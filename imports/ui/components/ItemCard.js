import React, { PureComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class ItemCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, body, action1, action2, classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={action1}>
            Visualizar
          </Button>
          <Button size="small" color="primary" onClick={action2}>
            Modificar
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ItemCard);
