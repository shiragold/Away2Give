import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UpdateUserData } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)
  const isLoggedIn = computed(() => currentUser.value !== null)

  const login = (user: User) => {
    currentUser.value = user
    localStorage.setItem('giveaway-user', JSON.stringify(user))
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('giveaway-user')
  }

  const updateUser = (userData: UpdateUserData) => {
    if (currentUser.value) {
      currentUser.value = {
        ...currentUser.value,
        ...userData
      }
      localStorage.setItem('giveaway-user', JSON.stringify(currentUser.value))
    }
  }

  const initializeUser = () => {
    const savedUser = localStorage.getItem('giveaway-user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        // Convert date strings back to Date objects
        user.createdAt = new Date(user.createdAt)
        currentUser.value = user
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('giveaway-user')
      }
    }
  }

  const hasCompleteProfile = computed(() => {
    if (!currentUser.value) return false
    return !!(currentUser.value.name && currentUser.value.email && currentUser.value.address && currentUser.value.phone)
  })

  return {
    currentUser,
    isLoggedIn,
    hasCompleteProfile,
    login,
    logout,
    updateUser,
    initializeUser
  }
})
