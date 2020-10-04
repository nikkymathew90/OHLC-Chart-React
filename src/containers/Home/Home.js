import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "./../../axios-ohlc";
import classes from "./Home.module.css";

class Home extends Component {
  state = {
    data: [
      {
        x: [],
        close: [],
        decreasing: { line: { color: "#7F7F7F" } },
        high: [],
        increasing: { line: { color: "#17BECF" } },
        line: { color: "rgba(31,119,180,1)" },
        low: [],
        open: [],
        type: "ohlc",
        xaxis: "x",
        yaxis: "y"
      }
    ],
    layout: {
      dragmode: "zoom",
      autosize: true,
      width: 800,
      height: 500,
      margin: {
        r: 0,
        t: 100,
        b: 40,
        l: 100
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        title: "Date",
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    },
    error: false
  };

  componentDidMount = () => {
    axios
      .get("historical?interval=1")
      .then(response => {
        let ohlcdata = response.data
          .reduce((acc, item) => {
            acc.push(item.split(","));
            return acc;
          }, [])
          .reduce(
            (acc, record) => {
              acc.x.push(this.formatDate(record[0]));
              acc.open.push(record[1]);
              acc.high.push(record[2]);
              acc.low.push(record[3]);
              acc.close.push(record[4]);
              return acc;
            },
            { x: [], open: [], close: [], high: [], low: [] }
          );

        let chartData = [{ ...this.state.data[0], ...ohlcdata }];
        this.setState({ data: chartData });
      })
      .catch(error => {
        this.setState({ error: error.message });
        console.log("Error", error.message);
      });
  };

  formatDate = dt => {
    let d = new Date(Number(dt));
    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return date;
  };

  render() {
    const chart = this.state.error ? (
      <div className={classes.error}>Something went wrong!</div>
    ) : (
      <Plot data={this.state.data} layout={this.state.layout} />
    );
    return chart;
  }
}

export default Home;
