import React from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = props => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationContent}>
        <ul className={classes.NavigationItems}>
          <li className={classes.NavigationItem}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={classes.NavigationItem}>
            <NavLink to="/live-chart">Live Chart</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
