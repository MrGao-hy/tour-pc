import TheMap from "@/components/EchartCard/TheMap"
import { Card } from "antd"
import React, { useState } from "react"

const HomePage = (): React.ReactNode => {
    const [loading, setLoading] = useState(true)
    // 模拟请求数据
    setTimeout(() => {
        setLoading(false)
    }, 1000)
    return (
        <div>
            <Card
                loading={loading}
                hoverable
                variant={"outlined"}
                size={"small"}
            >
                <TheMap></TheMap>
            </Card>
        </div>
    )
}

export default HomePage
