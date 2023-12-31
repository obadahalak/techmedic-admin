import { createRouter, createWebHistory } from 'vue-router'
import isAuthisenticated from '../composables/isAuthenticated.js'

const LoginView = () => import('../views/admin/LoginView.vue')

const CompanyView = () => import('../views/admin/CompanyView.vue')

const CertificateView = () => import('../views/admin/CertificateView.vue')

const CategoryView = () => import('../views/admin/CategoryView.vue')

const ProfilePage = () => import('../views/admin/ProfileView.vue')

const ProductView = () => import('../views/admin/ProductView.vue')

const BannerView = () => import('../views/admin/BannerView.vue')

const NotFound = () => import('../views/admin/NotFoundView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'company',
      component: CompanyView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: CertificateView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/banner',
      name: 'banner',
      component: BannerView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/page-not-found',
    },

    {
      path: '/page-not-found',
      name: 'page-not-found',
      component: NotFound,
    },

  ],
})

router.beforeEach(async (to, from) => {
  if (
    isAuthisenticated
    && to.name === 'login'
  )
    return { name: 'category' }

  if (!isAuthisenticated && to.name !== 'login')
    return { name: 'login' }
})

export default router
