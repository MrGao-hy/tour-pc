import NoticeIcon from "@/layout/default/components/action/NoticeIcon";
import { useState } from "react";
import { NoticeIconItem, StatusEnum } from "./NoticeList";
import { notification, Tag } from 'antd';
const NoticeHeaderButton: React.FC = () => {
  const [notices, setNotices] = useState<NoticeIconItem[]>(
    [
      {
        id: "1",
        extra: "一级战备",
        avatar: "",
        read: false,
        title: "三军全体集合",
        status: StatusEnum.URGENT,
        datetime: "2025-07-07 20:19:09",
        description: "北伐战争",
        type: "notification"
      },
      {
        id: "2",
        extra: "我的消息",
        avatar: "https://img2.baidu.com/it/u=2073431807,454040801&fm=253",
        read: false,
        title: "江苗苗",
        status: StatusEnum.PROCESSING,
        datetime: "2024-10-16 10:14:29",
        description: "什么时候回家",
        type: "message"
      }
    ] // 在使用时应该是通过API返回的数据
  );
  const { currentUser } = { currentUser: { unreadCount: notices.filter(item => !item.read).length } };

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = (id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.read = true;
        }
        return notice;
      })
    );
  };

  /**
   * 清除通知
   * */
  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      })
    );
    notification.success({
      message: `${'清空了'} ${title}`,
    });
  };
  return (
    <NoticeIcon
      count={currentUser?.unreadCount}
      onItemClick={(item) => {
        changeReadState(item.id!);
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => notification.info({
        message: "点击查看更多",
      })}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
      />
    </NoticeIcon>
  )
};

const getNoticeData = (
  notices: NoticeIconItem[]
): Record<string, NoticeIconItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };


    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold'
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any;
    }

    return newNotice;
  });
  const NoticeData = {
    notification: newNotices.filter(item => item.type === "notification"),
    message: newNotices.filter(item => item.type === "message"),
    event: newNotices.filter(item => item.type === "event"),
  };
  return Object.assign(NoticeData);
};
const getUnreadData = (noticeData: Record<string, NoticeIconItem[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

export default NoticeHeaderButton;