import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/admin/LoginView.vue'
import CompanyView from '../views/admin/CompanyView.vue'
import CertificateView from '../views/admin/CertificateView.vue';
import CategoryView from '../views/admin/CategoryView.vue'
import ProductView from '../views/admin/ProductView.vue'  
import BannerView from '../views/admin/BannerView.vue'
import ProfilePage from '../pages/ProfilePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
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
