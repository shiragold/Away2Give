<template>
  <div class="listing-card card">
    <div class="listing-image">
      <img :src="listing.imageUrl" :alt="listing.title" />
      <div class="status-badge" :class="statusClass">
        {{ statusText }}
      </div>
    </div>
    <div class="listing-content">
      <h3 class="listing-title">{{ listing.title }}</h3>
      <p class="listing-description">{{ listing.description }}</p>
      <div class="listing-meta">
        <p class="listing-address">📍 {{ listing.address }}</p>
        <p class="listing-date">{{ formatDate(listing.createdAt) }}</p>
      </div>
      <div class="listing-actions">
        <router-link 
          :to="{ name: 'listing-detail', params: { id: listing.id } }" 
          class="btn btn-primary"
        >
          View Details
        </router-link>
        <button 
          v-if="listing.status === 'available' && canRequest"
          @click="handleRequest"
          class="btn btn-success"
          :disabled="isRequesting"
        >
          {{ isRequesting ? 'Requesting...' : 'Request Item' }}
        </button>
        <button 
          v-if="canMarkAsGiven && listing.status === 'requested'"
          @click="handleMarkAsGiven"
          class="btn btn-secondary"
          :disabled="isMarkingAsGiven"
        >
          {{ isMarkingAsGiven ? 'Updating...' : 'Mark as Given' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
}

const props = defineProps<Props>()
const router = useRouter()
const listingsStore = useListingsStore()
const userStore = useUserStore()

const isRequesting = ref(false)
const isMarkingAsGiven = ref(false)

const statusClass = computed(() => {
  switch (props.listing.status) {
    case 'available': return 'status-available'
    case 'requested': return 'status-requested'
    case 'given': return 'status-given'
    default: return 'status-available'
  }
})

const statusText = computed(() => {
  switch (props.listing.status) {
    case 'available': return 'Available'
    case 'requested': return 'Requested'
    case 'given': return 'Given Away'
    default: return 'Available'
  }
})

const canRequest = computed(() => {
  return userStore.isLoggedIn && 
         props.listing.userId !== userStore.currentUser?.id &&
         props.listing.status === 'available'
})

const canMarkAsGiven = computed(() => {
  return userStore.isLoggedIn && 
         props.listing.userId === userStore.currentUser?.id
})

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleRequest = async () => {
  if (!userStore.hasCompleteProfile) {
    router.push({ name: 'profile' })
    return
  }

  isRequesting.value = true
  try {
    await listingsStore.requestListing(props.listing.id)
  } catch (error) {
    console.error('Error requesting listing:', error)
  } finally {
    isRequesting.value = false
  }
}

const handleMarkAsGiven = async () => {
  isMarkingAsGiven.value = true
  try {
    await listingsStore.markAsGiven(props.listing.id)
  } catch (error) {
    console.error('Error marking as given:', error)
  } finally {
    isMarkingAsGiven.value = false
  }
}
</script>

<style scoped>
.listing-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.listing-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.listing-image img {
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

.status-requested {
  background-color: #f59e0b;
  color: white;
}

.status-given {
  background-color: #6b7280;
  color: white;
}

.listing-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.listing-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.listing-description {
  color: #6b7280;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.listing-meta {
  margin-bottom: 1rem;
}

.listing-address {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.25rem;
}

.listing-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.listing-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.listing-actions .btn {
  flex: 1;
  min-width: 120px;
}
</style>
