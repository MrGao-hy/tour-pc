import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const name = ["小舞", "朱竹清", "白沉香", "宁荣荣"]
const cardList: any[] = []

name.map((item, index) => {
  let obj = {
    url: `http://127.0.0.1:9000/diary/image/normal/${index}.jpg`,
    name: item
  };
  cardList.push(obj)
})

const CodeModules = () => {
  const createModule = () => {};

  return (
    <Card title={<Button type="primary" onClick={ createModule }>创建</Button>} style={ { flex: 1 } }>
      <Row gutter={ 50 }>
        {
          cardList.map((item, index) => (
            <Col span={ 6 } key={index}>
              <Card style={ { marginBottom: "20px" } }
                    hoverable
                    cover={
                      <Image src={item.url}></Image>
                    }
                    actions={ [
                      <SettingOutlined key="setting" />,
                      <Link to={ "/setting/editCode" }><EditOutlined key="edit" /></Link>,
                      <EllipsisOutlined key="ellipsis" />
                    ] }>
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