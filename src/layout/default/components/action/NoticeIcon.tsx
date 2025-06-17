import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Tabs, TabsProps, Popover, Spin, Badge, theme, Button } from "antd";
import NoticeList, { NoticeIconTabProps, NoticeIconItem } from "@/layout/default/components/action/NoticeList";
import style from "./NoticeIcon.module.scss"

export type NoticeIconProps = {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (
    item: NoticeIconItem,
    tabProps: NoticeIconTabProps
  ) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children?: React.ReactElement<NoticeIconTabProps>[];
};

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = (props) => {
  const { token } = theme.useToken();
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText
    } = props;
    if ( !children ) {
      return null;
    }
    const panes: TabsProps["items"] = [];
    React.Children.forEach(
      children,
      (child: React.ReactElement<NoticeIconTabProps>): void => {
        if ( !child ) {
          return;
        }
        const { list, title, count, tabKey, showClear, showViewMore } =
          child.props;
        const len = list?.length ? list.length : 0;
        const msgCount = count || count === 0 ? count : len;
        const tabTitle: string =
          msgCount > 0 ? `${ title } (${ msgCount })` : title;
        panes.push({
          key: tabKey,
          label: tabTitle,
          children: (
            <NoticeList clearText={ clearText }
                        viewMoreText={ viewMoreText }
                        list={ list }
                        tabKey={ tabKey }
                        onClear={ (): void => onClear?.(title, tabKey) }
                        onClick={ (item): void => onItemClick?.(item, child.props) }
                        onViewMore={ (event): void => onViewMore?.(child.props, event) }
                        showClear={ showClear }
                        showViewMore={ showViewMore }
                        title={ title } />
          )
        });
      }
    );
    return (
      <Spin spinning={ loading }
            delay={ 300 }>
        <Tabs centered
              style={ {
                borderRadius: token.borderRadius,
                backgroundColor: token.colorBgElevated,
                boxShadow: token.boxShadowSecondary
              } }
              className={style.tabs}
              onChange={ onTabChange }
              items={ panes } />
      </Spin>
    );
  };

  const { count, bell } = props;

  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined />;
  const trigger = (
    <Button type="text"
            icon={
                <Badge size="small"
                       count={count}
                       style={{boxShadow: "none", fontSize: 12, lineHeight: 1}}>
                    {NoticeBellIcon}
                </Badge>
            }/>
  );
    if (!notificationBox) {
        return trigger;
    }

    return (
        <Popover overlayInnerStyle={{padding: 0}}
                 showArrow={false}
                 placement="bottomRight"
                 content={notificationBox as React.ReactElement}
                 overlayClassName={style.popover}
                 trigger={["click"]}>
            {trigger}
        </Popover>
    );
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
