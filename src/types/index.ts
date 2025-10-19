export interface User {
  id: string
  name: string
  email: string
  address: string
  phone?: string
  createdAt: Date
}

export interface Listing {
  id: string
  title: string
  description: string
  imageUrl: string
  address: string
  status: 'available' | 'requested' | 'given'
  userId: string
  requestedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateListingData {
  title: string
  description: string
  imageUrl: string
  address: string
}

export interface UpdateUserData {
  name: string
  email: string
  address: string
  phone?: string
}
