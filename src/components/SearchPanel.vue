<template>
  <div class="search-panel">
    <div class="search-header">
      <h3>🔍 Search & Filter</h3>
      <button 
        v-if="hasActiveFilters" 
        @click="clearFilters" 
        class="clear-filters-btn"
      >
        Clear All
      </button>
    </div>
    
    <div class="search-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label for="search-text" class="filter-label">Search</label>
          <input
            id="search-text"
            v-model="searchText"
            type="text"
            class="filter-input"
            placeholder="Search by title or description..."
            @input="updateSearchText($event.target.value)"
          />
        </div>
        
        <div class="filter-group">
          <label for="category-filter" class="filter-label">Category</label>
          <select
            id="category-filter"
            v-model="categoryId"
            class="filter-select"
            @change="updateSearchFilter('categoryId', $event.target.value)"
          >
            <option value="">All Categories</option>
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="filter-row">
        <div class="filter-group">
          <label for="publisher-filter" class="filter-label">Publisher</label>
          <select
            id="publisher-filter"
            v-model="publisherId"
            class="filter-select"
            @change="updateSearchFilter('publisherId', $event.target.value)"
          >
            <option value="">All Publishers</option>
            <option 
              v-for="publisher in publishers" 
              :key="publisher.id" 
              :value="publisher.id"
            >
              {{ publisher.name }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="city-filter" class="filter-label">City</label>
          <select
            id="city-filter"
            v-model="city"
            class="filter-select"
            @change="updateSearchFilter('city', $event.target.value)"
          >
            <option value="">All Cities</option>
            <option 
              v-for="cityOption in cities" 
              :key="cityOption" 
              :value="cityOption"
            >
              {{ cityOption }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="filter-row">
        <div class="filter-group">
          <label for="status-filter" class="filter-label">Status</label>
          <select
            id="status-filter"
            v-model="status"
            class="filter-select"
            @change="updateSearchFilter('status', $event.target.value)"
          >
            <option value="">All Statuses</option>
            <option 
              v-for="statusOption in statusOptions" 
              :key="statusOption.value" 
              :value="statusOption.value"
            >
              {{ statusOption.label }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <div class="filter-label">Results</div>
          <div class="results-count">
            {{ resultsCount }} {{ resultsCount === 1 ? 'item' : 'items' }} found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useCategoriesStore } from '@/stores/categories'

const listingsStore = useListingsStore()
const categoriesStore = useCategoriesStore()

const searchText = ref('')
const categoryId = ref('')
const publisherId = ref('')
const city = ref('')
const status = ref('')

// Computed properties
const categories = computed(() => categoriesStore.allCategories)
const publishers = computed(() => listingsStore.getUniquePublishers)
const cities = computed(() => listingsStore.getUniqueCities)
const statusOptions = computed(() => listingsStore.getStatusOptions)
const resultsCount = computed(() => listingsStore.filteredListings.length)

const hasActiveFilters = computed(() => {
  return searchText.value || categoryId.value || publisherId.value || city.value || status.value
})

// Watch for changes in store filters and update local refs
watch(() => listingsStore.searchOptions, (newSearchOptions) => {
  searchText.value = newSearchOptions.searchText
  categoryId.value = newSearchOptions.searchFilters.categoryId
  publisherId.value = newSearchOptions.searchFilters.publisherId
  city.value = newSearchOptions.searchFilters.city
  status.value = newSearchOptions.searchFilters.status
}, { immediate: true })

// Methods
const updateSearchFilter = (key: string, value: string) => {
  listingsStore.updateSearchFilter(key as keyof typeof listingsStore.searchOptions.searchFilters, value)
}

const updateSearchText = (value: string) => {
  listingsStore.updateSearchText(value)
}

const clearFilters = () => {
  searchText.value = ''
  categoryId.value = ''
  publisherId.value = ''
  city.value = ''
  status.value = ''
  listingsStore.clearSearchOptions()
}
</script>

<style scoped>
.search-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.clear-filters-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-filters-btn:hover {
  background: #dc2626;
}

.search-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.filter-input,
.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-input {
  width: 100%;
}

.results-count {
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .filter-row {
    grid-template-columns: 1fr;
  }
  
  .search-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .clear-filters-btn {
    align-self: flex-start;
  }
}
</style>
