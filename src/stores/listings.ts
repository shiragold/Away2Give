import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Listing, CreateListingData } from '@/types'
import { useUserStore } from './user'
import { useCategoriesStore } from './categories'
import { sampleListings, sampleUsers } from './sample-data'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref<Listing[]>([])
  const userStore = useUserStore()
  const categoriesStore = useCategoriesStore()

  // Search state
  const searchOptions = ref({
    searchText: '',
    searchFilters: {
      categoryId: '',
      publisherId: '',
      city: '',
      status: '',
    }
  })

  // Sort state
  const sortOptions = ref({
    property: 'published',
    order: 'asc' as 'asc' | 'desc'
  })

  const allListings = computed(() => {
    // Sort by relevancy: available first, then booked, then taken
    return [...listings.value].sort((a, b) => {
      const statusOrder = { 'available': 0, 'booked': 1, 'taken': 2 }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  })

  const availableListings = computed(() => 
    listings.value.filter(listing => listing.status === 'available')
  )

  const myListings = computed(() => {
    if (!userStore.currentUser) return []
    return listings.value.filter(listing => listing.userId === userStore.currentUser!.id)
  })

  const requestedListings = computed(() => {
    if (!userStore.currentUser) return []
    return listings.value.filter(listing => listing.requestedBy === userStore.currentUser!.id)
  })

  const filteredListings = computed(() => {
    let filtered = [...listings.value]
    const filters = searchOptions.value.searchFilters
    // Filter by category
    if (filters.categoryId) {
      filtered = filtered.filter(listing => listing.categoryId === filters.categoryId)
    }

    // Filter by publisher
    if (filters.publisherId) {
      filtered = filtered.filter(listing => listing.userId === filters.publisherId)
    }

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(listing => {
        const user = sampleUsers.find(u => u.id === listing.userId)
        return user?.address.toLowerCase().includes(filters.city.toLowerCase())
      })
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(listing => listing.status === filters.status)
    }

    // Filter by search text
    if (searchOptions.value.searchText) {
      const searchLower = searchOptions.value.searchText.toLowerCase()
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let comparison = 0

      switch (sortOptions.value.property) {
        case 'published':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'address':
          const userA = sampleUsers.find(u => u.id === a.userId)
          const userB = sampleUsers.find(u => u.id === b.userId)
          const addressA = userA?.address || ''
          const addressB = userB?.address || ''
          comparison = addressA.localeCompare(addressB)
          break
        case 'category':
          const categoryA = categoriesStore.getCategoryName(a.categoryId)
          const categoryB = categoriesStore.getCategoryName(b.categoryId)
          comparison = categoryA.localeCompare(categoryB)
          break
        case 'availability':
          const statusOrder = { 'available': 0, 'booked': 1, 'taken': 2 }
          comparison = statusOrder[a.status] - statusOrder[b.status]
          break
        default:
          // Default to published date
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }

      return sortOptions.value.order === 'desc' ? -comparison : comparison
    })
  })

  const addListing = (listingData: CreateListingData) => {
    if (!userStore.currentUser) {
      throw new Error('User must be logged in to add listings')
    }

    const newListing: Listing = {
      id: Date.now().toString(),
      ...listingData,
      status: 'available',
      userId: userStore.currentUser.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    listings.value.unshift(newListing)
    saveListings()
    return newListing
  }

  const requestListing = (listingId: string) => {
    if (!userStore.currentUser) {
      throw new Error('User must be logged in to request listings')
    }

    const listing = listings.value.find(l => l.id === listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }

    if (listing.status !== 'available') {
      throw new Error('Listing is not available')
    }

    listing.status = 'booked'
    listing.requestedBy = userStore.currentUser.id
    listing.updatedAt = new Date()
    
    saveListings()
    return listing
  }

  const markAsGiven = (listingId: string) => {
    if (!userStore.currentUser) {
      throw new Error('User must be logged in')
    }

    const listing = listings.value.find(l => l.id === listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }

    if (listing.userId !== userStore.currentUser.id) {
      throw new Error('Only the listing owner can mark it as given')
    }

    listing.status = 'taken'
    listing.updatedAt = new Date()
    
    saveListings()
    return listing
  }

  const getListingById = (id: string) => {
    return listings.value.find(listing => listing.id === id)
  }

  const saveListings = () => {
    localStorage.setItem('giveaway-listings', JSON.stringify(listings.value))
  }

  const loadListings = () => {
    const savedListings = localStorage.getItem('giveaway-listings')
    if (savedListings) {
      try {
        const parsedListings = JSON.parse(savedListings)
        // Convert date strings back to Date objects
        parsedListings.forEach((listing: any) => {
          listing.createdAt = new Date(listing.createdAt)
          listing.updatedAt = new Date(listing.updatedAt)
        })
        listings.value = parsedListings
      } catch (error) {
        console.error('Error parsing saved listings:', error)
        localStorage.removeItem('giveaway-listings')
      }
    } else {
      // Load sample data if no saved listings
      listings.value = sampleListings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      saveListings()
    }
  }

  const initializeListings = () => {
    loadListings()
  }

  // Helper functions for search filters
  const getUniquePublishers = computed(() => {
    const publisherIds = new Set(listings.value.map(listing => listing.userId))
    return Array.from(publisherIds).map(userId => {
      const user = sampleUsers.find(u => u.id === userId)
      return {
        id: userId,
        name: user?.name || 'Unknown User'
      }
    }).sort((a, b) => a.name.localeCompare(b.name))
  })

  const getUniqueCities = computed(() => {
    const cities = new Set<string>()
    sampleUsers.forEach(user => {
      // Extract city from address (assuming format like "Street, City" or "City, Country")
      const addressParts = user.address.split(',')
      if (addressParts.length >= 2) {
        const city = addressParts[addressParts.length - 1].trim()
        if (city) cities.add(city)
      }
    })
    return Array.from(cities).sort()
  })

  const getStatusOptions = computed(() => [
    { value: 'available', label: 'Available' },
    { value: 'booked', label: 'Booked' },
    { value: 'taken', label: 'Taken' }
  ])

  // Search management functions
  const updateSearchFilter = (key: keyof typeof searchOptions.value.searchFilters, value: string) => {
    searchOptions.value.searchFilters[key] = value
    saveSearchOptions()
  }

  const updateSearchText = (value: string) => {
    searchOptions.value = {
      ...searchOptions.value,
      searchText: value
    }
    saveSearchOptions()
  }

  const clearSearchOptions = () => {
    searchOptions.value.searchFilters = {
      categoryId: '',
      publisherId: '',
      city: '',
      status: ''
    }
    searchOptions.value.searchText = ''
    saveSearchOptions()
  }

  const saveSearchOptions = () => {
    localStorage.setItem('giveaway-search', JSON.stringify(searchOptions.value))
  }

  const loadSearchOptions = () => {
    const saved = localStorage.getItem('giveaway-search')
    if (saved) {
      try {
        searchOptions.value = JSON.parse(saved)
      } catch (error) {
        console.error('Error parsing saved search filters:', error)
        localStorage.removeItem('giveaway-search')
      }
    }
  }

  // Sort management functions
  const updateSortOptions = (property: string, order: 'asc' | 'desc') => {
    sortOptions.value = { property, order }
    saveSortOptions()
  }

  const saveSortOptions = () => {
    localStorage.setItem('giveaway-sort', JSON.stringify(sortOptions.value))
  }

  const loadSortOptions = () => {
    const saved = localStorage.getItem('giveaway-sort')
    if (saved) {
      try {
        sortOptions.value = JSON.parse(saved)
      } catch (error) {
        console.error('Error parsing saved sort options:', error)
        localStorage.removeItem('giveaway-sort')
      }
    }
  }

  return {
    listings,
    allListings,
    availableListings,
    myListings,
    requestedListings,
    filteredListings,
    searchOptions,
    sortOptions,
    getUniquePublishers,
    getUniqueCities,
    getStatusOptions,
    addListing,
    requestListing,
    markAsGiven,
    getListingById,
    updateSearchFilter,
    updateSearchText,
    clearSearchOptions,
    loadSearchOptions,
    updateSortOptions,
    loadSortOptions,
    initializeListings
  }
})
