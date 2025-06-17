import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";
import "echarts-liquidfill/src/liquidFill.js";

const TheFanshaped = () => {
  var zhibiao = 40.23;
  useEffect(() => {
    const mapContainer = document.getElementById("fanshaped") as HTMLElement;
    initMapChart(mapContainer);
    return () => {
      echarts.dispose(mapContainer);
    };
  }, []);

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer);
    const options = {
      grid: {
        containLabel: true,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        show: false,
        min: 0,
        max: 10
      },
      yAxis: {
        show: false,
        min: 0,
        max: 10
      },
      series: [{
        name: '最底层暗背景',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: "91%",
        z: 12,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        pointer: {
          show: false
        },
        anchor: {
          show: false,
          showAbove: true,
        },
        data: [{
          value: 100
        },],
        detail: {
          show: false
        },
        progress: {
          show: true,
          width: 32,
          itemStyle: {
            color: "rgba(5,39,65,1)"
          }
        },
      }, {
        name: '最底层颜色背景',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: "100%",
        z: 12,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        pointer: {
          show: false
        },
        anchor: {
          show: false,
          showAbove: true,
        },
        data: [{
          value: 100
        },],
        detail: {
          show: false
        },
        progress: {
          show: true,
          width: 10,
          itemStyle: {
            color: "rgba(250,214,57,0.3)"
          }
        },
      }, {
        name: '刻度线及刻度值',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: "80%",
        z: 14,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          // 坐标轴线
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: [
              [1, 'rgba(250,214,57,0.6)']
            ],
            width: 1,
          },
        },
        splitLine: {
          distance: 0,
          length: 8,
          lineStyle: {
            width: 1,
            color: '#FFF'
          },
        },
        axisLabel: {
          show: true,
          distance: 10,
          fontSize: 10,
          color: "#FFF",
          formatter: function (value: number) {
            return value % 20 == 0 ? value : '';
          }
        },
        axisTick: {
          distance: 0,
          length: 1,
          lineStyle: {
            color: 'rgba(250,214,57,0.6)',
          },
        },
        pointer: {
          show: false
        },
        anchor: {
          show: false,
          showAbove: true,
        },
        detail: {
          fontSize: 15,
          color: '#FFFFFFCC', // 数据详情颜色
          formatter: '完成率',
          offsetCenter: ["0%", "90%"]
        },
        data: [{
          value: zhibiao
        },],

      }, {
        name: '进度条及指示器',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: "91%",
        z: 30,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        anchor: {
          show: false,
          showAbove: true,
        },
        detail: {
          show: false
        },
        data: [{
          value: zhibiao
        },],
        pointer: {
          show: true,
          length: '100%',
          width: 1,
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          itemStyle: {
            color: '#FDD53C'
          }
        },
        progress: {
          show: true,
          width: 10,
          roundCap: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#FDD53C'
              },
                {
                  offset: 1,
                  color: '#F8EF29'
                }
              ]
            }
          }
        },
      },
        {
          name: '渐变覆盖区',
          type: 'gauge',
          center: ['50%', '50%'],
          radius: "80%",
          z: 18,
          min: 0,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              width: 32,
              color: [
                [
                  zhibiao / 100, new echarts.graphic.LinearGradient(
                  0, 1, 1, 0, [{
                    offset: 0,
                    color: 'rgba(250,214,57,0)',
                  }, {
                    offset: 0.3,
                    color: 'rgba(250,214,57,0)',
                  },
                    {
                      offset: 1,
                      color: 'rgba(250,214,57,0.9)',
                    }
                  ]
                )
                ],
                [
                  1, 'rgba(255, 36, 74,0)'
                ]
              ]
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          detail: {
            show: false
          },
          itemStyle: {
            color: 'rgba(255, 36, 74,.3)',
            borderColor: 'rgba(255, 36, 74,1)',
          },
          data: [{
            value: zhibiao
          },]
        },

        {
          name: '内圆暗色背景',
          type: 'pie',
          radius: '40%',
          center: ['50%', '50%'],
          z: 29,
          animation: false,
          itemStyle: {
            color: '#07182e',
            shadowColor: 'rgba(17,46,62,1)',
            shadowBlur: 0
          },
          hoverAnimation: false,
          label: {
            show: false,
            fontSize: 16,
            fontWeight: 400,
            color: "#FFF",
            position: 'center',
            formatter: "{c}{a|%}",
            rich: {
              a: {
                color: '#fff',
                fontSize: 10,
              }
            }
          },
          tooltip: {
            show: false,
          },
          data: [zhibiao],
        },
        {
          name: '内圆颜色背景及数值',
          type: 'pie',
          radius: '34%',
          center: ['50%', '50%'],
          z: 30,
          animation: false,
          itemStyle: {
            color: 'rgba(177,145,34, 1)',
            shadowColor: 'rgba(255, 170, 0, 0.8)',
            shadowBlur: 0
          },
          hoverAnimation: false,
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 400,
            color: "#FFF",
            position: 'center',
            formatter: "{c}{a|%}",
            rich: {
              a: {
                color: '#fff',
                fontSize: 10,
              }
            }
          },
          tooltip: {
            show: false,
          },
          data: [zhibiao],
        },
      ]
    };
    myChart.setOption(options);
  };

  return (
    <>
      <div id={ "fanshaped" }
           style={ { width: "100%", height: "37.5vh" } }></div>
    </>
  );
};

export default TheFanshaped;