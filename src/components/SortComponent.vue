<template>
  <div class="sort-component">
    <span class="sort-label">Sort by</span>
    <select 
      :value="sortProperty" 
      class="sort-select"
      @change="handleSortChange"
    >
      <option value="published">Published</option>
      <option value="address">Address</option>
      <option value="category">Category</option>
      <option value="availability">Availability</option>
    </select>
    <button 
      @click="toggleSortOrder" 
      class="sort-toggle"
      :class="{ 'descending': sortOrder === 'desc' }"
      :title="sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M7 14l5-5 5 5"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useListingsStore } from '@/stores/listings'

const listingsStore = useListingsStore()

const sortProperty = computed(() => listingsStore.sortOptions.property)
const sortOrder = computed(() => listingsStore.sortOptions.order)

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  listingsStore.updateSortOptions(target.value, sortOrder.value)
}

const toggleSortOrder = () => {
  const newOrder = sortOrder.value === 'asc' ? 'desc' : 'asc'
  listingsStore.updateSortOptions(sortProperty.value, newOrder)
}
</script>

<style scoped>
.sort-component {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.sort-label {
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.sort-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.sort-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.sort-toggle:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.sort-toggle.descending {
  transform: rotate(180deg);
}

.sort-toggle:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

@media (max-width: 768px) {
  .sort-component {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }
  
  .sort-label {
    text-align: center;
  }
  
  .sort-select {
    min-width: auto;
    width: 100%;
  }
  
  .sort-toggle {
    align-self: center;
  }
}
</style>
