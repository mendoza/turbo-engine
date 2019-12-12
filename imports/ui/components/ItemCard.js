import React, { PureComponent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  IconButton,
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
    const {
      labelButton,
      title,
      body,
      description,
      action1,
      action2,
      action3,
      action4,
      classes,
      showX,
      image,
    } = this.props;
    return (
      <Card className={classes.card} elevation={10}>
        {showX ? (
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={action3}>
                <span style={{ fontSize: 12 }}>
                  <i className="fas fa-trash" />
                </span>
              </IconButton>
            }
          />
        ) : null}
        <CardActionArea onClick={action4}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image || "https://source.unsplash.com/random"}
            title="Image title"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary" onClick={action1}>
            Visualizar
          </Button>
          <Button size="small" color="primary" onClick={action2}>
            {labelButton !== null ? labelButton : "Modificar"}
          </Button>
        </CardActions> */}
      </Card>
    );
  }
}

export default withStyles(useStyles)(ItemCard);
