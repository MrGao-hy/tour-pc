import TheMap from "@/components/EchartCard/TheMap";
import TheRadar from "@/components/EchartCard/TheRadar";
import TheFanshaped from "@/components/EchartCard/TheFanshaped";
import TheLine from "@/components/EchartCard/TheLine";
import TheWater from "@/components/EchartCard/TheWater";
import ThePie from "@/components/EchartCard/ThePie";
import { Row, Col, Card } from "antd";
import React, {useEffect, useState} from "react";

const HomePage = (): React.ReactNode => {
	const [ loading, setLoading ] = useState(true);
	const [ monthData] = useState({});
	// 模拟请求数据
	setTimeout(() => {
		setLoading(false)
	},2000)

	useEffect(() => {
		// const ws = new WebSocket("ws://localhost:8080/websocket/11");
		// ws.onopen = () => {
		// 	console.log('建立websocket链接====');
		// };
		// ws.onmessage = (event) => {
		// 	// const newMessages = [...messages, event.data];
		// 	// setMessages(newMessages);
		// 	console.log('Received message: ', JSON.parse(event.data));
		// 	setMonthData(JSON.parse(event.data))
		// };
		// return () => {
		// 	ws.close();
		// }
	}, [])
	return (
		<div>
			<Card loading={loading} hoverable bordered={false} size={"small"}>
				<TheMap></TheMap>
			</Card>
			{/*<Row gutter={10} justify="space-between">*/}
			{/*	<Col span={6}>*/}
			{/*		<Row gutter={[10, 10]}>*/}
			{/*			<Col span={24}>*/}
			{/*				*/}
			{/*			</Col>*/}
			{/*			<Col span={24}>*/}
			{/*				<Card loading={loading} hoverable bordered={false} style={{ backgroundColor: 'transparent' }}>*/}
			{/*					<ThePie></ThePie>*/}
			{/*				</Card>*/}
			{/*			</Col>*/}
			{/*		</Row>*/}
			{/*	</Col>*/}
			{/*	<Col span={12}>*/}
			{/*		<Row gutter={[10, 10]}>*/}
			{/*			<Col span={24}>*/}
			{/*				<TheMap></TheMap>*/}
			{/*			</Col>*/}
			{/*			<Col span={24}>*/}
			{/*				<Card loading={loading} hoverable bordered={false} style={{ backgroundColor: 'transparent' }}>*/}
			{/*					<TheLine monthData={monthData}></TheLine>*/}
			{/*				</Card>*/}
			{/*			</Col>*/}
			{/*		</Row>*/}
			{/*	</Col>*/}
			{/*	<Col span={6}>*/}
			{/*		<Row gutter={[10, 10]}>*/}
			{/*			<Col span={24}>*/}
			{/*				<Card loading={loading} hoverable bordered={false} style={{ backgroundColor: 'transparent' }}>*/}
			{/*					<TheWater></TheWater>*/}
			{/*				</Card>*/}
			{/*			</Col>*/}
			{/*			<Col span={24}>*/}
			{/*				<Card loading={loading} hoverable bordered={false} style={{ backgroundColor: 'transparent' }}>*/}
			{/*					<TheRadar></TheRadar>*/}
			{/*				</Card>*/}
			{/*			</Col>*/}
			{/*		</Row>*/}
			{/*	</Col>*/}
			{/*</Row>*/}
		</div>
	);
};

export default HomePage;