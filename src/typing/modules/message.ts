type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface SelectMenuType {
  item: any;
  key: string;
  keyPath: string[];
  selectedKeys: string[];
  domEvent: any;
}

interface Page<T> {
  countId: null | string;
  current: number;
  maxLimit: null | number;
  optimizeCountSql: boolean;
  orders: [];
  pages: 2
  records: T[];
  searchCount: boolean;
  size: number;
  total: number;
}

export type {
  NotificationType,
  SelectMenuType,
  Page
}