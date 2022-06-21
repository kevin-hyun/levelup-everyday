import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
//* 이거 해줘야 나타남
import { Chart as ChartJS } from "chart.js/auto";

import { GraphContainer, GraphContent } from "./GraphElement";

const Graph = ({ chartData, lineData }) => {
  useEffect(() => {}, [lineData]);
  return (
    <GraphContainer>
      <p>누적 점수</p>
      {lineData && <Line data={lineData} />}
      <p>목표별 점수</p>
      {lineData && <Line data={lineData} />}
    </GraphContainer>
  );
};

export default Graph;
