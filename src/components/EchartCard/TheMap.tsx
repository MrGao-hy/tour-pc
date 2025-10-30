import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import china from "@/config/china.json";
import { queryCityCountApi, queryChinaMapApi } from "@/api";

const img2 =
  "image://data:image/png;base64,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";
const mapName = "china";

export interface ToolTipDataVo {
  name: string;
  value: number;
  areas: string[];
}

const layoutSize = "240%";
echarts.registerMap(mapName, china as any);
interface GeoCoordMapType {
  name: string;
  acroutes: string[];
  adcode: number;
  center: number[];
  centroid: number[];
  childrenNum: number;
  level: "province";
  parent: { adcode: number };
  subFeatureIndex: 0;
}

const TheMap = (): React.ReactElement => {
  /*获取地图数据*/
  // const mapFeatures = echarts.getMap(mapName).geoJson.features;
  const [geoCoordMap, setGeoCoordMap] = useState<GeoCoordMapType[]>([]);
  const [toolTipData, setToolTipData] = useState<Partial<ToolTipDataVo>[]>([]);
  // mapFeatures.forEach(function (v: any) {
  //   // 地区名称
  //   const name = v.properties.name;
  //   // 地区经纬度
  //   geoCoordMap[name] = v.properties.cp;
  // });

  const convertData = function (data: any) {
    const res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap.find((item) => item.name === data[i].name);
      if (geoCoord) {
        res.push({
          name: geoCoord.name,
          value: geoCoord.center,
        });
      }
    }
      console.log(res, geoCoordMap, data)
    return res;
  };

  // 柱状体的主干
  function lineData() {
    return toolTipData.map((item: any) => {
      const coord = geoCoordMap.find((ite) => ite.name === item.name);
      if (coord) {
        return {
          coords: [coord.center, [coord.center[0], coord.center[1] + 1.5]],
        };
      }
    });
  }

  // 柱状体的顶部
  function scatterData() {
    return toolTipData.map((item: any) => {
      const coord = geoCoordMap.find((ite) => ite.name === item.name);
      if (coord) {
        return [coord.center[0], coord.center[1] + 2, item];
      }
    });
  }

  useEffect(() => {
    getJSON({ name: "中国", adcode: 100000 }, (data) => {
      const mapData = data.features.map((item: any) => item.properties);
      queryCount().then();
      setGeoCoordMap(mapData);
    });
  }, []);

  const queryCount = async () => {
    const res = await queryCityCountApi();
    setToolTipData(res);
  };
  // 获取原始地图json数据
  const getJSON = (
    { name, adcode }: { name: string; adcode: number },
    callback: (data: any) => void,
  ) => {
    queryChinaMapApi(adcode)
      .then((data) => {
        callback(data);
      })
      .catch(() => {
        // alert("无此区域地图显示，请查看其他区域！");
      });
  };

  useEffect(() => {
    if (toolTipData.length) {
      const mapContainer = document.getElementById("map") as HTMLElement;
      initMapChart(mapContainer);
      return () => echarts.dispose(mapContainer);
    }
  }, [toolTipData]);

  /**
   * 地图点击事件处理
   * @param params
   * */
  const handleMapClick = (params) => {
    console.log(params, params.data);
    if (params.data) {
      setTimeout(() => {
        const { adcode, name, level } = params.data;
        // 街道级别不再下钻
        if (level === "district") {
          alert("无此区域地图显示！");
          return;
        }
        getJSON({ name, adcode }, (data) => {
          const mapContainer = document.getElementById("map") as HTMLElement;
          initMapChart(mapContainer);
        });
      }, 500);
    }
  };

  const initMapChart = (mapContainer: HTMLElement) => {
    const myChart = echarts.init(mapContainer);
    const options = {
      title: {
        show: true,
        text: "用户分布",
        x: "center",
        top: "10",
        textStyle: {
          color: "#fff",
          fontFamily: "等线",
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: "none",
        formatter: function (params: any) {
          var toolTiphtml = "";
          if (typeof params.value[2] == "undefined") {
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name === toolTipData[i].name) {
                toolTiphtml +=
                  toolTipData[i].name + "：" + toolTipData[i].value;
              }
            }
          } else {
            for (var i = 0; i < toolTipData.length; i++) {
              if (params.name === toolTipData[i].name) {
                toolTiphtml +=
                  toolTipData[i].name + "：" + toolTipData[i].value;
              }
            }
          }
          return toolTiphtml;
        },
        backgroundColor: "#fff",
        borderColor: "#333",
        padding: [5, 10],
        textStyle: {
          color: "#333",
          fontSize: "16",
        },
      },
      geo: [
        {
          layoutCenter: ["50%", "50%"], //位置
          layoutSize: layoutSize, //大小
          show: true,
          map: mapName,
          roam: false,
          zoom: 0.65,
          aspectScale: 1,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: "linear",
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(3,27,78,0.75)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(58,149,253,0.75)", // 50% 处的颜色
                  },
                ],
                global: true, // 缺省为 false
              },
              borderColor: "#c0f3fb",
              borderWidth: 1,
              shadowColor: "#8cd3ef",
              shadowOffsetY: 10,
              shadowBlur: 120,
            },
            emphasis: {
              areaColor: "rgba(0,254,233,0.6)",
              // borderWidth: 0
            },
          },
        },
        {
          type: "map",
          map: mapName,
          zlevel: -1,
          aspectScale: 1,
          zoom: 0.65,
          layoutCenter: ["50%", "51%"],
          layoutSize: layoutSize,
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor:"rgba(17, 149, 216,0.6)",
              borderColor: "rgba(58,149,253,0.8)",
              shadowColor: "rgba(172, 122, 255,0.5)",
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: "rgba(5,21,35,0.1)",
            },
          },
        },
        {
          type: "map",
          map: mapName,
          zlevel: -2,
          aspectScale: 1,
          zoom: 0.65,
          layoutCenter: ["50%", "52%"],
          layoutSize: layoutSize,
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor: "rgba(57, 132, 188,0.4)",
              borderColor: "rgba(58,149,253,0.6)",
              shadowColor: "rgba(65, 214, 255,1)",
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: "transpercent",
            },
          },
        },
        {
          type: "map",
          map: mapName,
          zlevel: -3,
          aspectScale: 1,
          zoom: 0.65,
          layoutCenter: ["50%", "53%"],
          layoutSize: layoutSize,
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 1,
              // borderColor: "rgba(11, 43, 97,0.8)",
              borderColor: "rgba(58,149,253,0.4)",
              shadowColor: "rgba(58,149,253,1)",
              shadowOffsetY: 15,
              shadowBlur: 10,
              areaColor: "transpercent",
            },
          },
        },
        {
          type: "map",
          map: mapName,
          zlevel: -4,
          aspectScale: 1,
          zoom: 0.65,
          layoutCenter: ["50%", "54%"],
          layoutSize: layoutSize,
          roam: false,
          silent: true,
          itemStyle: {
            normal: {
              borderWidth: 5,
              // borderColor: "rgba(11, 43, 97,0.8)",
              borderColor: "rgba(5,9,57,0.8)",
              shadowColor: "rgba(29, 111, 165,0.8)",
              shadowOffsetY: 15,
              shadowBlur: 10,
              areaColor: "rgba(5,21,35,0.1)",
            },
          },
        },
      ],
      series: [
        {
          type: "map",
          map: mapName,
          geoIndex: 0,
          aspectScale: 1, //长宽比
          zoom: 0.65,
          showLegendSymbol: true,
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "120%",
              },
            },
            formatter: function (params: any) {
              return params.name ? "江西省" : " ";
            },
            emphasis: {
              // show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: "linear",
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(3,27,78,0.75)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(58,149,253,0.75)", // 50% 处的颜色
                  },
                ],
                global: true, // 缺省为 false
              },
              borderColor: "#fff",
              borderWidth: 0.2,
            },
          },
          layoutCenter: ["50%", "50%"],
          layoutSize: layoutSize,
          animation: false,
          markPoint: {
            symbol: "none",
          },
          data: geoCoordMap,
        },
        //柱状体的主干
        {
          type: "lines",
          zlevel: 5,
          effect: {
            show: false,
            symbolSize: 5, // 图标大小
          },
          lineStyle: {
            width: 6, // 尾迹线条宽度
            color: "rgba(249, 105, 13, .6)",
            opacity: 1, // 尾迹线条透明度
            curveness: 0, // 尾迹线条曲直度
          },
          label: {
            show: 0,
            position: "end",
            formatter: "245",
          },
          silent: true,
          data: lineData(),
        },
        // 柱状体的顶部
        {
          type: "scatter",
          coordinateSystem: "geo",
          geoIndex: 0,
          zlevel: 5,
          label: {
            normal: {
              show: true,
              formatter: function (params: any) {
                var name = params.data[2].name;
                var value = params.data[2].value;
                var text = `{tline|${name}} : {fline|${value}}个`;
                // var text = `{tline|项目个数} : {fline|${value}}`
                return text;
              },
              color: "#fff",
              rich: {
                fline: {
                  // padding: [0, 25],
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                },
                tline: {
                  // padding: [0, 27],
                  color: "#ABF8FF",
                  fontSize: 12,
                },
              },
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            color: "#00FFF6",
            opacity: 1,
          },
          symbol: img2,
          symbolSize: [110, 60],
          symbolOffset: [0, -20],
          z: 999,
          data: scatterData(),
        },
        {
          name: "Top 5",
          type: "effectScatter",
          coordinateSystem: "geo",
          data: convertData(toolTipData),
          showEffectOn: "render",
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "bottom",
              show: false,
              color: "#fff",
              distance: 10,
            },
          },
          symbol: "circle",
          symbolSize: [20, 10],
          itemStyle: {
            normal: {
              color: "#16ffff",
              shadowBlur: 10,
              shadowColor: "#16ffff",
            },
            opacity: 1,
          },
          zlevel: 4,
        },
      ],
    };

    myChart.setOption(options);
    myChart.off("click"); // 先移除已有事件，防止重复绑定
    myChart.on("click", handleMapClick);
  };

  return (
    <>
      <div
        id={"map"}
        style={{ width: "100%", height: "calc(100vh - 150px)" }}
      ></div>
    </>
  );
};

export default TheMap;
