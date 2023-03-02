import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import AdminPage from '../views/AdminPage.vue'
import AddAdmin from '../views/Add-Admin.vue'
import ContentPage from '../views/ContentPage.vue'
import AddContent from '../views/Add-Content.vue'
import ForumReportPage from '../views/ForumReport.vue'
import CounselorPage from '../views/CounselorSubmission.vue'
import UpdateCounselor from '../views/Update-Status-Counselor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/admin-list',
      name: 'admin-list',
      component: AdminPage
    },
    {
      path: '/admin-add',
      name: 'admin-add',
      component: AddAdmin
    },
    {
      path: '/content',
      name: 'content',
      component: ContentPage
    },
    {
      path: '/content-add',
      name: 'content-add',
      component: AddContent
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumReportPage
    },
    {
      path: '/admin-list',
      name: 'admin-list',
      component: AdminPage
    },
    {
      path: '/counselor',
      name: 'counselor',
      component: CounselorPage
    },
    {
      path: '/counselor-edit',
      name: 'counselor-edit',
      component: UpdateCounselor
    }
  ]
})

export default router
