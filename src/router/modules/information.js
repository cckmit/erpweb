/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const InforRouter = {
  path: '/infomanagement',
  component: Layout,
  redirect: '/infomanagement/linelist',
  name: 'InfoManager',
  meta: {
    title: 'InfoManager',
    icon: 'tree',
    roles: ['root', 'admin']
  },

  children: [{
    path: 'linelist',
    component: () => import('@/views/info-management/line/index'),
    name: 'Linelist',
    meta: {
      title: 'LineManager',
      icon: '',
      noCache: true,
      roles: ['root', 'admin']
    }
  },
  {
    path: 'tunnellist',
    component: () => import('@/views/info-management/tunnel/index'),
    name: 'Tunnellist',
    meta: {
      title: 'TunelManager',
      icon: '',
      noCache: true,
      roles: ['root', 'admin']
    }
  },
  {
    path: 'devicelist',
    component: () => import('@/views/info-management/deviceinfo/index'),
    name: 'DeviceInfolist',
    meta: {
      title: 'DeviceInfolist',
      icon: '',
      noCache: true,
      roles: ['root', 'admin']
    }
  }
  ]
}

export default InforRouter
