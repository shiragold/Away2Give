import type { Listing, User, Category } from '@/types'

// Helper function to get random category ID
const getRandomCategoryId = () => {
  const categoryIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  return categoryIds[Math.floor(Math.random() * categoryIds.length)]
}

export const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Home & Furniture',
    color: '#8B5CF6',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '2',
    name: 'Electronics',
    color: '#3B82F6',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '3',
    name: 'Tools & Garden',
    color: '#10B981',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '4',
    name: 'Kitchen & Dining',
    color: '#F59E0B',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '5',
    name: 'Sports & Fitness',
    color: '#EF4444',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '6',
    name: 'Books & Media',
    color: '#6366F1',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '7',
    name: 'Hobbies & Crafts',
    color: '#EC4899',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '8',
    name: 'Pet Supplies',
    color: '#84CC16',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '9',
    name: 'Clothing & Beauty',
    color: '#F97316',
    createdAt: new Date('2025-01-01')
  },
  {
    id: '10',
    name: 'Baby & Kids',
    color: '#06B6D4',
    createdAt: new Date('2025-01-01')
  }
]

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: 'Shenkin Street 14, Givatayim',
    phone: '052-1234567',
    createdAt: new Date('2025-10-19')
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    address: 'Geva Street 12, Givatayim',
    phone: '052-1234567',
    createdAt: new Date('2025-10-19')
  },
  {
    id: '3',
    name: 'Sarah Cohen',
    email: 'sarah.cohen@example.com',
    address: 'Rothschild Boulevard 45, Tel Aviv',
    phone: '052-2345678',
    createdAt: new Date('2025-10-18')
  },
  {
    id: '4',
    name: 'David Levy',
    email: 'david.levy@example.com',
    address: 'Dizengoff Street 78, Tel Aviv',
    phone: '052-3456789',
    createdAt: new Date('2025-10-17')
  },
  {
    id: '5',
    name: 'Rachel Green',
    email: 'rachel.green@example.com',
    address: 'Ben Yehuda Street 23, Tel Aviv',
    phone: '052-4567890',
    createdAt: new Date('2025-10-16')
  },
  {
    id: '6',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    address: 'Allenby Street 56, Tel Aviv',
    phone: '052-5678901',
    createdAt: new Date('2025-10-15')
  },
  {
    id: '7',
    name: 'Lisa Wilson',
    email: 'lisa.wilson@example.com',
    address: 'King George Street 89, Jerusalem',
    phone: '052-6789012',
    createdAt: new Date('2025-10-14')
  },
  {
    id: '8',
    name: 'Tom Davis',
    email: 'tom.davis@example.com',
    address: 'Jaffa Street 12, Jerusalem',
    phone: '052-7890123',
    createdAt: new Date('2025-10-13')
  },
  {
    id: '9',
    name: 'Emma Taylor',
    email: 'emma.taylor@example.com',
    address: 'Herzl Street 34, Haifa',
    phone: '052-8901234',
    createdAt: new Date('2025-10-12')
  },
  {
    id: '10',
    name: 'James Miller',
    email: 'james.miller@example.com',
    address: 'Balfour Street 67, Haifa',
    phone: '052-9012345',
    createdAt: new Date('2025-10-11')
  }
]

