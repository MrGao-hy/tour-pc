import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";

type MonthVo = {
  one?: number[];
  two?: number[];
}
interface IProps {
  monthData: MonthVo
}

const TheLine = (props: IProps) => {
  const {monthData} = props;
  const stateData = {
    xAxisData: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
    sgData: monthData.one,
    bgData: monthData.two
  };

  useEffect(() => {
    const mapContainer = document.getElementById("Line") as HTMLElement;
    initMapChart(mapContainer);
    return () => {
      echarts.dispose(mapContainer);
    };
  });

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer);
    const options = {
      tooltip: {},
      legend: {
        itemWidth: 7,
        itemHeight: 7,
        // itemGap: 15,
        icon: "rect",
        // right: 0,
        textStyle: {
          fontSize: 14,
          fontFamily: "PingFangSC, PingFang SC",
          fontWeight: 400
        }
      },
      xAxis: {
        type: "category",
        // boundaryGap: false,
        data: stateData.xAxisData,
        axisLabel: {
          fontSize: 14,
          fontFamily: "PingFangSC, PingFang SC",
          fontWeight: 400
        }
      },
      yAxis: {
        type: "value",
        name: "单位/天",
        nameTextStyle: {
          fontSize: 14,
          fontFamily: "PingFangSC, PingFang SC",
          fontWeight: 400
        },
        axisLabel: {
          fontSize: 14,
          fontFamily: "PingFangSC, PingFang SC",
          fontWeight: 400
        }
      },
      series: [
        {
          name: "金额",
          data: stateData.sgData,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgba(255, 116, 133, 1)",
              lineStyle: {
                color: "rgba(255, 116, 133, 1)",
                width: 2
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(255, 116, 133, 0)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 116, 133, 1)"
                  }
                ])
              }
            }
          }
        },
        {
          name: "任务",
          data: stateData.bgData,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgba(95, 175, 255, 1)",
              lineStyle: {
                color: "rgba(95, 175, 255, 1)",
                width: 2
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "rgba(95, 175, 255, 0)"
                  },
                  {
                    offset: 1,
                    color: "rgba(95, 175, 255, 1)"
                  }
                ])
              }
            }
          }
        }
      ]
    };
    myChart.setOption(options);
  };

  return (
    <div id={ "Line" }
         className={ "map-chart" }
         style={ { width: "100%", height: "37.5vh" } }></div>
  );
};

export default TheLine;