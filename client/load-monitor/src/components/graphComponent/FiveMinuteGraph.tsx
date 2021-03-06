import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useContext } from "react";
import { LoadContext } from "context/loadContext";

interface Props {
  treshold: number;
}

const FiveMinuteGraph = ({ treshold }: Props) => {
  const { loads } = useContext(LoadContext);

  const fiveMinuteValues = loads.map((load) => [
    load.timestamp,
    +load?.normalized[1]?.toFixed(2),
  ]);

  const options: Highcharts.Options = {
    title: {
      text: "Five Minute Average",
    },
    chart: {
      borderRadius: 8,
    },
    series: [
      {
        type: "spline",
        name: "Past five minutes",
        data: fiveMinuteValues,
        color: "#25c225",
        marker: {
          radius: 3,
        },
        zones: [
          {
            value: treshold,
            color: "#25c225",
          },
          {
            color: "#ff0000",
          },
        ],
      },
    ],
    xAxis: [
      {
        tickInterval: 1000 * 60,
        type: "datetime",
      },
    ],
    yAxis: [
      {
        title: { text: "Cpu Usage" },
        plotLines: [
          {
            value: treshold,
            label: { text: "Treshold" },
            color: "#5ac291",
            zIndex: 10,
          },
        ],
      },
    ],
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default FiveMinuteGraph;
