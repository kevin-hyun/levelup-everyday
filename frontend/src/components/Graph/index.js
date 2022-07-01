import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
//* 이거 해줘야 나타남
import { Chart as ChartJS } from "chart.js/auto";

import { GraphContainer } from "./GraphElement";

const Graph = ({ accumData, lineData }) => {
  useEffect(() => {}, [lineData]);

  return (
    <GraphContainer>
      {accumData && <Line data={accumData} />}
      {lineData && <Line data={lineData} />}
    </GraphContainer>
  );
};

export default Graph;
