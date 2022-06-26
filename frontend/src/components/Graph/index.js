import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
//* 이거 해줘야 나타남
import { Chart as ChartJS } from "chart.js/auto";

import { GraphContainer, GraphContent } from "./GraphElement";

const Graph = ({ accumData, lineData }) => {
  useEffect(() => {}, [lineData]);
  console.log(accumData);
  console.log(lineData);
  return (
    <GraphContainer>
      {accumData && <Line data={accumData} />}

      {lineData && <Line data={lineData} />}
    </GraphContainer>
  );
};

export default Graph;
