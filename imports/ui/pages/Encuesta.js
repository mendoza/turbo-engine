/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { ButtonBase, Checkbox, MenuItem } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <img src="/imagenes/Logoblack.png" width="8%" height="8%" />
      <br/>
      <Link color="inherit" href="https://material-ui.com/">
        Kike's Autos
      </Link>
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark" ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardHeaderSuccess: {
    backgroundColor: "#3f51b5",
    color: "white"
  },
  acceptButton: {
    paddingTop: "20px",
    marginTop: "20px",
  },
  cardEncuestilla: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: "Mal Servicio",
    description: [<i style={{ fontSize: "24px" }} className="far fa-angry" />],
  },
  {
    title: "Regular",
    description: [<i style={{ fontSize: "24px" }} className="far fa-meh" />],
  },
  {
    title: "Excelente Servicio",
    description: [<i style={{ fontSize: "24px" }} className="far fa-smile" />],
  },
];

// const footers = [
//   {
//     title: "Empresa",
//     description: ["Equipo", "Historia", "Contactanos", "Localidad"],
//   },
//   /*
//   {
//     title: 'Features',
//     description: ['Cool stuff', 'Random feature',
// 'Team feature', 'Developer stuff', 'Another one'],
//   },
//   {
//     title: 'Recursos',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   */
//   {
//     title: "Legal",
//     description: ["Politicas de Privacidad", "Terminos de Uso"],
//   },
// ];

export default function Encuestilla() {
  const classes = useStyles();
  const [Score, setScore] = useState(1);
  const [Comment, setComment] = useState('');
  const [ended, setEnded] = useState(false);

  const insertEncuesta = () => {
    console.log("Score: ",Score, "Comment: ",Comment)
    Meteor.call('insertEncuesta', { score: Score, comment: Comment, fecha: new Date().toLocaleDateString()}, err => {
      if (!err) {
        setEnded(true);
      }else{
        console.log("Nel, no se guardo");
      }
    })
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <nav>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Kike&apos;s Autos
            </Typography>
          </nav>
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.heroContent}>
        <center>
          <img src="/imagenes/Logoblack.png" width="20%" height="20%"/>
        </center>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Encuesta de Satisfacción de nuestros servicios
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Gracias por ser cliente de Kike&apos;s Autos,
          queremos mejorar y tu opinión cuenta. Califica
          nuestro servicio.
        </Typography>
      </Container>
      {ended ? (
        <Box>
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            ¡Muchas gracias por haber finalizado la encuesta de satisfacción!
          </Typography>
        </Box>
      ) : (
        <>
          <Container component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier, index) => (
                  // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} md={4}>
                  <ButtonBase style={{ width: '100%' }} onClick={() => setScore(index)}>
                    <Card style={{ width: '100%' }}>
                      <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: "center" }}
                        subheaderTypographyProps={{ align: "center" }}
                        className={Score === index ? classes.cardHeaderSuccess : classes.cardHeader}
                        action={Score === index ? (
                          <Checkbox
                            disableRipple
                            checked
                            style={{ color: 'white' }}
                            />
                          ) : <></>}
                        />
                      <CardContent>
                        <ul>
                          {tier.description.map(line => (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                              >
                              {line}
                            </Typography>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid>
                ))}
            </Grid>
          </Container>

          <Container>
            <Box margin="2rem">
              <Grid container spacing={5} className={classes.acceptButton}>
                <FormControl fullWidth className={classes.margin}>
                  <InputLabel htmlFor="standard-adornment-amount">
                      Espacio para sugerencias y comentarios
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    multiline
                    onInput={input => setComment(input.target.value)}
                    />
                </FormControl>
              </Grid>

              <Grid container spacing={5} className={classes.acceptButton}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={insertEncuesta}
                  >
                    Finalizar Encuesta
                </Button>
              </Grid>
            </Box>
          </Container>
        </>
        )}

      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        {/* <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </>
  );
}
