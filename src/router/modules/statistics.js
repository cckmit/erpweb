/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const statisticsRouter = {
  path: '/statistics',
  component: Layout,
  redirect: '/statistics/device',
  alwaysShow: true, // will always show the root menu
  name: 'StatisticsManager',
  meta: {
    title: 'Statistics',
    icon: 'component',
    roles: ['root'] // you can set roles in root nav
  },
  children: [{
    path: 'device',
    component: () => import('@/views/statistics/device/index'),
    name: 'DeviceStatis',
    meta: {
      title: 'StatisticsDevice'
    }
  },
  {
    path: 'devicerunstatus',
    component: () => import('@/views/statistics/device-running-status/index'),
    name: 'DeviceRunningStatus',
    meta: {
      title: 'DeviceRunningStatus'
    }
  },
  {
    path: 'monitorrange',
    component: () => import('@/views/statistics/monitor-range/index'),
    name: 'MonitorRange',
    meta: {
      title: 'MonitorRange'
    }
  },
  {
    path: 'enter',
    component: () => import('@/views/statistics/enter/index'),
    name: 'EnterStatistics',
    meta: {
      title: 'EnterStatistics'
    }
  },
  {
    path: 'warning',
    component: () => import('@/views/statistics/warning/index'),
    name: 'AlertStatis',
    meta: {
      title: 'StatisticsWarning'
    }
  }
  ]
}

export default statisticsRouter
