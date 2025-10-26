<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="implementation-selector">
          <label for="implementation-select" class="implementation-label">EX:</label>
          <select 
            id="implementation-select"
            :value="userStore.bad" 
            @change="handleImplementationChange"
            class="implementation-select"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link 
            v-if="userStore.isLoggedIn" 
            to="/profile" 
            class="nav-link"
          >
            Profile
          </router-link>
          <button 
            v-if="userStore.isLoggedIn" 
            @click="handleLogout" 
            class="nav-link logout-btn"
          >
            Logout
          </button>
          <router-link 
            v-else 
            to="/login" 
            class="nav-link"
          >
            Login
          </router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useListingsStore } from '@/stores/listings'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const listingsStore = useListingsStore()
const router = useRouter()

onMounted(() => {
  userStore.initializeUser()
  listingsStore.initializeListings()
})

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const handleImplementationChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = parseInt(target.value)
  userStore.setImplementation(value)
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.implementation-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.implementation-label {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.implementation-select {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  min-width: 2rem;
}

.implementation-select:focus {
  outline: none;
  background-color: white;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

.main-content {
  min-height: calc(100vh - 80px);
  background-color: #f8fafc;
}
</style>
