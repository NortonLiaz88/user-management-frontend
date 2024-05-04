// KPI.js
import React from "react";
import { KpiData } from "../../hooks/user-dashboard";

const KPI = ({ labels, values }: KpiData) => (
  <div>
    {labels?.map((label, index) => (
      <div
        style={{
          margin: "10px",
          padding: "10px",
          border: "1px solid gray",
          display: "inline-block",
        }}
      >
        <h4>{label}</h4>
        <p>{values[index]}</p>
      </div>
    ))}
  </div>
);

export default KPI;
