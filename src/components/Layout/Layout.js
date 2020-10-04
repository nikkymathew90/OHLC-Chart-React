import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";
import classes from "./Layout.module.css";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <main className={classes.Main}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
