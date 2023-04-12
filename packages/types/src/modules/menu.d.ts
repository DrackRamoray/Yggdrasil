import type { RouteCode } from '@ygg/constants';

export interface MenuItem {
  path: string;
  index: number;
  title: string;
  code: RouteCode;
  icon?: string;
  children: MenuItem[];
}

export type Menu = MenuItem[];
