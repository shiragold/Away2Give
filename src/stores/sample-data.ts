import type { Listing, User } from '@/types'

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: '123 Main St, Anytown, NY 12345',
    phone: '+1 (555) 123-4567',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    address: '456 Oak Ave, Springfield, IL 62701',
    phone: '+1 (555) 987-6543',
    createdAt: new Date('2024-01-20')
  }
]

export const sampleListings: Listing[] = [
  {
    id: '1',
    title: 'Vintage Bookshelf',
    description: 'Beautiful wooden bookshelf in excellent condition. Perfect for organizing books, plants, or decorative items. Dimensions: 36" W x 12" D x 72" H.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    address: '123 Main St, Anytown, NY 12345',
    status: 'available',
    userId: '1',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '2',
    title: 'Kitchen Appliances Set',
    description: 'Complete set of kitchen appliances including toaster, coffee maker, and blender. All in working condition, just upgraded to newer models.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    address: '456 Oak Ave, Springfield, IL 62701',
    status: 'available',
    userId: '2',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    title: 'Children\'s Toys Collection',
    description: 'Large collection of gently used children\'s toys including building blocks, puzzles, and stuffed animals. Great for kids aged 2-8.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    address: '123 Main St, Anytown, NY 12345',
    status: 'requested',
    userId: '1',
    requestedBy: '2',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '4',
    title: 'Garden Tools',
    description: 'Assorted garden tools including shovel, rake, and pruning shears. Perfect for someone starting their first garden.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    address: '789 Pine St, Portland, OR 97201',
    status: 'available',
    userId: '1',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  }
]
