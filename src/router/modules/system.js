/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/list',
  name: 'SystemManager',
  meta: {
    title: 'SystemManager',
    icon: 'user',
    roles: ['root', 'admin']
  },

  children: [
    {
      path: 'list',
      component: () => import('@/views/system/user-manager/index'),
      name: 'UserList',
      meta: {
        title: 'UserManager',
        icon: '',
        noCache: true,
        roles: ['root', 'admin']
      }
    },
    {
      path: 'listdetail',
      component: () => import('@/views/system/user-manager/userDetail'),
      name: 'UserDetail',
      hidden: true,
      meta: {
        title: 'userdetail',
        icon: 'user',
        noCache: true,
        roles: ['root', 'admin']
      }
    },
    {
      path: 'role',
      name: 'RoleManager',
      component: () => import('@/views/system/role-manager/index'),
      meta: {
        title: 'RoleManager',
        noCache: true,
        icon: '',
        roles: ['root', 'admin']
      }
    },
    // {
    //   path: 'companylist',
    //   component: () => import('@/views/system/company/index'),
    //   name: 'Companylist',
    //   meta: {
    //     title: 'Company',
    //     icon: '',
    //     roles: ['root', 'admin']
    //   }
    // },
    // {
    //   path: 'companydetail',
    //   component: () => import('@/views/system/company/companyDetail'),
    //   name: 'CompanyDetail',
    //   hidden: true,
    //   meta: {
    //     title: 'Companydetail',
    //     icon: '',
    //     noCache: true,
    //     roles: ['root', 'admin']
    //   }
    // },
    {
      path: 'organizattree',
      component: () => import('@/views/system/organization/index'),
      name: 'Organization',
      meta: {
        title: 'Organization',
        icon: '',
        roles: ['root', 'admin']
      }
    },
    {
      path: 'syslist',
      component: () => import('@/views/system/syslog/index'),
      name: 'SystemLogList',
      meta: {
        title: 'SystemLog',
        icon: '',
        noCache: true,
        roles: ['root', 'admin']
      }
    },
    // {
    //   path: 'syslogdetail',
    //   component: () => import('@/views/system/syslog/userDetail'),
    //   name: 'SystemLogDetail',
    //   hidden: true,
    //   meta: {
    //     title: 'userdetail',
    //     icon: 'user',
    //     noCache: true,
    //     roles: ['root', 'admin']
    //   }
    // },
    {
      path: 'userLoglist',
      component: () => import('@/views/system/userlog/index'),
      name: 'OperationLogList',
      meta: {
        title: 'UserLog',
        icon: '',
        noCache: true,
        roles: ['root', 'admin']
      }
    }
  ]
}

export default systemRouter
