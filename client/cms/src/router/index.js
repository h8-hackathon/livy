import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import AdminPage from '../views/AdminPage.vue'
import AddAdmin from '../views/Add-Admin.vue'
import ContentPage from '../views/ContentPage.vue'
import AddContent from '../views/Add-Content.vue'
import EditContent from '../views/Edit-Content.vue'
import ForumReportPage from '../views/ForumReport.vue'
import AddForumReport from '../views/Add-Report.vue'
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
      path: '/content-edit/:id',
      name: 'content-edit',
      component: EditContent
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumReportPage
    },
    {
      path: '/report-add',
      name: 'report-add',
      component: AddForumReport
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

router.beforeEach((to, from, next) => {
  if (localStorage.access_token && (to.name == "login")) {
    next('/');
  } else if (!localStorage.access_token && (to.name != "login")) {
    next('/login');
  } else {
    next();
  }
});

export default router
