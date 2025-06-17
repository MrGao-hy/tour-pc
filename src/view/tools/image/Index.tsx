import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Image } from "antd";
import React from "react";
const name = ["小舞", "朱竹清", "白沉香", "宁荣荣", "水冰儿", "叶冷冷", "胡列娜", "波塞西",
  "千仞雪", "孟依然", "柳二龙", "阿银", "火舞", "比比东", "江楠楠", "马小桃", "", "天女兽", "", "", "小医仙",
  "萧熏儿", "美杜莎", "韩月", "紫妍", "云韵", "纳兰嫣然", "", "", "女帝", "", "","","","","", "", ""]
const cardList: any[] = []

name.map((item, index) => {
  let obj = {
    url: `http://127.0.0.1:9000/diary/image/admin/${index}.jpg`,
    name: item
  };
  cardList.push(obj)
})

const CodeModules = () => {
  const createModule = () => {};

  return (
    <Card title={<Button type="primary" onClick={ createModule }>创建</Button>} style={ { flex: 1 } }>
      <Row gutter={ 20 }>
        {
          cardList.map((item, index) => (
            <Col span={ 6 } key={index} style={ { marginBottom: "20px", height: "100%" } }>
              <Card hoverable
                    cover={
                      <Image src={item.url} style={{height: "500px"}}></Image>
                    }
                    actions={ [
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />
                    ] }>
                {/*<div style={{height: "400px"}}>*/}
                {/*111*/}
                {/*</div>*/}
                <Card.Meta title={item.name} description="www.instagram.com" />
              </Card>
            </Col>
          ))
        }
      </Row>
    </Card>
  );
};

export default CodeModules;