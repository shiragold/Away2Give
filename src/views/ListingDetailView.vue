<template>
  <div class="listing-detail-view">
    <div class="container">
      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>
      
      <div v-else-if="!listing" class="not-found">
        <h2>Listing not found</h2>
        <p>The listing you're looking for doesn't exist or has been removed.</p>
        <router-link to="/" class="btn btn-primary">Back to Home</router-link>
      </div>
      
      <div v-else class="listing-detail">
        <div class="detail-grid">
          <div class="detail-image">
            <img :src="listing.imageUrl" :alt="listing.title" />
          </div>
          
          <div class="detail-content">
            <div class="detail-header">
              <h1>{{ listing.title }}</h1>
              <div class="status-badge" :class="statusClass">
                {{ statusText }}
              </div>
            </div>
            
            <div class="detail-description">
              <h3>Description</h3>
              <p>{{ listing.description }}</p>
            </div>
            
            <div class="detail-info">
              <div class="info-item">
                <h4>📍 Collection Address</h4>
                <p>{{ listing.address }}</p>
              </div>
              
              <div class="info-item">
                <h4>📅 Listed</h4>
                <p>{{ formatDate(listing.createdAt) }}</p>
              </div>
              
              <div v-if="listing.status === 'requested'" class="info-item">
                <h4>🔄 Last Updated</h4>
                <p>{{ formatDate(listing.updatedAt) }}</p>
              </div>
            </div>
            
            <div class="detail-actions">
              <button 
                v-if="listing.status === 'available' && canRequest"
                @click="handleRequest"
                class="btn btn-success btn-large"
                :disabled="isRequesting"
              >
                {{ isRequesting ? 'Requesting...' : 'Request This Item' }}
              </button>
              
              <button 
                v-if="canMarkAsGiven && listing.status === 'requested'"
                @click="handleMarkAsGiven"
                class="btn btn-secondary btn-large"
                :disabled="isMarkingAsGiven"
              >
                {{ isMarkingAsGiven ? 'Updating...' : 'Mark as Given Away' }}
              </button>
              
              <router-link to="/" class="btn btn-outline">
                Back to Listings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import type { Listing } from '@/types'

const route = useRoute()
const router = useRouter()
const listingsStore = useListingsStore()
const userStore = useUserStore()

const loading = ref(true)
const isRequesting = ref(false)
const isMarkingAsGiven = ref(false)

const listing = computed(() => {
  const id = route.params.id as string
  return listingsStore.getListingById(id)
})

const statusClass = computed(() => {
  if (!listing.value) return ''
  switch (listing.value.status) {
    case 'available': return 'status-available'
    case 'requested': return 'status-requested'
    case 'given': return 'status-given'
    default: return 'status-available'
  }
})

const statusText = computed(() => {
  if (!listing.value) return ''
  switch (listing.value.status) {
    case 'available': return 'Available'
    case 'requested': return 'Requested'
    case 'given': return 'Given Away'
    default: return 'Available'
  }
})

const canRequest = computed(() => {
  if (!listing.value || !userStore.isLoggedIn) return false
  return listing.value.userId !== userStore.currentUser?.id &&
         listing.value.status === 'available'
})

const canMarkAsGiven = computed(() => {
  if (!listing.value || !userStore.isLoggedIn) return false
  return listing.value.userId === userStore.currentUser?.id &&
         listing.value.status === 'requested'
})

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleRequest = async () => {
  if (!listing.value || !userStore.hasCompleteProfile) {
    router.push({ name: 'profile' })
    return
  }

  isRequesting.value = true
  try {
    await listingsStore.requestListing(listing.value.id)
  } catch (error) {
    console.error('Error requesting listing:', error)
  } finally {
    isRequesting.value = false
  }
}

const handleMarkAsGiven = async () => {
  if (!listing.value) return

  isMarkingAsGiven.value = true
  try {
    await listingsStore.markAsGiven(listing.value.id)
  } catch (error) {
    console.error('Error marking as given:', error)
  } finally {
    isMarkingAsGiven.value = false
  }
}

onMounted(() => {
  listingsStore.initializeListings()
  loading.value = false
})
</script>

<style scoped>
.listing-detail-view {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.loading,
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.not-found p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.detail-image {
  position: relative;
  min-height: 400px;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-content {
  padding: 3rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.detail-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.status-available {
  background-color: #10b981;
  color: white;
}

.status-requested {
  background-color: #f59e0b;
  color: white;
}

.status-given {
  background-color: #6b7280;
  color: white;
}

.detail-description {
  margin-bottom: 2rem;
}

.detail-description h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.detail-description p {
  color: #6b7280;
  line-height: 1.7;
  font-size: 1.1rem;
}

.detail-info {
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 1.5rem;
}

.info-item h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.info-item p {
  color: #6b7280;
  font-size: 1.1rem;
}

.detail-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .detail-content {
    padding: 2rem;
  }
  
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .detail-header h1 {
    font-size: 2rem;
    margin-right: 0;
  }
  
  .detail-actions {
    flex-direction: column;
  }
  
  .detail-actions .btn {
    width: 100%;
  }
}
</style>
