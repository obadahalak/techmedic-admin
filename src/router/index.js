import { createRouter, createWebHistory } from 'vue-router'


const LoginView = () => import('../views/admin/LoginView.vue')

const CompanyView = () => import('../views/admin/CompanyView.vue')

const CertificateView = () => import('../views/admin/CertificateView.vue')

const CategoryView = () => import('../views/admin/CategoryView.vue')

const ProfilePage = () => import('../views/admin/ProfileView.vue')

const ProductView = () => import('../views/admin/ProductView.vue')

const BannerView = () => import('../views/admin/BannerView.vue')


const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: CertificateView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/banner',
      name: 'banner',
      component: BannerView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
  
  ]
})


export default router
