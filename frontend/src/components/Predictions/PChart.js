import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/dateFormat";
import regression from "regression";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import addDays from "date-fns/addDays"; 

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const { Incomes, Expenses } = useGlobalContext();
  const [isPredictions, setIsPredictions] = useState(true);

  // Generate dataset labels
  const labels = useMemo(() => Incomes.map((inc) => dateFormat(inc.date)), [Incomes]);

  // Generate data for chart
  const incomeData = Incomes.map((income) => income.amount);
  const expenseData = Expenses.map((expense) => expense.amount);

  // Combine data points for regression (assuming Incomes and Expenses are matched by index)
  const regressionData = Incomes.map((income, index) => [index, income.amount]);
  const regressionResult = regression.linear(regressionData);

  // Extend predictions for future dates
  const lastDate = new Date(Incomes[Incomes.length - 1].date); // Get the last known date
  const numPredictions = 5; // Adjust for the number of future predictions
  const predictionData = [...regressionData];
  const predictionLabels = [...labels];

  for (let i = 0; i < numPredictions; i++) {
    const nextDate = addDays(lastDate, (i + 1) * 7); // Increment by a week for each prediction (adjust as needed)
    predictionLabels.push(dateFormat(nextDate));
    predictionData.push([regressionData.length + i, regressionResult.predict(regressionData.length + i)[1]]);
  }

  // Generate chart data with predictions
  const data = {
    labels: predictionLabels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "green",
        tension: 0.2,
        fill: false,
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "red",
        tension: 0.2,
        fill: false,
      },
      {
        label: "Regression Line",
        data: regressionData.map((d) => d[1]),
        borderColor: "orange",
        fill: false,
        borderDash: [3, 3],
        pointRadius: 0,
      },
      ...(isPredictions
        ? [
            {
              label: "Predicted Revenue",
              data: predictionData.map((d) => d[1]),
              borderColor: "purple",
              fill: false,
              borderDash: [10, 5],
              pointRadius: 0,
            },
          ]
        : []),
    ],
  };

  return (
    <ChartStyled>
      <div className="submit-btn">
      <button onClick={() => setIsPredictions((prev) => !prev)}>
      🔮
      </button>
      </div>
      <Line data={data} options={{ responsive: true }} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  .submit-btn{
        button {
        width:20px
        height:30px
            box-radius: 75px
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-red) !important;
        }
}   
  }
`;

export default Chart;
