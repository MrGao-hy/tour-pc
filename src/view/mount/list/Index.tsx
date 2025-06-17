import React, {useEffect, useState} from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import {getMountListApi} from "@/api";
import config from "@/config";
import {MountType, RoleType} from "@/typing";

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const MountList: React.FC = () => {
    const [ page, setPage ] = useState({
        current: 1,
        size: config.pageSize,
        total: 0
    });
    const [ mountList, setMountList ] = useState<MountType[]>([]);

    useEffect(() => {
        getMountListApi(page).then(res => {
            setMountList(res.records)
        });
    }, []);
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: config.pageSize,
            }}
            dataSource={mountList}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        title={<div>{item.name}<span style={{fontSize: '12px', color: '#13C4CC', marginLeft: "5px"}}>({item.altitude}米)</span></div>}
                        description={item.introduction}
                    />
                    {111}
                </List.Item>
            )}
        />
    )
};

export default MountList;