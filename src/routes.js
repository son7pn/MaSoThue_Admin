import React from 'react';
// import PermissionData from './middleware/PermissionData'
import * as AUTH from 'auth/_store/constants'
const Dashboard = React.lazy(() => import('dashboard/_views'));

const routes = [
  { path: '/', exact: true, name: AUTH.MODULE_DASHBOARD , component: Dashboard }, 
  
]

export default routes;
