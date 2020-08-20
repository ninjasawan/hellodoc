import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#dcdfce",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 50,
    color: theme.palette.error.main,
  },
  title: {
    fontSize: 24,
    lineHeight: 1.5,
    color: "#333",
    margin: 0,
  },
  link: {
    textDecoration: "none",
    display: "inline-block",
    marginTop: 50,
  },
  button: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ErrorIcon className={classes.icon} />
        <h1 className={classes.title}>
          Page you are looking for does not exist.
        </h1>
        <Link to="/" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Go To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
