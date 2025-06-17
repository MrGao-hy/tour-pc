interface ApplyListType extends ApplyVo {
  id: string;
}

interface ApplyVo {
  /**
   * 标题
   * */
  title: string;
  /**
   * 开始时间
   * */
  startDate: string;
  /**
   * 结束时间
   * */
  endDate: string;
  /**
   * 状态
   * */
  state: string
  /**
   * 页面地址
   * */
  url: string;
  /**
   * 是否关闭
   * */
  isFinish: boolean;
}

export type {
  ApplyListType,
  ApplyVo
}