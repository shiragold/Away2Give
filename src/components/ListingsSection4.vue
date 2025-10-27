<template>
  <div class="listings-section">
    <div v-if="filteredListings.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>No items found</h3>
      <p>Try adjusting your search filters or be the first to add a listing!</p>
      <div class="empty-actions">
        <button @click="handleClearFilters" class="btn btn-outline">
          Clear Filters
        </button>
        <button v-if="isLoggedIn" @click="handleAddListing" class="btn btn-primary">
          Add Listing
        </button>
      </div>
    </div>
    <template v-else>
      <SearchPanel />
      <div class="listings-section">
        <div class="listings-header">
          <h2>All Items</h2>
          <SortComponent />
        </div>
        <div class="listings-grid grid grid-3">
          <ListingCard
            v-for="listing in filteredListings" 
            :key="listing.id"
            :listing="listing"
            :listings="allListings"
            @open-dialog="handleOpenDialog"
          />
        </div>
      </div>
    </template>
    <ListingDialog 
        :is-open="isDialogOpen"
        :listing="selectedListing"
        @close="closeListingDialog"
    />
    <AddListingDialog 
        :is-open="isAddListingDialogOpen"
        @close="closeAddListingDialog"
        @listing-created="handleListingCreated"
      />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ListingCard from '@/components/ListingCard4.vue'
import ListingDialog from '@/components/ListingDialog.vue'
import AddListingDialog from '@/components/AddListingDialog.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import SortComponent from '@/components/SortComponent.vue'
import { useUserStore } from '@/stores/user'
import { useListingsStore } from '@/stores/listings'
import type { Listing } from '@/types'

interface Props { }

const props = defineProps<Props>()

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

// Get all listings from store for bad === 1
const listingsStore = useListingsStore()
const filteredListings = computed(() => listingsStore.filteredListings)
const allListings = computed(() => listingsStore.allListings)

// Dialog state
const isDialogOpen = ref(false)
const selectedListing = ref<Listing | null>(null)
const isAddListingDialogOpen = ref(false)

const handleOpenDialog = (listing: Listing) => {
  selectedListing.value = listing
  isDialogOpen.value = true
}

const closeListingDialog = () => {
  isDialogOpen.value = false
  selectedListing.value = null
}

const handleClearFilters = () => {
  listingsStore.clearSearchOptions()
}

const handleAddListing = () => {
  isAddListingDialogOpen.value = true
}

const closeAddListingDialog = () => {
  isAddListingDialogOpen.value = false
}

const handleListingCreated = (listing: Listing) => {
  // Dialog will close automatically
  console.log('New listing created:', listing)
}

// Expose methods to parent component
defineExpose({
  handleAddListing
})
</script>

<style scoped>
.listings-section {
  margin-bottom: 3rem;
}

.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.listings-section h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.empty-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

