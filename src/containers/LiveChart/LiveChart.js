import React, { Component } from "react";
import io from "socket.io-client";
import Plot from "react-plotly.js";

const socket = io("http://kaboom.rksv.net/watch");
//console.log("socket connection------>>", socket.connected);

class LiveChart extends Component {
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
    socket: null
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    const socket = io("http://kaboom.rksv.net/watch");
    this.setState({ socket: socket });
    socket.on("connect", () => {
      socket.emit("sub", { state: true });
      socket.on("data", (data, cb) => {
        let dataArr = data.split(",");
        let record = {
          x: [...this.state.data[0].x],
          open: [...this.state.data[0].open],
          high: [...this.state.data[0].high],
          low: [...this.state.data[0].low],
          close: [...this.state.data[0].close]
        };
        record.x.push(this.formatDate(dataArr[0]));
        record.open.push(dataArr[1]);
        record.high.push(dataArr[2]);
        record.low.push(dataArr[3]);
        record.close.push(dataArr[4]);
        let chartData = [{ ...this.state.data[0], ...record }];
        this.setState({ data: chartData });
        setTimeout(() => {
          cb(1);
        }, 900);
      });
      socket.on("error", data => {
        console.log(data);
      });
    });
  }

  formatDate = dt => {
    let d = new Date(Number(dt));
    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return `${date} ${time}`;
  };

  componentWillUnmount() {
    let socket = this.state.socket;
    socket.emit("unsub", { state: false });
  }

  render() {
    return <Plot data={this.state.data} layout={this.state.layout} />;
  }
}

export default LiveChart;
