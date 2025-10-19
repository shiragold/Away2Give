<template>
  <div class="profile-view">
    <div class="container">
      <div class="profile-container">
        <h1>Profile Settings</h1>
        <p class="profile-subtitle">Update your information to start giving away items</p>
        
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="profile-form">
          <div class="form-group">
            <label for="name" class="form-label">Full Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email Address *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Address *</label>
            <textarea
              id="address"
              v-model="formData.address"
              class="form-textarea"
              placeholder="Your full address (street, city, postal code)"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number (Optional)</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="Your phone number"
            />
          </div>
          
          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <div class="form-actions">
            <router-link to="/" class="btn btn-outline">
              Back to Home
            </router-link>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isSubmitting || !isFormValid"
            >
              {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
            </button>
          </div>
        </form>
        
        <div class="profile-stats">
          <h3>Your Activity</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ myListings.length }}</span>
              <span class="stat-label">Items Listed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ requestedListings.length }}</span>
              <span class="stat-label">Items Requested</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ givenAwayCount }}</span>
              <span class="stat-label">Items Given Away</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useListingsStore } from '@/stores/listings'

const router = useRouter()
const userStore = useUserStore()
const listingsStore = useListingsStore()

const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')

const formData = ref({
  name: '',
  email: '',
  address: '',
  phone: ''
})

const myListings = computed(() => listingsStore.myListings)
const requestedListings = computed(() => listingsStore.requestedListings)

const givenAwayCount = computed(() => {
  return myListings.value.filter(listing => listing.status === 'given').length
})

const isFormValid = computed(() => {
  return formData.value.name.trim() &&
         formData.value.email.trim() &&
         formData.value.address.trim()
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  error.value = ''
  successMessage.value = ''

  try {
    const updateData = {
      name: formData.value.name.trim(),
      email: formData.value.email.trim(),
      address: formData.value.address.trim(),
      phone: formData.value.phone.trim() || undefined
    }

    await userStore.updateUser(updateData)
    successMessage.value = 'Profile updated successfully!'
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    error.value = 'Failed to update profile. Please try again.'
    console.error('Error updating profile:', err)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  listingsStore.initializeListings()
  
  // Pre-fill form with existing user data
  if (userStore.currentUser) {
    formData.value = {
      name: userStore.currentUser.name,
      email: userStore.currentUser.email,
      address: userStore.currentUser.address,
      phone: userStore.currentUser.phone || ''
    }
  }
})
</script>

<style scoped>
.profile-view {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.profile-container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.profile-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.profile-form {
  margin-bottom: 3rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.form-actions .btn {
  min-width: 120px;
}

.profile-stats {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.profile-stats h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 2rem 1rem;
    margin: 0 1rem;
  }
  
  .profile-container h1 {
    font-size: 2rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
