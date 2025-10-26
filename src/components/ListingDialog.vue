<template>
  <div v-if="isOpen" class="dialog-overlay" @click="closeDialog">
    <div class="dialog-content" @click.stop>
      <div class="dialog-header">
        <h2>{{ listing?.title }}</h2>
        <button @click="closeDialog" class="close-btn">&times;</button>
      </div>
      
      <div class="dialog-body">
        <div class="listing-image">
          <img :src="listing?.imageUrl" :alt="listing?.title" />
          <div class="status-badge" :class="statusClass">
            {{ statusText }}
          </div>
        </div>
        
        <div class="listing-details">
          <div class="detail-section">
            <h3>Description</h3>
            <p>{{ listing?.description }}</p>
          </div>
          
          <div class="detail-section">
            <h4>📍 Collection Address</h4>
            <p>{{ userAddress }}</p>
          </div>
          
          <div class="detail-section">
            <h4>🏷️ Category</h4>
            <div class="category-tag" :style="{ borderColor: categoryColor, color: categoryColor }">
              {{ categoryName }}
            </div>
          </div>
          
          <div class="detail-section">
            <h4>📅 Listed</h4>
            <p>{{ formatDate(listing?.createdAt) }}</p>
          </div>
          
          <div v-if="listing?.status === 'booked'" class="detail-section">
            <h4>🔄 Last Updated</h4>
            <p>{{ formatDate(listing?.updatedAt) }}</p>
          </div>
        </div>
      </div>
      
      <div class="dialog-actions">
        <button 
          v-if="listing?.status === 'available' && canRequest"
          @click="handleRequest"
          class="btn btn-success btn-large"
          :disabled="isRequesting"
        >
          {{ isRequesting ? 'Requesting...' : 'Request This Item' }}
        </button>
        
        <button 
          v-if="canMarkAsGiven && listing?.status === 'booked'"
          @click="handleMarkAsGiven"
          class="btn btn-secondary btn-large"
          :disabled="isMarkingAsGiven"
        >
          {{ isMarkingAsGiven ? 'Updating...' : 'Mark as Taken' }}
        </button>
        
        <button @click="closeDialog" class="btn btn-outline">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import { useCategoriesStore } from '@/stores/categories'
import type { Listing } from '@/types'

interface Props {
  isOpen: boolean
  listing: Listing | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const listingsStore = useListingsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const isRequesting = ref(false)
const isMarkingAsGiven = ref(false)

const userAddress = computed(() => {
  if (!props.listing) return 'Address not available'
  const user = userStore.allUsers.find(u => u.id === props.listing!.userId)
  return user?.address || 'Address not available'
})

const category = computed(() => {
  if (!props.listing) return null
  return categoriesStore.getCategoryById(props.listing.categoryId)
})

const categoryName = computed(() => {
  return category.value?.name || 'Uncategorized'
})

const categoryColor = computed(() => {
  return category.value?.color || '#6B7280'
})

const statusClass = computed(() => {
  if (!props.listing) return ''
  switch (props.listing.status) {
    case 'available': return 'status-available'
    case 'booked': return 'status-booked'
    case 'taken': return 'status-taken'
    default: return 'status-available'
  }
})

const statusText = computed(() => {
  if (!props.listing) return ''
  switch (props.listing.status) {
    case 'available': return 'Available'
    case 'booked': return 'Booked'
    case 'taken': return 'Taken'
    default: return 'Available'
  }
})

const canRequest = computed(() => {
  if (!props.listing || !userStore.isLoggedIn) return false
  return props.listing.userId !== userStore.currentUser?.id &&
         props.listing.status === 'available'
})

const canMarkAsGiven = computed(() => {
  if (!props.listing || !userStore.isLoggedIn) return false
  return props.listing.userId === userStore.currentUser?.id &&
         props.listing.status === 'booked'
})

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const closeDialog = () => {
  emit('close')
}

const handleRequest = async () => {
  if (!props.listing || !userStore.hasCompleteProfile) {
    closeDialog()
    return
  }

  isRequesting.value = true
  try {
    await listingsStore.requestListing(props.listing.id)
    closeDialog()
  } catch (error) {
    console.error('Error requesting listing:', error)
  } finally {
    isRequesting.value = false
  }
}

const handleMarkAsGiven = async () => {
  if (!props.listing) return

  isMarkingAsGiven.value = true
  try {
    await listingsStore.markAsGiven(props.listing.id)
    closeDialog()
  } catch (error) {
    console.error('Error marking as given:', error)
  } finally {
    isMarkingAsGiven.value = false
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.dialog-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #374151;
}

.dialog-body {
  padding: 2rem;
}

.listing-image {
  position: relative;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
}

.listing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
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

.listing-details {
  margin-bottom: 2rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.detail-section h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.detail-section p {
  color: #6b7280;
  line-height: 1.6;
}

.dialog-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .dialog-content {
    margin: 0.5rem;
    max-height: 95vh;
  }
  
  .dialog-header,
  .dialog-body,
  .dialog-actions {
    padding: 1rem;
  }
  
  .dialog-actions {
    flex-direction: column;
  }
  
  .dialog-actions .btn {
    width: 100%;
  }
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
}
</style>
