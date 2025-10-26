<template>
  <div class="listing-card card">
    <div class="listing-image">
      <img :src="listing.imageUrl" :alt="listing.title" />
      <div class="status-badge" :class="statusClass">
        {{ statusText }}
      </div>
    </div>
    <div class="listing-content">
      <ListingPopover
        :title="`More of: ${listing.title}`"
        :listings="hoverInfo.title"
        @item-click="handlePopoverItemClick"
      >
        <h3 class="listing-title hoverable">
          {{ listing.title }}
        </h3>
      </ListingPopover>
      
      <div class="listing-meta">
        <ListingPopover
          :title="`More from: ${userAddress}`"
          :listings="hoverInfo.address"
          @item-click="handlePopoverItemClick"
        >
          <p class="listing-address hoverable">
            📍 {{ userAddress }}
          </p>
        </ListingPopover>
        
        <ListingPopover
          :title="`More in: ${categoryName}`"
          :listings="hoverInfo.category"
          @item-click="handlePopoverItemClick"
        >
          <div 
            class="category-tag hoverable" 
            :style="{ borderColor: categoryColor, color: categoryColor }"
          >
            {{ categoryName }}
          </div>
        </ListingPopover>
      </div>
      <div class="listing-actions">
        <button 
          @click="openDialog"
          class="btn btn-primary"
        >
          View Details
        </button>
        <button 
          v-if="listing.status === 'available' && canRequest"
          @click="handleRequest"
          class="btn btn-success"
          :disabled="isRequesting"
        >
          {{ isRequesting ? 'Requesting...' : 'Request Item' }}
        </button>
        <button 
          v-if="canMarkAsGiven && listing.status === 'booked'"
          @click="handleMarkAsGiven"
          class="btn btn-secondary"
          :disabled="isMarkingAsGiven"
        >
          {{ isMarkingAsGiven ? 'Updating...' : 'Mark as Taken' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import { useCategoriesStore } from '@/stores/categories'
import ListingPopover from '@/components/MoreListingsPopover.vue'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
  listings: Listing[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  openDialog: [listing: Listing]
}>()

onUpdated(() => {
  console.log('ListingCard-onUpdated')
})

const router = useRouter()
const listingsStore = useListingsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const isRequesting = ref(false)
const isMarkingAsGiven = ref(false)
const otherListings = props.listings.filter(l => l.id !== props.listing.id)

const findUser = (userId: string) => userStore.allUsers.find(u => u.id === userId);

const hoverInfo = computed(() => {
  console.log("ListingCard-hoverInfo");
  return {
    title: getHoverInfoTitle(),
    category: getHoverInfoCategory(),
    address: getHoverInfoAddress(),
  }
})

const getHoverInfoTitle = () => {
  const titleFirstWord = props.listing.title.split(' ')[0];
  return otherListings.filter(l => l.title.split(' ')[0] === titleFirstWord);
}
const getHoverInfoCategory = () => {
  return otherListings.filter(l => l.categoryId === props.listing.categoryId);
}
const getHoverInfoAddress = () => {
  return otherListings.filter(l => findUser(l.userId)?.address === userAddress.value);
}

const userAddress = computed(() => {
  const user = findUser(props.listing.userId)
  return user?.address || 'Address not available'
})

const category = computed(() => {
  return categoriesStore.getCategoryById(props.listing.categoryId)
})

const categoryName = computed(() => {
  return category.value?.name || 'Uncategorized'
})

const categoryColor = computed(() => {
  return category.value?.color || '#6B7280'
})

const statusClass = computed(() => {
  switch (props.listing.status) {
    case 'available': return 'status-available'
    case 'booked': return 'status-booked'
    case 'taken': return 'status-taken'
    default: return 'status-available'
  }
})

const statusText = computed(() => {
  switch (props.listing.status) {
    case 'available': return 'Available'
    case 'booked': return 'Booked'
    case 'taken': return 'Taken'
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

const openDialog = () => {
  emit('openDialog', props.listing)
}

const handlePopoverItemClick = (listing: Listing) => {
  emit('openDialog', listing)
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

.status-booked {
  background-color: #f59e0b;
  color: white;
}

.status-taken {
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border: 1px solid;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}

/* Hoverable elements */
.hoverable {
  transition: all 0.2s ease;
}

.listing-title.hoverable:hover {
  color: #667eea;
  text-decoration: underline;
}

.listing-address.hoverable:hover {
  color: #667eea;
}

.category-tag.hoverable:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
