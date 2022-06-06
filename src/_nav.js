import { getAuth } from 'utils/jwt';
const authInfo = getAuth();
let listmenu = []
if (authInfo && authInfo.type === 2) {
  const data = [
    {
      name: 'Tổng quan',
      url: '/',
      icon: 'icon-home',
      children: []
    },
    {
      name: 'Quản lý bình luận',
      url: '/comment',
      icon: 'icon-user2',
      children: []
    },
  ]
  listmenu = data
} else if (authInfo && authInfo.type === 3) {
  const data = [
    {
      name: 'Tổng quan',
      url: '/',
      icon: 'icon-home',
      children: []
    },
    {
      name: 'Quản lý mã số thuế',
      url: '/article',
      icon: 'icon-user2',
      children: []
    },
  ]
  listmenu = data
} else {
  const data = [
    {
      name: 'Tổng quan',
      url: '/',
      icon: 'icon-home',
      children: []
    },
    {
      name: 'Quản lý banner',
      url: '/banner',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Quản lý advertisement',
      url: '/advertisement',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Quản lý mã số thuế',
      url: '/article',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Quản lý danh sách Crawl',
      url: '/crawl',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Quản lý bình luận',
      url: '/comment',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Giới thiệu công ty',
      url: '/about',
      icon: 'icon-user2',
      children: []
    },
    {
      name: 'Cài đặt hệ thống',
      url: '/system',
      icon: 'icon-user2',
      children: []
    },
  ]
  listmenu = data
}

export default {
  items: listmenu
};
