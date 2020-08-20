import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = (theme) => ({
  root: {
    backgroundColor: "#dcdfce",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#333",
    margin: 0,
    lineHeight: 1.5,
    fontSize: 24,
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error.message);
    return { hasError: true };
  }

  componentDidCatch(_, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(errorInfo);
  }

  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <h1 className={classes.errorText}>Something went wrong.</h1>
          </div>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default withStyles(styles, { withTheme: true })(ErrorBoundary);
