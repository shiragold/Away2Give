<template>
  <div class="add-listing-view">
    <div class="container">
      <div class="form-container">
        <h1>Add New Listing</h1>
        <p class="form-subtitle">Share something you no longer need with your community</p>
        
        <form @submit.prevent="handleSubmit" class="listing-form">
          <div class="form-group">
            <label class="form-label">Photo</label>
            <PhotoUpload v-model="formData.imageFile" />
          </div>
          
          <div class="form-group">
            <label for="title" class="form-label">Title *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="What are you giving away?"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="description" class="form-label">Description *</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Describe the item, its condition, and any other relevant details..."
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Collection Address *</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              class="form-input"
              placeholder="Where can people collect this item?"
              required
            />
          </div>
          
          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <div class="form-actions">
            <router-link to="/" class="btn btn-outline">
              Cancel
            </router-link>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isSubmitting || !isFormValid"
            >
              {{ isSubmitting ? 'Creating...' : 'Create Listing' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import PhotoUpload from '@/components/PhotoUpload.vue'

const router = useRouter()
const listingsStore = useListingsStore()
const userStore = useUserStore()

const isSubmitting = ref(false)
const error = ref('')

const formData = ref({
  title: '',
  description: '',
  address: '',
  imageFile: null as File | null
})

const isFormValid = computed(() => {
  return formData.value.title.trim() &&
         formData.value.description.trim() &&
         formData.value.address.trim() &&
         formData.value.imageFile
})

const handleSubmit = async () => {
  if (!isFormValid.value || !userStore.currentUser) return

  isSubmitting.value = true
  error.value = ''

  try {
    // Create a data URL for the image (in a real app, you'd upload to a server)
    const imageUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(formData.value.imageFile!)
    })

    const listingData = {
      title: formData.value.title.trim(),
      description: formData.value.description.trim(),
      address: formData.value.address.trim(),
      imageUrl
    }

    const newListing = await listingsStore.addListing(listingData)
    
    // Reset form
    formData.value = {
      title: '',
      description: '',
      address: '',
      imageFile: null
    }

    // Navigate to the new listing
    router.push({ name: 'listing-detail', params: { id: newListing.id } })
  } catch (err) {
    error.value = 'Failed to create listing. Please try again.'
    console.error('Error creating listing:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.add-listing-view {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.form-container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.form-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.listing-form {
  margin-top: 2rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.form-actions .btn {
  min-width: 120px;
}

@media (max-width: 768px) {
  .form-container {
    padding: 2rem 1rem;
    margin: 0 1rem;
  }
  
  .form-container h1 {
    font-size: 2rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
  }
}
</style>
