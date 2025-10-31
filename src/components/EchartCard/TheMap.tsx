import React, { useEffect, useState, useRef } from "react"
import { Button, notification } from "antd"
import * as echarts from "echarts"
import { queryCityCountApi, queryChinaMapApi } from "@/api"
import type { IProperties } from "@/typing"

export interface ToolTipDataVo {
    name: string
    value: number
    areas: string[]
}

interface MapState {
    name: string
    code: number
    level: "nation" | "province" | "city"
}

const BOX_BG =
    "image://data:image/png;base64,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"

const TheMap = (): React.ReactElement => {
    const [geoCoordMap, setGeoCoordMap] = useState<IProperties[]>([])
    const [toolTipData, setToolTipData] = useState<Partial<ToolTipDataVo>[]>([])
    const [currentMap, setCurrentMap] = useState<MapState[]>([
        {
            name: "中国",
            code: 100000,
            level: "nation",
        },
    ])
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstanceRef = useRef<echarts.ECharts | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // 常量配置
    const LAYOUT_SIZE = "100%"
    const ZOOM = "1.1"

    const convertData = (data: Partial<ToolTipDataVo>[]) => {
        return data
            .map(item => {
                const geoCoord = geoCoordMap.find(gc => gc.name === item.name)
                return geoCoord
                    ? { name: geoCoord.name, value: geoCoord.center }
                    : null
            })
            .filter(Boolean) as { name: string; value: number[] }[]
    }

    // 柱状体的主干
    const lineData = () => {
        if (!toolTipData.length) {
            return [
                {
                    coords: [
                        [118.767413, 32.041544],
                        [118.767413, 33.541544],
                    ],
                },
            ]
        }

        return toolTipData
            .map(item => {
                const geoCoordinate = geoCoordMap.find(
                    gc => gc.name === item.name
                )
                if (geoCoordinate) {
                    return {
                        coords: [
                            geoCoordinate.center,
                            [
                                geoCoordinate.center[0],
                                geoCoordinate.center[1] + 1.5,
                            ],
                        ],
                    }
                }
                return null
            })
            .filter(Boolean) as { coords: number[][] }[]
    }

    // 柱状体的顶部
    const scatterData = () => {
        return toolTipData
            .map(item => {
                const geoCoordinate = geoCoordMap.find(
                    gc => gc.name === item.name
                )
                if (geoCoordinate) {
                    return [
                        geoCoordinate.center[0],
                        geoCoordinate.center[1] + 2,
                        item,
                    ]
                }
                return null
            })
            .filter(Boolean) as any[]
    }

    // 初始化地图
    const initializeMap = async () => {
        try {
            await createMapData(currentMap[0].name, currentMap[0].code)
            await queryCount()
        } catch (error) {
            console.error("初始化地图失败:", error)
            notification.error({ message: "地图初始化失败" })
        }
    }

    useEffect(() => {
        initializeMap().then()

        // 组件卸载时清理
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose()
                chartInstanceRef.current = null
            }
        }
    }, [])

    /**
     * 创建地图数据
     */
    const createMapData = async (name: string, code: number) => {
        try {
            const data = await queryChinaMapApi(code)
            echarts.registerMap(name, data)
            const mapData = data.features.map((item: any) => item.properties)
            setGeoCoordMap(mapData)
            return name
        } catch (error) {
            console.error(`获取${name}地图数据失败:`, error)
            notification.error({ message: `无${name}区域地图显示！` })
            throw error
        }
    }
    // 移除getJSON函数，直接在createMapData中使用queryChinaMapApi

    // 接口获取数据
    const queryCount = async () => {
        try {
            const res = await queryCityCountApi()
            setToolTipData(res)
        } catch (error) {
            console.error("获取城市数据失败:", error)
            notification.error({ message: "获取数据失败" })
            setToolTipData([])
        }
    }

    useEffect(() => {
        // 清理之前的定时器
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            if (chartRef.current) {
                initMapChart(chartRef.current)
            }
        }, 200)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [toolTipData, geoCoordMap])

    /**
     * 地图点击事件处理
     */
    const handleMapClick = async (params: any) => {
        if (params.data) {
            // 防止点击其他位置触发报错
            if (!params.data?.level) return
            const { adcode, name, level } = params.data
            // 街道级别不再下钻
            if (level === "district") {
                notification.error({ message: "无此区域地图显示！" })
                return
            }

            try {
                setCurrentMap(prevMap => [
                    ...prevMap,
                    {
                        name,
                        code: adcode,
                        level,
                    },
                ])
            } catch (error) {
                console.error("切换地图失败:", error)
            }
        }
    }

    // 点击返回按钮
    const onBlack = () => {
        try {
            setCurrentMap(prevMap => prevMap.slice(0, -1))
        } catch (error) {
            console.error("返回上一级地图失败:", error)
            notification.error({ message: "返回上一级失败，请重试" })
        }
    }

    // 判断是否需要更新数据
    useEffect(() => {
        const { code, name } = currentMap[currentMap.length - 1]
        if (currentMap.length > 1) {
            createMapData(name, code).then(() => {
                setToolTipData([])
            })
        } else {
            initializeMap().then()
        }
    }, [currentMap])

    const createGeoLayer = (
        zlevel: number,
        centerY: string,
        borderColor: string,
        shadowColor: string,
        shadowOffsetY: number,
        areaColor: string
    ) => ({
        type: "map" as const,
        map: currentMap[currentMap.length - 1].name,
        zlevel,
        aspectScale: 1,
        zoom: ZOOM,
        layoutCenter: ["50%", centerY],
        layoutSize: LAYOUT_SIZE,
        roam: false,
        silent: true,
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor,
                shadowColor,
                shadowOffsetY,
                shadowBlur: 15,
                areaColor,
            },
        },
    })

    const initMapChart = (mapContainer: HTMLElement) => {
        // 销毁之前的实例
        if (chartInstanceRef.current) {
            chartInstanceRef.current.dispose()
        }

        const myChart = echarts.init(mapContainer)
        chartInstanceRef.current = myChart

        const tooltipFormatter = (params: any) => {
            if (!toolTipData.length) return ""

            // 优化tooltip格式化逻辑
            const data = toolTipData.find(item => item.name === params.name)
            return data ? `${data.name}：${data.value}` : ""
        }

        const options = {
            title: {
                show: true,
                text: currentMap[currentMap.length - 1].name,
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
                formatter: tooltipFormatter,
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
                    layoutSize: LAYOUT_SIZE, //大小
                    show: true,
                    map: currentMap[currentMap.length - 1].name,
                    roam: false,
                    zoom: ZOOM,
                    aspectScale: 1,
                    label: {
                        normal: {
                            show:
                                currentMap[currentMap.length - 1].level !==
                                "nation",
                            textStyle: {
                                color: "#fff",
                                fontSize: "120%",
                            },
                            formatter: (params: any) => params.name || "",
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                                fontSize: "140%",
                                fontWeight: "bold",
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
                        },
                    },
                },
                // 使用工厂函数创建重复的图层配置
                createGeoLayer(
                    -1,
                    "51%",
                    "rgba(58,149,253,0.8)",
                    "rgba(172, 122, 255,0.5)",
                    5,
                    "rgba(5,21,35,0.1)"
                ),
                createGeoLayer(
                    -2,
                    "52%",
                    "rgba(58,149,253,0.6)",
                    "rgba(65, 214, 255,1)",
                    5,
                    "transparent"
                ),
                createGeoLayer(
                    -3,
                    "53%",
                    "rgba(58,149,253,0.4)",
                    "rgba(58,149,253,1)",
                    15,
                    "transparent"
                ),
                {
                    ...createGeoLayer(
                        -4,
                        "54%",
                        "rgba(5,9,57,0.8)",
                        "rgba(29, 111, 165,0.8)",
                        15,
                        "rgba(5,21,35,0.1)"
                    ),
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
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
                    map: currentMap[currentMap.length - 1].name,
                    geoIndex: 0,
                    aspectScale: 1, //长宽比
                    zoom: 0.05,
                    showLegendSymbol: true,
                    roam: true,
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
                                global: true,
                            },
                            borderColor: "#fff",
                            borderWidth: 0.2,
                        },
                    },
                    layoutCenter: ["50%", "50%"],
                    layoutSize: LAYOUT_SIZE,
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
                        show: false,
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
                            formatter: (params: any) => {
                                const name = params.data[2]?.name
                                const value = params.data[2]?.value
                                return `{tline|${name}} : {fline|${value}}个`
                            },
                            color: "#fff",
                            rich: {
                                fline: {
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 600,
                                },
                                tline: {
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
                    symbol: BOX_BG,
                    symbolSize: [110, 60],
                    symbolOffset: [0, -20],
                    z: 999,
                    data: scatterData(),
                },
                // 底部水波圆
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
        }

        myChart.setOption(options)
        myChart.off("click") // 先移除已有事件，防止重复绑定
        myChart.on("click", handleMapClick)

        // 添加窗口大小改变的响应
        const handleResize = () => {
            myChart && myChart.resize()
        }

        window.addEventListener("resize", handleResize)

        // 返回清理函数
        return () => {
            window.removeEventListener("resize", handleResize)
            myChart && myChart.dispose()
        }
    }

    return (
        <>
            {currentMap[currentMap.length - 1].level !== "nation" && (
                <Button
                    style={{
                        position: "absolute",
                        right: "20px",
                        cursor: "pointer",
                        color: "#fff",
                        zIndex: 999,
                    }}
                    onClick={onBlack}
                >
                    上一级
                </Button>
            )}
            <div
                ref={chartRef}
                style={{
                    width: "100%",
                    height: "calc(100vh - 180px)",
                    position: "relative",
                }}
            ></div>
        </>
    )
}

export default TheMap
