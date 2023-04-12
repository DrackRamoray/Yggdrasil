import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type { RouteCode } from '@ygg/constants';
import type { WithPartial, WithRequired } from './utils';

declare module 'vue-router' {
  interface RouteMeta {
    index: number;
    title: string;
    icon?: string;
    code: RouteCode;
    requiredAuth?: true;
    requiredPermission?: true;
  }
}

export type RouteRecordRawConfig = WithRequired<
  WithPartial<RouteRecordRaw, 'path'>,
  'meta'
>;

export type RouteRecordRawWithMeta = WithRequired<RouteRecordRaw, 'meta'>;

export type RouteConfigs = Record<string, RouteRecordRawConfig>;

export type ViewConfigs = Record<string, RouteComponent>;

export interface RoutesAndViews {
  routePrefix?: string;
  routeConfigs: RouteConfigs;
  viewPrefix?: string;
  viewConfigs: ViewConfigs;
}

export interface RouteIndexAndCode {
  index: number;
  code: RouteCode;
}
