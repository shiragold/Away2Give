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
            <label for="name" class="form-label">Full Name</label>
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
            <label for="email" class="form-label">Email Address</label>
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
            <label for="address" class="form-label">Address</label>
            <textarea
              id="address"
              v-model="formData.address"
              class="form-textarea"
              placeholder="Your full address (street, city, postal code)"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="Your phone number"
              required
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
        
        <div v-if="userStore.isLoggedIn && requestedListings.length > 0" class="my-bookings-section">
          <h3>My Bookings</h3>
          <div class="listings-grid grid grid-2">
            <div 
              v-for="listing in requestedListings" 
              :key="listing.id" 
              class="booking-card"
            >
              <div class="booking-image">
                <img :src="listing.imageUrl" :alt="listing.title" />
                <div class="status-badge" :class="getStatusClass(listing.status)">
                  {{ getStatusText(listing.status) }}
                </div>
              </div>
              <div class="booking-content">
                <h4>{{ listing.title }}</h4>
                <div class="category-tag" :style="{ borderColor: getCategoryColor(listing.categoryId), color: getCategoryColor(listing.categoryId) }">
                  {{ getCategoryName(listing.categoryId) }}
                </div>
                <p class="booking-address">📍 {{ getUserAddress(listing.userId) }}</p>
                <p class="booking-date">📅 {{ formatDate(listing.createdAt) }}</p>
              </div>
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
import { useCategoriesStore } from '@/stores/categories'
import { sampleUsers } from '@/stores/sample-data'

const router = useRouter()
const userStore = useUserStore()
const listingsStore = useListingsStore()
const categoriesStore = useCategoriesStore()

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
  return myListings.value.filter(listing => listing.status === 'taken').length
})

const getUserAddress = (userId: string) => {
  const user = sampleUsers.find(u => u.id === userId)
  return user?.address || 'Address not available'
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'available': return 'status-available'
    case 'booked': return 'status-booked'
    case 'taken': return 'status-taken'
    default: return 'status-available'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Available'
    case 'booked': return 'Booked'
    case 'taken': return 'Taken'
    default: return 'Available'
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getCategoryName = (categoryId: string) => {
  return categoriesStore.getCategoryName(categoryId)
}

const getCategoryColor = (categoryId: string) => {
  return categoriesStore.getCategoryColor(categoryId)
}

const isFormValid = computed(() => {
  return formData.value.name.trim() &&
         formData.value.email.trim() &&
         formData.value.address.trim() &&
         formData.value.phone.trim()
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
      phone: formData.value.phone.trim()
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
  categoriesStore.initializeCategories()
  listingsStore.initializeListings()
  
  // Pre-fill form with existing user data
  if (userStore.currentUser) {
    formData.value = {
      name: userStore.currentUser.name,
      email: userStore.currentUser.email,
      address: userStore.currentUser.address,
      phone: userStore.currentUser.phone
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

.profile-stats,
.my-bookings-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  margin-top: 2rem;
}

.profile-stats h3,
.my-bookings-section h3 {
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

.booking-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.booking-image {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.booking-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-available {
  background-color: #10b981;
  color: white;
}

.status-booked {
  background-color: #f59e0b;
  color: white;
}

.status-taken {
  background-color: #6b7280;
  color: white;
}

.booking-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.booking-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.booking-address,
.booking-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  align-self: flex-start;
}

.listings-grid {
  display: grid;
  gap: 1.5rem;
}

.grid.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
