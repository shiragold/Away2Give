<template>
  <div class="home-view">
    <div class="container">
      <div class="hero-section">
        <h1>Give Away, Give Back</h1>
        <p>Connect with your community by giving away items you no longer need and finding treasures from others.</p>
        <div class="hero-actions">
          <button v-if="userStore.isLoggedIn" @click="openAddListingDialog" class="btn btn-primary">
            Add Your Listing
          </button>
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
      <component
        :is="listingsSectionComponent"
        ref="listingsSectionRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import { useCategoriesStore } from '@/stores/categories'
import ListingsSection from '@/components/ListingsSection0.vue'
import ListingsSection1 from '@/components/ListingsSection1.vue'
import ListingsSection2 from '@/components/ListingsSection2.vue'

const listingsStore = useListingsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const listingsSectionRef = ref<InstanceType<typeof ListingsSection> | null>(null)
const bad = computed(() => userStore.bad)
const availableListings = computed(() => listingsStore.availableListings)
const myListings = computed(() => listingsStore.myListings)
const requestedListings = computed(() => listingsStore.requestedListings)

const listingsSectionComponent = computed(() => {
  switch (bad.value) {
    case 1:
      return ListingsSection1
    case 2:
      return ListingsSection2
    default:
      return ListingsSection
  }
})

const openAddListingDialog = () => {
  listingsSectionRef.value?.handleAddListing()
}

onMounted(() => {
  categoriesStore.initializeCategories()
  listingsStore.initializeListings()
  listingsStore.loadSearchFilters()
  listingsStore.loadSortOptions()
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

.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.listings-section h2,
.my-listings-section h2 {
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
