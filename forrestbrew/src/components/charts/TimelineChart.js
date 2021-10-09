import React from "react";

import Chart from "react-google-charts";

const TimelineChart = (props) => {
  return (
    <Chart
      loader={<div>Loading Chart</div>}
      chartType="LineChart"
      data={props.data}
      options={{
        title: "Input Frequency",
        width: props.width + 5,
        height: props.height - 50,
        bar: { groupWidth: "70%" },
        chartArea: {
          backgroundColor: {
            fill: "white",
            fillOpacity: 0.1,
          },
          width: "90%",
          height: "70%",
        },
        // Colors the entire chart area, simple version
        // backgroundColor: '#FF0000',
        // Colors the entire chart area, with opacity
        backgroundColor: {
          fill: "gray",
          fillOpacity: 0.1,
        },
        vAxis: {
          gridlines: {
            color: "transparent",
          },
        },
        // backgroundColor: {
        //     gradient: {
        //       // Start color for gradient.
        //       color1: "#fbf6a7",
        //       // Finish color for gradient.
        //       color2: "#33b679",
        //       // Where on the boundary to start and
        //       // end the color1/color2 gradient,
        //       // relative to the upper left corner
        //       // of the boundary.
        //       x1: "0%",
        //       y1: "0%",
        //       x2: "100%",
        //       y2: "100%",
        //       // If true, the boundary for x1,
        //       // y1, x2, and y2 is the box. If
        //       // false, it's the entire chart.
        //       useObjectBoundingBoxUnits: true,
        //     },

        legend: { position: "none" },
      }}
      // For tests
    />
  );
};

export default TimelineChart;
