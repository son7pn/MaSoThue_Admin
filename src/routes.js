import React from 'react';
// import PermissionData from './middleware/PermissionData'
import * as AUTH from 'auth/_store/constants'
const Dashboard = React.lazy(() => import('dashboard/_views'));
const Config = React.lazy(() => import('system/_views/Config'));
const BannerList = React.lazy(() => import('banner/_views/BannerList'));
const BannerDetail = React.lazy(() => import('banner/_views/BannerDetail'));
const CommentList = React.lazy(() => import('comment/_views/CommentList'));
const ArticleList = React.lazy(() => import('article/_views/ArticleList'));
const CrawlList = React.lazy(() => import('crawl/_views/CrawlList'));
const About = React.lazy(() => import('system/_views/About'));

const routes = [
  { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
  { path: '/system', exact: true, component: Config },
  { path: '/banner', exact: true, component: BannerList },
  { path: '/banner/add', exact: true, component: BannerDetail},
  { path: '/banner/detail', exact: true, component: BannerDetail},
  { path: '/banner/edit', exact: true, component: BannerDetail},
  { path: '/comment', exact: true, component: CommentList },
  { path: '/article', exact: true, component: ArticleList },
  { path: '/crawl', exact: true, component: CrawlList },
  { path: '/about', exact: true, component: About },
  
]

export default routes;
