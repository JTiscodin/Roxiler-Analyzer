import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { barChartData } from "@/lib/types";

ChartJS.register(...registerables);

type barChartProps = {
  data: barChartData[];
  month: string;
};

export const BarChart = ({ data, month }: barChartProps) => {
  return (
    <div className=" flex flex-col justify-center w-[40vw] border-2 border-orange-600 rounded-2xl">
      <h1 className="font-bold text-2xl text-center">Bar Chart </h1>
      {data ? (
        <Bar
          data={{
            labels: data.map((e) => e.range),
            datasets: [
              {
                label: "Quantity in " + month,
                data: data.map((e) => e.count),
                backgroundColor: [
                  "rgba(43, 63, 229 ,0.8)",
                  "rgba(250, 192, 19 ,0.8 )",
                  "rgba(253, 135, 135, 0.8 )",
                ],
              
              },
            ],
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
