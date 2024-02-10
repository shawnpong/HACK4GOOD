import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";

import Title from "./Title";
import { Box } from "@mui/material";

// Sample data
const rawData = [
  { date: "2022-01-01", name: "John Doe", hours: 5 },
  { date: "2022-01-02", name: "Jane Doe", hours: 4 },
  { date: "2022-01-03", name: "Alice Smith", hours: 6 },
  { date: "2022-01-04", name: "Bob Johnson", hours: 3 },
  { date: "2022-01-05", name: "Emily Brown", hours: 5 }, // Placeholder for the current day
];

// Function to calculate cumulative hours volunteered
function calculateCumulativeHours(data) {
  let cumulativeHours = 0;
  return data.map((entry) => {
    cumulativeHours += entry.hours;
    return { date: entry.date, hours: cumulativeHours };
  });
}

// Generate chart data
const chartData = calculateCumulativeHours(rawData);

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Cumulative Hours Volunteered</Title>
      <Box style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "date",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Hours",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "hours",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
            "& .recharts-default-tooltip": {
              backgroundColor: theme.palette.grey[800], // Background color of tooltip
              color: theme.palette.common.white, // Text color of tooltip
            },
            "& .recharts-tooltip-wrapper .recharts-tooltip-label": {
              color: theme.palette.common.white, // Text color of tooltip label
            },
          }}
        />
      </Box>
    </React.Fragment>
  );
}
