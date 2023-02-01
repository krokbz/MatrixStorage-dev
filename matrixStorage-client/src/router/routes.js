const routes = [
  {
    path: '/Login',
    component: () => import('layouts/LoginPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login/LoginIndex.vue') }
    ]
  },
  {
    path: '/Administration',
    component: () => import('layouts/MatrixStorageLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '/kalupi', meta: { auth: true }, component: () => import('pages/MatrixStorage/KalupiIndex.vue') },
      { path: '/lokacije', meta: { auth: true }, component: () => import('pages/MatrixStorage/LokacijeIndex.vue') },
      { path: '/klijenti', meta: { auth: true }, component: () => import('pages/MatrixStorage/KlijentiIndex.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Login/LoginIndex.vue')
  })
}

  


export default routes
