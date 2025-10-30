import TheMap from "@/components/EchartCard/TheMap";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import TheMapController from "@/components/EchartCard/TheMapController";

const HomePage = (): React.ReactNode => {
  const [loading, setLoading] = useState(true);
  const [monthData] = useState({});
  // 模拟请求数据
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <div>
      <Card loading={loading} hoverable bordered={false} size={"small"}>
        <TheMap></TheMap>
        {/*<TheMapController></TheMapController>*/}
      </Card>
    </div>
  );
};

export default HomePage;