export const sampleListings: Listing[] = [
  {
    id: '1',
    title: 'Vintage Bookshelf',
    description: 'Beautiful wooden bookshelf in excellent condition. Perfect for organizing books, plants, or decorative items. Dimensions: 36" W x 12" D x 72" H.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-19')
  },
  {
    id: '2',
    title: 'Kitchen Appliances Set',
    description: 'Complete set of kitchen appliances including toaster, coffee maker, and blender. All in working condition, just upgraded to newer models.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-19')
  },
  {
    id: '3',
    title: 'Children\'s Toys Collection',
    description: 'Large collection of gently used children\'s toys including building blocks, puzzles, and stuffed animals. Great for kids aged 2-8.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '8',
    status: 'booked',
    userId: '1',
    requestedBy: '2',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-19')
  },
  {
    id: '4',
    title: 'Garden Tools',
    description: 'Assorted garden tools including shovel, rake, and pruning shears. Perfect for someone starting their first garden.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'taken',
    userId: '1',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-19')
  },
  {
    id: '5',
    title: 'Office Chair',
    description: 'Comfortable ergonomic office chair in good condition. Perfect for home office or study space.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '3',
    createdAt: new Date('2025-10-18'),
    updatedAt: new Date('2025-10-18')
  },
  {
    id: '6',
    title: 'Dining Table Set',
    description: 'Wooden dining table with 4 chairs. Great for small families or apartments. Some minor wear but fully functional.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-10-17'),
    updatedAt: new Date('2025-10-17')
  },
  {
    id: '7',
    title: 'Bicycle',
    description: 'Mountain bike in excellent condition. Recently serviced, perfect for commuting or weekend rides.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'booked',
    userId: '5',
    requestedBy: '6',
    createdAt: new Date('2025-10-16'),
    updatedAt: new Date('2025-10-16')
  },
  {
    id: '8',
    title: 'Coffee Table',
    description: 'Modern glass coffee table with wooden legs. Perfect for living room. Some scratches but structurally sound.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '6',
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-15')
  },
  {
    id: '9',
    title: 'Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics. Lightweight and portable, perfect for remote work.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-10-14'),
    updatedAt: new Date('2025-10-14')
  },
  {
    id: '10',
    title: 'Plant Collection',
    description: 'Assorted indoor plants including succulents, ferns, and flowering plants. All healthy and well-cared for.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'taken',
    userId: '8',
    createdAt: new Date('2025-10-13'),
    updatedAt: new Date('2025-10-13')
  },
  {
    id: '11',
    title: 'Books Collection',
    description: 'Mixed collection of fiction and non-fiction books. Great for book lovers and students.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '9',
    createdAt: new Date('2025-10-12'),
    updatedAt: new Date('2025-10-12')
  },
  {
    id: '12',
    title: 'Exercise Equipment',
    description: 'Home gym equipment including dumbbells, resistance bands, and yoga mat. Perfect for home workouts.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-10-11'),
    updatedAt: new Date('2025-10-11')
  },
  {
    id: '13',
    title: 'Art Supplies',
    description: 'Complete set of art supplies including paints, brushes, canvases, and sketchbooks. Great for artists or students.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'booked',
    userId: '1',
    requestedBy: '3',
    createdAt: new Date('2025-10-10'),
    updatedAt: new Date('2025-10-10')
  },
  {
    id: '14',
    title: 'Kitchen Utensils',
    description: 'Complete set of kitchen utensils including knives, cutting boards, and cooking tools. All in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-10-09'),
    updatedAt: new Date('2025-10-09')
  },
  {
    id: '15',
    title: 'Bedding Set',
    description: 'Complete bedding set including sheets, pillowcases, and comforter. Clean and in excellent condition.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '3',
    createdAt: new Date('2025-10-08'),
    updatedAt: new Date('2025-10-08')
  },
  {
    id: '16',
    title: 'Electronics',
    description: 'Various electronics including speakers, headphones, and cables. All tested and working properly.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'taken',
    userId: '4',
    createdAt: new Date('2025-10-07'),
    updatedAt: new Date('2025-10-07')
  },
  {
    id: '17',
    title: 'Clothing Collection',
    description: 'Mixed collection of clothing items in various sizes. All clean and in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-10-06'),
    updatedAt: new Date('2025-10-06')
  },
  {
    id: '18',
    title: 'Board Games',
    description: 'Collection of board games including classics and modern games. Perfect for family game nights.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '6',
    createdAt: new Date('2025-10-05'),
    updatedAt: new Date('2025-10-05')
  },
  {
    id: '19',
    title: 'Home Decor',
    description: 'Various home decor items including vases, picture frames, and decorative objects. Great for sprucing up any space.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '7',
    requestedBy: '8',
    createdAt: new Date('2025-10-04'),
    updatedAt: new Date('2025-10-04')
  },
  {
    id: '20',
    title: 'Tool Set',
    description: 'Complete tool set including screwdrivers, wrenches, and other hand tools. Perfect for DIY projects.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-10-03'),
    updatedAt: new Date('2025-10-03')
  },
  {
    id: '21',
    title: 'Musical Instruments',
    description: 'Guitar and keyboard in good condition. Perfect for music lovers or beginners learning to play.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '9',
    createdAt: new Date('2025-10-02'),
    updatedAt: new Date('2025-10-02')
  },
  {
    id: '22',
    title: 'Sports Equipment',
    description: 'Various sports equipment including tennis rackets, balls, and protective gear. All in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-01')
  },
  {
    id: '23',
    title: 'Storage Boxes',
    description: 'Set of storage boxes and containers in various sizes. Perfect for organizing and decluttering.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'taken',
    userId: '1',
    createdAt: new Date('2025-09-30'),
    updatedAt: new Date('2025-09-30')
  },
  {
    id: '24',
    title: 'Cooking Books',
    description: 'Collection of cookbooks and recipe books. Great for anyone who loves to cook or wants to learn.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-09-29'),
    updatedAt: new Date('2025-09-29')
  },
  {
    id: '25',
    title: 'Pet Supplies',
    description: 'Various pet supplies including toys, bowls, and accessories. Perfect for new pet owners.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '8',
    status: 'available',
    userId: '3',
    createdAt: new Date('2025-09-28'),
    updatedAt: new Date('2025-09-28')
  },
  {
    id: '26',
    title: 'Cleaning Supplies',
    description: 'Complete set of cleaning supplies including detergents, sponges, and cleaning tools. All unopened.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '4',
    requestedBy: '5',
    createdAt: new Date('2025-09-27'),
    updatedAt: new Date('2025-09-27')
  },
  {
    id: '27',
    title: 'Lighting Fixtures',
    description: 'Various lighting fixtures including table lamps, floor lamps, and string lights. Perfect for home decoration.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-09-26'),
    updatedAt: new Date('2025-09-26')
  },
  {
    id: '28',
    title: 'Outdoor Furniture',
    description: 'Patio furniture set including chairs and table. Weather-resistant and in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '6',
    createdAt: new Date('2025-09-25'),
    updatedAt: new Date('2025-09-25')
  },
  {
    id: '29',
    title: 'Craft Supplies',
    description: 'Various craft supplies including yarn, fabric, beads, and other materials. Perfect for creative projects.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'taken',
    userId: '7',
    createdAt: new Date('2025-09-24'),
    updatedAt: new Date('2025-09-24')
  },
  {
    id: '30',
    title: 'Office Supplies',
    description: 'Complete set of office supplies including pens, notebooks, folders, and desk accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-09-23'),
    updatedAt: new Date('2025-09-23')
  },
  {
    id: '31',
    title: 'Baby Items',
    description: 'Collection of baby items including clothes, toys, and accessories. All clean and in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '10',
    status: 'available',
    userId: '9',
    createdAt: new Date('2025-09-22'),
    updatedAt: new Date('2025-09-22')
  },
  {
    id: '32',
    title: 'Holiday Decorations',
    description: 'Various holiday decorations including lights, ornaments, and seasonal items. Perfect for festive occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '10',
    requestedBy: '1',
    createdAt: new Date('2025-09-21'),
    updatedAt: new Date('2025-09-21')
  },
  {
    id: '33',
    title: 'Travel Accessories',
    description: 'Travel accessories including luggage, travel pillows, and organizers. Perfect for frequent travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-09-20'),
    updatedAt: new Date('2025-09-20')
  },
  {
    id: '34',
    title: 'Gardening Supplies',
    description: 'Complete gardening kit including seeds, pots, soil, and tools. Perfect for starting a garden.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-09-19'),
    updatedAt: new Date('2025-09-19')
  },
  {
    id: '35',
    title: 'Fitness Equipment',
    description: 'Home fitness equipment including resistance bands, yoga blocks, and exercise mats.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'taken',
    userId: '3',
    createdAt: new Date('2025-09-18'),
    updatedAt: new Date('2025-09-18')
  },
  {
    id: '36',
    title: 'Kitchen Gadgets',
    description: 'Various kitchen gadgets including food processor, blender, and other small appliances.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-09-17'),
    updatedAt: new Date('2025-09-17')
  },
  {
    id: '37',
    title: 'Artwork Collection',
    description: 'Collection of framed artwork and prints. Perfect for decorating walls and adding character to any space.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-09-16'),
    updatedAt: new Date('2025-09-16')
  },
  {
    id: '38',
    title: 'Electronics Accessories',
    description: 'Various electronics accessories including chargers, cables, and protective cases.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'booked',
    userId: '6',
    requestedBy: '7',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2025-09-15')
  },
  {
    id: '39',
    title: 'Home Improvement Tools',
    description: 'Power tools and hand tools for home improvement projects. All in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-09-14'),
    updatedAt: new Date('2025-09-14')
  },
  {
    id: '40',
    title: 'Seasonal Clothing',
    description: 'Seasonal clothing items including jackets, sweaters, and accessories. All clean and in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-09-13'),
    updatedAt: new Date('2025-09-13')
  },
  {
    id: '41',
    title: 'Educational Materials',
    description: 'Educational books, workbooks, and learning materials. Perfect for students and teachers.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '9',
    createdAt: new Date('2025-09-12'),
    updatedAt: new Date('2025-09-12')
  },
  {
    id: '42',
    title: 'Camping Equipment',
    description: 'Complete camping gear including tent, sleeping bags, and cooking equipment. Perfect for outdoor adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'taken',
    userId: '10',
    createdAt: new Date('2025-09-11'),
    updatedAt: new Date('2025-09-11')
  },
  {
    id: '43',
    title: 'Photography Equipment',
    description: 'Camera accessories including tripods, lenses, and camera bags. Perfect for photography enthusiasts.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-09-10'),
    updatedAt: new Date('2025-09-10')
  },
  {
    id: '44',
    title: 'Musical Accessories',
    description: 'Music accessories including instrument cases, stands, and sheet music. Great for musicians.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-09-09'),
    updatedAt: new Date('2025-09-09')
  },
  {
    id: '45',
    title: 'Home Security Items',
    description: 'Home security accessories including locks, alarms, and safety equipment. All in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '3',
    requestedBy: '4',
    createdAt: new Date('2025-09-08'),
    updatedAt: new Date('2025-09-08')
  },
  {
    id: '46',
    title: 'Pet Care Items',
    description: 'Pet care supplies including grooming tools, toys, and health accessories. Perfect for pet owners.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '8',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-09-07'),
    updatedAt: new Date('2025-09-07')
  },
  {
    id: '47',
    title: 'Automotive Supplies',
    description: 'Car care supplies including cleaning products, tools, and accessories. Perfect for car enthusiasts.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-09-06'),
    updatedAt: new Date('2025-09-06')
  },
  {
    id: '48',
    title: 'Health and Wellness Items',
    description: 'Health and wellness products including supplements, fitness trackers, and wellness accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'taken',
    userId: '6',
    createdAt: new Date('2025-09-05'),
    updatedAt: new Date('2025-09-05')
  },
  {
    id: '49',
    title: 'Entertainment Items',
    description: 'Entertainment accessories including gaming equipment, streaming devices, and media storage.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-09-04'),
    updatedAt: new Date('2025-09-04')
  },
  {
    id: '50',
    title: 'Beauty and Personal Care',
    description: 'Beauty and personal care products including skincare, makeup, and grooming accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-09-03'),
    updatedAt: new Date('2025-09-03')
  },
  {
    id: '51',
    title: 'Office Furniture',
    description: 'Office furniture including desk, chair, and storage solutions. Perfect for home office setup.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '9',
    requestedBy: '10',
    createdAt: new Date('2025-09-02'),
    updatedAt: new Date('2025-09-02')
  },
  {
    id: '52',
    title: 'Kitchen Storage',
    description: 'Kitchen storage solutions including containers, organizers, and pantry accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-09-01'),
    updatedAt: new Date('2025-09-01')
  },
  {
    id: '53',
    title: 'Bedroom Accessories',
    description: 'Bedroom accessories including pillows, blankets, and decorative items. All clean and in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-08-31'),
    updatedAt: new Date('2025-08-31')
  },
  {
    id: '54',
    title: 'Bathroom Accessories',
    description: 'Bathroom accessories including towels, bath mats, and storage solutions. All clean and unused.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-08-30'),
    updatedAt: new Date('2025-08-30')
  },
  {
    id: '55',
    title: 'Laundry Supplies',
    description: 'Laundry supplies including detergents, fabric softeners, and laundry accessories. All unopened.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'taken',
    userId: '3',
    createdAt: new Date('2025-08-29'),
    updatedAt: new Date('2025-08-29')
  },
  {
    id: '56',
    title: 'Study Materials',
    description: 'Study materials including textbooks, notebooks, and educational resources. Perfect for students.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-08-28'),
    updatedAt: new Date('2025-08-28')
  },
  {
    id: '57',
    title: 'Outdoor Recreation',
    description: 'Outdoor recreation equipment including sports gear, hiking accessories, and outdoor games.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-08-27'),
    updatedAt: new Date('2025-08-27')
  },
  {
    id: '58',
    title: 'Home Organization',
    description: 'Home organization solutions including bins, labels, and storage systems. Perfect for decluttering.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '6',
    requestedBy: '7',
    createdAt: new Date('2025-08-26'),
    updatedAt: new Date('2025-08-26')
  },
  {
    id: '59',
    title: 'Kitchen Appliances',
    description: 'Small kitchen appliances including toaster, coffee maker, and food processor. All in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-08-25'),
    updatedAt: new Date('2025-08-25')
  },
  {
    id: '60',
    title: 'Entertainment Center',
    description: 'Entertainment center furniture including TV stand, media storage, and cable management solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-08-24'),
    updatedAt: new Date('2025-08-24')
  },
  {
    id: '61',
    title: 'Workshop Tools',
    description: 'Workshop tools and equipment including saws, drills, and measuring tools. Perfect for DIY projects.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'taken',
    userId: '9',
    createdAt: new Date('2025-08-23'),
    updatedAt: new Date('2025-08-23')
  },
  {
    id: '62',
    title: 'Garden Furniture',
    description: 'Garden furniture including chairs, tables, and outdoor seating. Weather-resistant and comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-08-22'),
    updatedAt: new Date('2025-08-22')
  },
  {
    id: '63',
    title: 'Children\'s Books',
    description: 'Collection of children\'s books including picture books, storybooks, and educational materials.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-08-21'),
    updatedAt: new Date('2025-08-21')
  },
  {
    id: '64',
    title: 'Craft Materials',
    description: 'Various craft materials including paper, glue, scissors, and decorative items. Perfect for creative projects.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-08-20'),
    updatedAt: new Date('2025-08-20')
  },
  {
    id: '65',
    title: 'Home Security System',
    description: 'Home security system components including cameras, sensors, and monitoring equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'booked',
    userId: '3',
    requestedBy: '4',
    createdAt: new Date('2025-08-19'),
    updatedAt: new Date('2025-08-19')
  },
  {
    id: '66',
    title: 'Pet Training Supplies',
    description: 'Pet training supplies including treats, toys, and training equipment. Perfect for new pet owners.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '8',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-08-18'),
    updatedAt: new Date('2025-08-18')
  },
  {
    id: '67',
    title: 'Automotive Tools',
    description: 'Automotive tools and equipment including wrenches, jacks, and diagnostic tools. Perfect for car maintenance.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-08-17'),
    updatedAt: new Date('2025-08-17')
  },
  {
    id: '68',
    title: 'Health Monitoring',
    description: 'Health monitoring equipment including scales, thermometers, and fitness trackers.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'taken',
    userId: '6',
    createdAt: new Date('2025-08-16'),
    updatedAt: new Date('2025-08-16')
  },
  {
    id: '69',
    title: 'Gaming Accessories',
    description: 'Gaming accessories including controllers, headsets, and gaming chairs. Perfect for gamers.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '70',
    title: 'Beauty Tools',
    description: 'Beauty tools and equipment including hair dryers, curling irons, and skincare devices.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-08-14'),
    updatedAt: new Date('2025-08-14')
  },
  {
    id: '71',
    title: 'Office Equipment',
    description: 'Office equipment including printers, scanners, and office supplies. All in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'booked',
    userId: '9',
    requestedBy: '10',
    createdAt: new Date('2025-08-13'),
    updatedAt: new Date('2025-08-13')
  },
  {
    id: '72',
    title: 'Kitchen Organization',
    description: 'Kitchen organization solutions including spice racks, utensil holders, and pantry organizers.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-08-12'),
    updatedAt: new Date('2025-08-12')
  },
  {
    id: '73',
    title: 'Bedroom Furniture',
    description: 'Bedroom furniture including nightstands, dressers, and storage solutions. All in good condition.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-08-11'),
    updatedAt: new Date('2025-08-11')
  },
  {
    id: '74',
    title: 'Bathroom Fixtures',
    description: 'Bathroom fixtures and accessories including shower curtains, bath accessories, and storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2025-08-10')
  },
  {
    id: '75',
    title: 'Laundry Equipment',
    description: 'Laundry equipment including ironing boards, garment steamers, and laundry accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'taken',
    userId: '3',
    createdAt: new Date('2025-08-09'),
    updatedAt: new Date('2025-08-09')
  },
  {
    id: '76',
    title: 'Educational Toys',
    description: 'Educational toys and learning materials including puzzles, building blocks, and STEM kits.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '10',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-08-08'),
    updatedAt: new Date('2025-08-08')
  },
  {
    id: '77',
    title: 'Outdoor Equipment',
    description: 'Outdoor equipment including camping gear, hiking supplies, and outdoor recreation items.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-08-07'),
    updatedAt: new Date('2025-08-07')
  },
  {
    id: '78',
    title: 'Home Decor Accessories',
    description: 'Home decor accessories including vases, candles, and decorative objects. Perfect for styling any space.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '6',
    requestedBy: '7',
    createdAt: new Date('2025-08-06'),
    updatedAt: new Date('2025-08-06')
  },
  {
    id: '79',
    title: 'Kitchen Tools',
    description: 'Kitchen tools and utensils including knives, cutting boards, and cooking accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-08-05'),
    updatedAt: new Date('2025-08-05')
  },
  {
    id: '80',
    title: 'Entertainment Systems',
    description: 'Entertainment systems including speakers, amplifiers, and audio equipment. All in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-08-04'),
    updatedAt: new Date('2025-08-04')
  },
  {
    id: '81',
    title: 'Workshop Accessories',
    description: 'Workshop accessories including safety equipment, workbenches, and tool storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'taken',
    userId: '9',
    createdAt: new Date('2025-08-03'),
    updatedAt: new Date('2025-08-03')
  },
  {
    id: '82',
    title: 'Garden Accessories',
    description: 'Garden accessories including planters, garden tools, and outdoor decorations.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-08-02'),
    updatedAt: new Date('2025-08-02')
  },
  {
    id: '83',
    title: 'Children\'s Furniture',
    description: 'Children\'s furniture including small chairs, tables, and storage solutions. Perfect for kids\' rooms.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '10',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-08-01'),
    updatedAt: new Date('2025-08-01')
  },
  {
    id: '84',
    title: 'Craft Equipment',
    description: 'Craft equipment including sewing machines, cutting tools, and craft storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-07-31'),
    updatedAt: new Date('2025-07-31')
  },
  {
    id: '85',
    title: 'Home Automation',
    description: 'Home automation devices including smart switches, sensors, and control systems.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'booked',
    userId: '3',
    requestedBy: '4',
    createdAt: new Date('2025-07-30'),
    updatedAt: new Date('2025-07-30')
  },
  {
    id: '86',
    title: 'Pet Furniture',
    description: 'Pet furniture including beds, scratching posts, and pet storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '8',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-07-29'),
    updatedAt: new Date('2025-07-29')
  },
  {
    id: '87',
    title: 'Automotive Accessories',
    description: 'Automotive accessories including car covers, floor mats, and interior accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-07-28'),
    updatedAt: new Date('2025-07-28')
  },
  {
    id: '88',
    title: 'Health Equipment',
    description: 'Health equipment including blood pressure monitors, thermometers, and first aid supplies.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '5',
    status: 'taken',
    userId: '6',
    createdAt: new Date('2025-07-27'),
    updatedAt: new Date('2025-07-27')
  },
  {
    id: '89',
    title: 'Gaming Setup',
    description: 'Gaming setup equipment including gaming desks, chairs, and cable management solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-07-26'),
    updatedAt: new Date('2025-07-26')
  },
  {
    id: '90',
    title: 'Beauty Station',
    description: 'Beauty station equipment including mirrors, lighting, and beauty storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '9',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-07-25'),
    updatedAt: new Date('2025-07-25')
  },
  {
    id: '91',
    title: 'Office Accessories',
    description: 'Office accessories including desk organizers, file systems, and productivity tools.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '9',
    requestedBy: '10',
    createdAt: new Date('2025-07-24'),
    updatedAt: new Date('2025-07-24')
  },
  {
    id: '92',
    title: 'Kitchen Storage Solutions',
    description: 'Kitchen storage solutions including spice organizers, utensil holders, and pantry systems.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-07-23'),
    updatedAt: new Date('2025-07-23')
  },
  {
    id: '93',
    title: 'Bedroom Storage',
    description: 'Bedroom storage solutions including under-bed storage, closet organizers, and drawer systems.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-07-22'),
    updatedAt: new Date('2025-07-22')
  },
  {
    id: '94',
    title: 'Bathroom Storage',
    description: 'Bathroom storage solutions including medicine cabinets, shower caddies, and towel storage.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-07-21'),
    updatedAt: new Date('2025-07-21')
  },
  {
    id: '95',
    title: 'Laundry Organization',
    description: 'Laundry organization solutions including sorting systems, storage bins, and folding stations.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'taken',
    userId: '3',
    createdAt: new Date('2025-07-20'),
    updatedAt: new Date('2025-07-20')
  },
  {
    id: '96',
    title: 'Educational Resources',
    description: 'Educational resources including textbooks, workbooks, and learning materials for all ages.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '6',
    status: 'available',
    userId: '4',
    createdAt: new Date('2025-07-19'),
    updatedAt: new Date('2025-07-19')
  },
  {
    id: '97',
    title: 'Outdoor Storage',
    description: 'Outdoor storage solutions including sheds, storage boxes, and weather-resistant containers.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '5',
    createdAt: new Date('2025-07-18'),
    updatedAt: new Date('2025-07-18')
  },
  {
    id: '98',
    title: 'Home Organization Systems',
    description: 'Home organization systems including closet systems, pantry organizers, and storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '1',
    status: 'booked',
    userId: '6',
    requestedBy: '7',
    createdAt: new Date('2025-07-17'),
    updatedAt: new Date('2025-07-17')
  },
  {
    id: '99',
    title: 'Kitchen Gadgets Collection',
    description: 'Collection of kitchen gadgets including food processors, blenders, and small appliances.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '4',
    status: 'available',
    userId: '7',
    createdAt: new Date('2025-07-16'),
    updatedAt: new Date('2025-07-16')
  },
  {
    id: '100',
    title: 'Entertainment Accessories',
    description: 'Entertainment accessories including remote controls, cables, and media storage solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '2',
    status: 'available',
    userId: '8',
    createdAt: new Date('2025-07-15'),
    updatedAt: new Date('2025-07-15')
  },
  {
    id: '101',
    title: 'Workshop Organization',
    description: 'Workshop organization solutions including tool storage, workbench accessories, and safety equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'taken',
    userId: '9',
    createdAt: new Date('2025-07-14'),
    updatedAt: new Date('2025-07-14')
  },
  {
    id: '102',
    title: 'Garden Organization',
    description: 'Garden organization solutions including tool storage, seed organizers, and garden planning materials.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    categoryId: '3',
    status: 'available',
    userId: '10',
    createdAt: new Date('2025-07-13'),
    updatedAt: new Date('2025-07-13')
  },
  {
    id: '103',
    title: 'Children\'s Organization',
    description: 'Children\'s organization solutions including toy storage, closet systems, and study areas.',
    imageUrl: 'https://images.unsplash.com/photo-1558060370-539c9271e9d3?w=400&h=300&fit=crop',
    categoryId: '10',
    status: 'available',
    userId: '1',
    createdAt: new Date('2025-07-12'),
    updatedAt: new Date('2025-07-12')
  },
  {
    id: '104',
    title: 'Craft Organization',
    description: 'Craft organization solutions including supply storage, workspace organizers, and project storage.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    categoryId: '7',
    status: 'available',
    userId: '2',
    createdAt: new Date('2025-07-11'),
    updatedAt: new Date('2025-07-11')
  }
]
