import React from 'react';
// import PermissionData from './middleware/PermissionData'
import * as AUTH from 'auth/_store/constants'
import { getAuth } from 'utils/jwt';
const authInfo = getAuth();
const Dashboard = React.lazy(() => import('dashboard/_views'));
const Config = React.lazy(() => import('system/_views/Config'));
const BannerList = React.lazy(() => import('banner/_views/BannerList'));
const BannerDetail = React.lazy(() => import('banner/_views/BannerDetail'));
const CommentList = React.lazy(() => import('comment/_views/CommentList'));
const ArticleList = React.lazy(() => import('article/_views/ArticleList'));
const CrawlList = React.lazy(() => import('crawl/_views/CrawlList'));
const About = React.lazy(() => import('system/_views/About'));
const ArticleDetail = React.lazy(() => import('article/_views/ArticleDetail'));
const AdvertisementList = React.lazy(() => import('advertisement/_views/AdvertisementList'));
const AdvertisementDetail = React.lazy(() => import('advertisement/_views/AdvertisementDetail'));
let routes = [];

if (authInfo.type === 2) {
  const data = [
    { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
    { path: '/comment', exact: true, component: CommentList },
  ]
  routes = data
} else if (authInfo.type === 3) {
  const data = [
    { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
    { path: '/article', exact: true, component: ArticleList },
    { path: '/article/edit', exact: true, component: ArticleDetail},
  ]
  routes = data
} else {
  const data = [
    { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
    { path: '/system', exact: true, component: Config },
    { path: '/banner', exact: true, component: BannerList },
    { path: '/banner/add', exact: true, component: BannerDetail},
    { path: '/banner/detail', exact: true, component: BannerDetail},
    { path: '/banner/edit', exact: true, component: BannerDetail},
    { path: '/comment', exact: true, component: CommentList },
    { path: '/article', exact: true, component: ArticleList },
    { path: '/article/edit', exact: true, component: ArticleDetail},
    { path: '/crawl', exact: true, component: CrawlList },
    { path: '/about', exact: true, component: About },
    { path: '/advertisement', exact: true, component: AdvertisementList },
    { path: '/advertisement/add', exact: true, component: AdvertisementDetail},
    { path: '/advertisement/detail', exact: true, component: AdvertisementDetail},
    { path: '/advertisement/edit', exact: true, component: AdvertisementDetail},
  ]
  routes = data
}
// const routes = [
//   { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
//   { path: '/system', exact: true, component: Config },
//   { path: '/banner', exact: true, component: BannerList },
//   { path: '/banner/add', exact: true, component: BannerDetail},
//   { path: '/banner/detail', exact: true, component: BannerDetail},
//   { path: '/banner/edit', exact: true, component: BannerDetail},
//   { path: '/comment', exact: true, component: CommentList },
//   { path: '/article', exact: true, component: ArticleList },
//   { path: '/article/edit', exact: true, component: ArticleDetail},
//   { path: '/crawl', exact: true, component: CrawlList },
//   { path: '/about', exact: true, component: About },
//   { path: '/advertisement', exact: true, component: AdvertisementList },
//   { path: '/advertisement/add', exact: true, component: AdvertisementDetail},
//   { path: '/advertisement/detail', exact: true, component: AdvertisementDetail},
//   { path: '/advertisement/edit', exact: true, component: AdvertisementDetail},
// ]

export default routes;
