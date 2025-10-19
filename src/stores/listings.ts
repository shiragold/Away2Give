import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Listing, CreateListingData } from '@/types'
import { useUserStore } from './user'
import { sampleListings } from './sample-data'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref<Listing[]>([])
  const userStore = useUserStore()

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

    listing.status = 'requested'
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

    listing.status = 'given'
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
      listings.value = [...sampleListings]
      saveListings()
    }
  }

  const initializeListings = () => {
    loadListings()
  }

  return {
    listings,
    availableListings,
    myListings,
    requestedListings,
    addListing,
    requestListing,
    markAsGiven,
    getListingById,
    initializeListings
  }
})
