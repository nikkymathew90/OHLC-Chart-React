import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import LiveChart from "./containers/LiveChart/LiveChart";
import "./App.css";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/live-chart" component={LiveChart} />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default App;
