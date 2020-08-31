
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'orders', component: () => import('pages/Orders.vue') },
      { path: 'expenses', component: () => import('pages/Expenses.vue') },
      { path: 'inventories', component: () => import('pages/Inventories.vue') },
      { path: 'products', component: () => import('pages/Products.vue') },
      { path: 'sales', component: () => import('pages/Sales.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
