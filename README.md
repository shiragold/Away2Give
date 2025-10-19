# 🎁 Giveaway App

A modern Vue 3 application for giving away items between people in your community. Built with TypeScript, Vite, Pinia, and Vue Router.

## Features

- **Browse Available Items**: Explore listings with photos and detailed descriptions
- **Request Items**: Click to request items you want to keep
- **Add Listings**: Upload photos and create listings for items you want to give away
- **Manage Profile**: Update your details and address (required for submitting listings)
- **Track Status**: See the status of your listings (available, requested, given away)

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Pinia** - State management for Vue
- **Vue Router** - Official router for Vue.js

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Usage

### First Time Setup

1. Click "Get Started" or "Login" to create your profile
2. Fill in your details including name, email, and address
3. Your address is required to submit listings

### Adding a Listing

1. Click "Add Listing" in the navigation
2. Upload a photo of the item
3. Fill in the title, description, and collection address
4. Click "Create Listing"

### Requesting Items

1. Browse available listings on the home page
2. Click "View Details" to see more information
3. Click "Request This Item" to request it
4. The listing status will update to "Requested"

### Managing Your Listings

1. Go to your profile to see your activity stats
2. View your listings on the home page
3. For requested items, you can mark them as "Given Away" to archive them

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ListingCard.vue  # Card component for displaying listings
│   └── PhotoUpload.vue  # Photo upload component
├── views/              # Page components
│   ├── HomeView.vue     # Home page with listings
│   ├── ListingDetailView.vue  # Individual listing details
│   ├── AddListingView.vue     # Form to add new listings
│   ├── ProfileView.vue        # User profile management
│   └── LoginView.vue          # User registration/login
├── stores/             # Pinia stores
│   ├── user.ts         # User state management
│   ├── listings.ts     # Listings state management
│   └── sample-data.ts  # Sample data for demo
├── router/             # Vue Router configuration
├── types/              # TypeScript type definitions
└── assets/             # Static assets and styles
```

## Data Storage

The app currently uses localStorage for data persistence. In a production environment, you would typically connect to a backend API or database.

## Sample Data

The app includes sample listings and users to demonstrate functionality. This data is loaded automatically on first run.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.
