import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ListingDetailView from '@/views/ListingDetailView.vue'
import AddListingView from '@/views/AddListingView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/listing/:id',
      name: 'listing-detail',
      component: ListingDetailView,
      props: true
    },
    {
      path: '/add-listing',
      name: 'add-listing',
      component: AddListingView,
      meta: { requiresAuth: true, requiresProfile: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // Initialize user data if not already done
  if (!userStore.currentUser) {
    userStore.initializeUser()
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresProfile && !userStore.hasCompleteProfile) {
    next({ name: 'profile' })
  } else {
    next()
  }
})

export default router
