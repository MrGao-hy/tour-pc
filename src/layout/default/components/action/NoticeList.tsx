import React from "react";
import { List, Avatar, theme, Tag } from "antd";
import style from "./NoticeList.module.scss";
import {useSelector} from "react-redux";
import {selectThemeColor} from "@/store/reducer/settingSlice";

const { useToken } = theme;

type NoticeIconItemType = "notification" | "message" | "event";
export enum StatusEnum {
    TODO = "todo",
    PROCESSING = "processing",
    URGENT = "urgent",
    DOING = "doing",
}
export type NoticeIconItem = {
  id: string;
  extra?: string;
  key?: string;
  read?: boolean;
  clickClose?: boolean;
  avatar?: string;
  title?: string;
  status: StatusEnum;
  datetime?: string;
  description?: string;
  type?: NoticeIconItemType;
};
export type NoticeIconTabProps = {
  count?: number;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: NoticeIconItemType;
  onClick?: (item: NoticeIconItem) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: NoticeIconItem[];
  onViewMore?: (e: any) => void;
};

const NoticeList: React.FC<NoticeIconTabProps> = ({
                                                    list = [],
                                                    onClick,
                                                    onClear,
                                                    title,
                                                    onViewMore,
                                                    emptyText,
                                                    showClear = true,
                                                    clearText,
                                                    viewMoreText,
                                                    showViewMore = false
                                                  }) => {
  const { token } = useToken();
  const themeColor = useSelector(selectThemeColor);
  if ( !list || list.length === 0 ) {
    return (
      <div style={ { color: token.colorTextSecondary } }
           className={style.notFound}>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
             alt="not found" />
        <div>{ emptyText }</div>
      </div>
    );
  }
  return (
    <div>
      <List<NoticeIconItem> className={style.list}
                            dataSource={ list }
                            renderItem={ (item, i) => {
                              // eslint-disable-next-line no-nested-ternary
                              const leftIcon = item.avatar ? (
                                typeof item.avatar === "string" ? (
                                  <Avatar className={style.avatar}
                                          src={ item.avatar } />
                                ) : (
                                  <span className="iconElement">{ item.avatar }</span>
                                )
                              ) : null;

                              return (
                                <div onClick={ () => {
                                  onClick?.(item);
                                } } className={`${style.item} ${item.read ? style.read : ""}`}>
                                  <List.Item key={ item.key || i }>
                                    <List.Item.Meta className={style.meta}
                                                    avatar={ leftIcon }
                                                    title={
                                                      <div className={style.title}>
                                                        { item.title }
                                                        <div style={ { color: token.colorTextSecondary } }
                                                             className={style.extra}>
                                                          { item.extra }
                                                        </div>
                                                      </div>
                                                    }
                                                    description={
                                                      <div>
                                                        <div className={style.description}>
                                                          { item.description }
                                                        </div>
                                                        <div className={style.datetime}>{ item.datetime }</div>
                                                      </div>
                                                    } />
                                  </List.Item>
                                </div>
                              );
                            } } />
      <div className={style.bottomBar} style={{borderTop: '1px solid ' + themeColor, color: themeColor}}>
        { showClear ? (
          <div onClick={ onClear }>
            { clearText }{ title }
          </div>
        ) : null }
        { showViewMore ? (
          <div onClick={ (e) => {
            if ( onViewMore ) {
              onViewMore(e);
            }
          } }>
            { viewMoreText }
          </div>
        ) : null }
      </div>
    </div>
  );
};

export default NoticeList;
