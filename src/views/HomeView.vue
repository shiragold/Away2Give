<template>
  <div class="home-view">
    <div class="container">
      <div class="hero-section">
        <h1>Give Away, Give Back</h1>
        <p>Connect with your community by giving away items you no longer need and finding treasures from others.</p>
        <div class="hero-actions">
          <router-link v-if="userStore.isLoggedIn" to="/add-listing" class="btn btn-primary">
            Add Your Listing
          </router-link>
          <router-link v-else to="/login" class="btn btn-primary">
            Get Started
          </router-link>
        </div>
      </div>

      <div class="stats-section">
        <div class="stat-card">
          <h3>{{ availableListings.length }}</h3>
          <p>Items Available</p>
        </div>
        <div class="stat-card">
          <h3>{{ myListings.length }}</h3>
          <p>My Listings</p>
        </div>
        <div class="stat-card">
          <h3>{{ requestedListings.length }}</h3>
          <p>Items Requested</p>
        </div>
      </div>

      <!-- Search Panel -->
      <SearchPanel />

      <div class="listings-section">
        <h2>All Items</h2>
        <div v-if="filteredListings.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>No items found</h3>
          <p>Try adjusting your search filters or be the first to add a listing!</p>
          <div class="empty-actions">
            <button @click="clearAllFilters" class="btn btn-outline">
              Clear Filters
            </button>
            <router-link v-if="userStore.isLoggedIn" to="/add-listing" class="btn btn-primary">
              Add Listing
            </router-link>
          </div>
        </div>
        <div v-else class="listings-grid grid grid-3">
          <ListingCard 
            v-for="listing in filteredListings" 
            :key="listing.id" 
            :listing="listing"
            @open-dialog="openListingDialog"
          />
        </div>
      </div>

      <div v-if="userStore.isLoggedIn && myListings.length > 0" class="my-listings-section">
        <h2>My Listings</h2>
        <div class="listings-grid grid grid-3">
          <ListingCard 
            v-for="listing in myListings" 
            :key="listing.id" 
            :listing="listing"
            @open-dialog="openListingDialog"
          />
        </div>
      </div>
    </div>
    
    <!-- Listing Dialog -->
    <ListingDialog 
      :is-open="isDialogOpen"
      :listing="selectedListing"
      @close="closeListingDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import { useCategoriesStore } from '@/stores/categories'
import ListingCard from '@/components/ListingCard.vue'
import ListingDialog from '@/components/ListingDialog.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import type { Listing } from '@/types'

const listingsStore = useListingsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const allListings = computed(() => listingsStore.allListings)
const availableListings = computed(() => listingsStore.availableListings)
const myListings = computed(() => listingsStore.myListings)
const requestedListings = computed(() => listingsStore.requestedListings)
const filteredListings = computed(() => listingsStore.filteredListings)

const isDialogOpen = ref(false)
const selectedListing = ref<Listing | null>(null)

const openListingDialog = (listing: Listing) => {
  selectedListing.value = listing
  isDialogOpen.value = true
}

const closeListingDialog = () => {
  isDialogOpen.value = false
  selectedListing.value = null
}

const clearAllFilters = () => {
  listingsStore.clearSearchFilters()
}

onMounted(() => {
  categoriesStore.initializeCategories()
  listingsStore.initializeListings()
  listingsStore.loadSearchFilters()
})
</script>

<style scoped>
.home-view {
  padding: 2rem 0;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-section p {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  margin-top: 2rem;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: #6b7280;
  font-weight: 500;
}

.listings-section,
.my-listings-section {
  margin-bottom: 3rem;
}

.listings-section h2,
.my-listings-section h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1f2937;
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

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-section p {
    font-size: 1rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
}
</style>
