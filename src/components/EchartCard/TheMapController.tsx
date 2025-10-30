import { queryChinaMapApi, queryCityCountApi } from "@/api";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import { Button } from "antd";
import { ToolTipDataVo } from "components/EchartCard/TheMap"; // 引入echarts-gl支持3D地图

const img2 =
  "image://data:image/png;base64,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";

interface geoCoordMapType {
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

const TheMapController = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapList, setMapList] = useState<{ name: string; adcode: number }[]>(
    [],
  );
  const [geoCoordMap, setGeoCoordMap] = useState<geoCoordMapType[]>([]);
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null);
  // 加载状态
  const [loading, setLoading] = useState(true);
  const [toolTipData, setToolTipData] = useState<Partial<ToolTipDataVo>[]>([]);

  const queryCount = () => {
    queryCityCountApi().then((res) => {
      setToolTipData(res);
      if (mapContainerRef.current) {
        const chart = echarts.init(mapContainerRef.current);
        setMyChart(chart);
      }
    });
  };

  // 设置返回策略
  const setBackbtn = ({ name, adcode }: { name: string; adcode: number }) => {
    setMapList((prevMapList) => {
      // 检查新添加的adcode是否已在数组中
      const isExist = prevMapList.some((item) => item.adcode === adcode);
      if (isExist) {
        // 如果已存在，返回原数组（不重复添加）
        return prevMapList;
      } else {
        // 如果不存在，添加到数组末尾
        return [...prevMapList, { name, adcode }];
      }
    });
  };

  // 获取原始地图json数据
  const getJSON = (
    { name, adcode }: { name: string; adcode: number },
    callback: (data: any) => void,
  ) => {
    queryChinaMapApi(adcode)
      .then((data) => {
        callback(data);
        setBackbtn({ name, adcode });
      })
      .catch(() => {
        // alert("无此区域地图显示，请查看其他区域！");
      });
  };
  // 点击返回，地图返回上一级
  function goBack() {
    if (mapList.length >= 2) {
      const { name, adcode } = mapList[mapList.length - 2];
      mapList.splice(-2, 2);
      getJSON({ name, adcode }, function (data) {
        renderChart(name, data);
      });
    }
  }

  // 渲染地图
  const renderChart = (name: string, data: any) => {
    if (!myChart) return;
    myChart.clear();
    echarts.registerMap(name, data);
    const mapData = data.features.map((item: any) => item.properties);
    setGeoCoordMap(mapData);
    setOption(name, mapData);
  };

  // 初始化中国地图
  const initChinaMap = () => {
    setMapList([]);
    setLoading(true);
    getJSON({ name: "中国", adcode: 100000 }, (data) => {
      setLoading(false);
      renderChart("中国", data);
    });
  };

  // 柱状体的主干
  function lineData() {
    return toolTipData.map((item: any) => {
      const coord = geoCoordMap.find((ite) => (ite.name = item.name));
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
      const coord = geoCoordMap.find((ite) => (ite.name = item.name));
      if (coord) {
        return [coord.center[0], coord.center[1] + 2, item];
      }
    });
  }

  // 设置地图option
  const setOption = (name: string, data: any) => {
    const option = {
      title: {
        top: "20px",
        text: name,
        subtext: "全国注册人数分布情况",
        x: "center",
        textStyle: {
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          let toolTipHtml = "";

          const item: Partial<ToolTipDataVo> | undefined = toolTipData.find(
            (item) => item.name === params.name,
          );
          toolTipHtml += `<div class="info">
        <p>省份：${item?.name || params.name}</p>
        <p>用户数：${item?.value || 0}人</p>
    </div>`;

          return toolTipHtml;
        },
        backgroundColor: "rgba(50, 50, 50, 0.7)",
        textStyle: {
          color: "#FFFFFF",
          textalign: "center",
          fontSize: 12,
        },
      },

      series: [
        {
          type: "map3D",
          name: "map3D",
          map: name,
          label: {
            show: name !== "中国",
            formatter: function (params: any) {
              return params.name ? params.name : " ";
            },
            position: "right",
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
          itemStyle: {
            color: "#286ECA",
            opacity: 1,
            borderWidth: 0.5,
            borderColor: "#286ECA",
          },
          emphasis: {
            label: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 18,
              },
            },
            itemStyle: {
              areaColor: "#66ffff",
            },
          },
          groundPlane: {
            show: false,
            color: "#aaa",
          },
          light: {
            main: {
              color: "#3D94CE",
              intensity: 1.2,
              shadow: false,
              alpha: 55,
              beta: 10,
            },
            ambient: {
              color: "red",
              intensity: 0.5,
            },
          },
          viewControl: {
            projection: "perspective",
            autoRotate: false,
            autoRotateDirection: "cw",
            autoRotateSpeed: 10,
            autoRotateAfterStill: 3,
            damping: 0,
            rotateSensitivity: 1,
            zoomSensitivity: 1,
            panSensitivity: 1,
            panMouseButton: "left",
            rotateMouseButton: "left",
            distance: 100,
            minDistance: 40,
            maxDistance: 400,
            alpha: 60,
            beta: 0,
            minAlpha: -360,
            maxAlpha: 360,
            minBeta: -360,
            maxBeta: 360,
            center: [0, 0, 0],
            animation: true,
            animationDurationUpdate: 1000,
            animationEasingUpdate: "cubicInOut",
          },
          data: data,
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
      ],
    };
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);
      myChart.off("click"); // 先移除已有事件，防止重复绑定
      myChart.on("click", handleMapClick);
    }
  };

  // 地图点击事件处理
  const handleMapClick = (params) => {
    console.log(params);

    if (params.data) {
      setLoading(true);
      setTimeout(() => {
        const { adcode, name, level } = params.data;
        // 街道级别不再下钻
        if (level === "district") {
          alert("无此区域地图显示！");
          setLoading(false);
          return;
        }
        getJSON({ name, adcode }, (data) => {
          renderChart(name, data);
        });
      }, 500);
    }
  };

  useEffect(() => {
    queryCount();
  }, []);
  useEffect(() => {
    initChinaMap();

    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [myChart]);

  return (
    <>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ width: "100%", height: "calc(100vh - 150px)" }}
      ></div>
    </>
  );
};

export default TheMapController;
