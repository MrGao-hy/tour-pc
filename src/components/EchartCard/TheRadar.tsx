import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";

const TheRadar = () => {
  // 分割线颜色
  const splitColor = '#728AE4';
  useEffect(() => {
    const mapContainer = document.getElementById("radar") as HTMLElement;
    initMapChart(mapContainer);
    return () => {
      echarts.dispose(mapContainer);
    };
  }, [])

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer)
    const options = {
      tooltip: {
        show: false // 弹层数据去掉
      },
      legend: {
        show: false,
      },
      radar: {
        center: ['50%', '50%'], // 外圆的位置
        radius: '80%',
        name: {
          textStyle: {
            color: '#fff',
            fontSize: 18,
          }
        },
        // TODO:
        indicator: [
          {
            name: '力量',
            max: 100
          },
          {
            name: '耐力',
            max: 100
          },
          {
            name: '灵敏',
            max: 100
          },
          {
            name: '柔韧',
            max: 100
          },
          {
            name: '速度',
            max: 100
          }
        ],
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ['#131C34'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          }
        },
        axisLine: {
          // 指向外圈文本的分隔线样式
          lineStyle: {
            color: splitColor
          }
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: splitColor, // 分隔线颜色
            width: 1 // 分隔线线宽
          }
        }
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          itemStyle: {
            borderColor: 'rgba(66, 242, 185, 1)',
            color: '#fff',
            borderWidth: 0.2
          },
          lineStyle: {
            normal: {
              width: 4,
              color: '#2E71F9',
            }
          },
          data: [
            {
              // TODO:
              value: [100, 90, 80, 60, 95],
              name: '男',
              areaStyle: {
                normal: {
                  color: '#1A2F5D'
                }
              },
            },
            {
              // TODO:
              value: [40, 70, 100, 90, 40],
              name: '女',
              itemStyle: {
                borderColor: 'rgba(245, 196, 85, 1)',
                color: '#fff',
                borderWidth: 0.2
              },
              lineStyle: {
                normal: {
                  width: 4,
                  color: '#35DA83',
                }
              },
              areaStyle: {
                normal: {
                  color: '#27525D'
                }
              },
            }
          ]
        }
      ]
    };
    myChart.setOption(options);
  }

  return (
    <>
      <div id={"radar"} style={{width: '100%', height: '37.5vh'}}></div>
    </>
  )
};

export default TheRadar;