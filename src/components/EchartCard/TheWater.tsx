import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";
import "echarts-liquidfill/src/liquidFill.js";

const TheWater = () => {
  const value = 0.3421
  useEffect(() => {
    const mapContainer = document.getElementById("water") as HTMLElement;
    initMapChart(mapContainer);
    return () => {
      echarts.dispose(mapContainer);
    };
  }, []);

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer);
    const options = {
      title: [
        {
          text: '今日任务',
          top: '25%',
          left: '38%',
          textStyle: {
            fontSize: '25',
            fontWeight: '400',
            color: '#fff'
          }
        },
        {
          text: '34.21%',
          top: '40%',
          left: '30%',
          textStyle: {
            fontSize: '50',
            fontWeight: '500',
            color: '#fff'
          }
        }
      ],
      series: [
        {
          name: '最外层-虚线',
          type: 'gauge',
          radius: '100%',
          startAngle: 0,
          endAngle: 360,
          axisLine: {
            show: false
          },
          axisTick: {
            distance: -6,
            length: 2,
            lineStyle: {
              color: '#2AECFF',
              width: 5,
              type: [20],
              dashOffset: 19,
              opacity: 0.8
            },
            splitNumber: 6
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          type: 'liquidFill',
          radius: '90%',
          z: 5,
          center: ['50%', '50%'],
          amplitude: 14,
          backgroundStyle: {
            color: '#0d2d42'
          },
          color: [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: '#0061A2'
                },
                {
                  offset: 0,
                  color: '#00FFE5'
                }
              ],
              globalCoord: false
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: '#0061A2'
                },
                {
                  offset: 0,
                  color: '#00FFE5'
                }
              ],
              globalCoord: false
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: '#0061A2'
                },
                {
                  offset: 0,
                  color: '#00FFE5'
                }
              ],
              globalCoord: false
            }
          ],
          data: [
            value + 0.02,
            {
              value: value - 0.01,
              direction: 'left'
            },
            value - 0.01
          ],
          label: {
            normal: {
              formatter: ''
            }
          },
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#2AECFF'
            }
          }
        }
      ]
    };
    myChart.setOption(options);
  };

  return (
    <>
      <div id={ "water" }
           style={ { width: "100%", height: "37.5vh" } }></div>
    </>
  );
};

export default TheWater;