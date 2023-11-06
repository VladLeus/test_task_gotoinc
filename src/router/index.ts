import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyRequestsList from "@/pages/MyRequestsList.vue";
import NewRequestForm from "@/pages/NewRequestForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/requests',
      name: 'requests',
      component: MyRequestsList
    },
    {
      path: '/new-parcel',
      name: 'new-parcel',
      component: NewRequestForm
    }
  ]
});

export default router
