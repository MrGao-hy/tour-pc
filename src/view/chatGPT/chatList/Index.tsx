import {Button, Card, Col, Image, Row} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";
import style from "./index.module.scss";
import {useNavigate} from "react-router-dom";

const cardList: any[] = [
    {
        title: "情感咨询导师晓晓",
        description: "我是您的专属情感咨询师晓晓，我会用温暖包容的方式与您共情，为您解答疑惑。",
        url: "https://mbd.baidu.com/ma/s/0ZQR6W59",
        Image: "https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/appavatar/2024-09-25/6495a408-6720-4944-995f-a64f640f8c6c.png",
    },
    {
        title: "大学知识库",
        description: "大学知识库，为你提供大学学习、实习、技能提升等全方位学习支持，助你成为优秀孩子。",
        url: "https://mbd.baidu.com/ma/s/Vd3N965i",
        Image: "https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-08-23/8acb2bec-d886-4e34-a03d-e879b9d6c9f4.JPEG",
    },
    {
        title: "旅行小达人",
        description: "你好，小旅是一个专业的旅游智能体，他的核心功能是搜寻全球各地的景点和美食，并根据用户的需求，结合地图上的位置，为用户提供一条合理且优化的旅游路线。有什么可以帮助你的吗？",
        url: "https://mbd.baidu.com/ma/s/qAkE5gLB",
        Image: "https://scenter.cdn.bcebos.com/agent/1710420063721107359image.jpg",
    },
    {
        title: "AI男友",
        description: "温柔体贴的AI男友，是你的最佳伴侣！",
        url: "https://mbd.baidu.com/ma/s/OUL2p4J8",
        Image: "https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/agent_logo/2024-04-16/e4ff025a-5a89-4a3c-b2f5-14a27280b184.png",
    }
]

const ChatList = () => {
    const navigate = useNavigate();
    const createModule = () => {};

    /**
     * 跳转到ai聊天页面
     * */
    const toAiChatPage = (url: string) => {
        navigate("/chatGPT/emotionChat", {
            state: {
                url
            }
        })
    }

    return (
        <Card title={<Button type="primary" onClick={ createModule }>创建</Button>} style={ { flex: 1 } }>
            <Row gutter={ 20 }>
                {
                    cardList.map((item, index) => (
                        <Col span={ 6 } key={index} style={ { marginBottom: "20px", height: "100%" } }>
                            <Card hoverable
                                  size={"small"}
                                  onClick={() => toAiChatPage(item.url)}
                                  cover={
                                      <Image src={item.Image} style={{height: "350px"}}></Image>
                                  }>
                                <Card.Meta title={item.title} description={<div className={style.description}>{item.description}</div>} />
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    )
}

export default ChatList;