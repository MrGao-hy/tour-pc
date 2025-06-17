import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Card } from "antd";

const ThePie = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("pie") as HTMLElement;
    initMapChart(mapContainer);
    return () => {
      echarts.dispose(mapContainer);
    };
  }, [])

  const bgColor = '#000';
  const title = '销售额';
  const color =['#c065e7','#765deb','#3862d8','#6a89E2','#219CF9','#6efbbf','#40c057','#ffd351','#ff8e43','#f56b6d'];
  const echartData = [
    {
      name: "土豆",
      value: "3720"
    },
    {
      name: "山药",
      value: "2920"
    },
    {
      name: "玉米",
      value: "2200"
    },
    {
      name: "番茄",
      value: "1420"
    },
    {
      name: "大豆",
      value: "3200"
    },
    {
      name: "韭菜",
      value: "2420"
    },
  ];

  const formatNumber = (num: number) => {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
  }
  const total = echartData.reduce((a, b: any) => {
    return a + b.value * 1
  }, 0);

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer)
    const options = {
      color: color,
      tooltip: {
        trigger: 'item'
      },
      title: [{
        text: '{name|' + title + '}\n{val|' + formatNumber(total) + '元}',
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#fff',
              padding: [10, 0]
            },
            val: {
              fontSize: 20,
              fontWeight: 'bolder',
              color: '#fff',
            }
          }
        }
      },{
        text: '单位：个',
        top: 20,
        left: 20,
        textStyle: {
          fontSize: 14,
          color:'#666666',
          fontWeight: 400
        },
        show: false
      }],
      series: [{
        type: 'pie',
        roseType: 'radius',
        radius: ['25%', '60%'],
        center: ['50%', '50%'],
        data: echartData,
        hoverAnimation: false,
        itemStyle: {
          normal: {
            borderColor: bgColor,
            borderWidth: 2
          }
        },
        labelLine: {
          normal: {
            length: 1,
            length2: 10,
            lineStyle: {
              color: '#e6e6e6'
            }
          }
        },
        label: {
          normal: {
            formatter: (params: any) => {
              return (
                '{icon|●}{name|' + params.name + '}\n{value|' +
                formatNumber(params.value) + '}'
              );
            },
            // padding: [0 , -100, 25, -100],
            rich: {
              icon: {
                fontSize: 16,
                color: 'inherit'
              },
              name: {
                fontSize: 18,
                padding: [0, 0, 0, 10],
                color: 'inherit'
              },
              value: {
                fontSize: 14,
                fontWeight: 'bolder',
                padding: [10, 0, 0, 20],
                color: 'inherit'
              }
            }
          }
        },
      }]
    };
    myChart.setOption(options);
  }

  return (
    <>
      <div id={"pie"} style={{width: '100%', height: '37.5vh'}}></div>
    </>
  )
};

export default ThePie;