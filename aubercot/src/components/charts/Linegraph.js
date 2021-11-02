import React from "react";

import CanvasJSReact from "../../assets/canvasjs.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Linegraph = (props) => {
  return (
    <div>
      <CanvasJSChart
        options={props.options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default Linegraph;
