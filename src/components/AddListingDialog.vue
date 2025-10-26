<template>
  <div v-if="isOpen" class="dialog-overlay" @click="closeDialog">
    <div class="dialog-content" @click.stop>
      <div class="dialog-header">
        <h2>Add New Listing</h2>
        <button @click="closeDialog" class="close-btn">&times;</button>
      </div>
      
      <div class="dialog-body">
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
            <label for="category" class="form-label">Category *</label>
            <div class="category-selector">
              <select
                id="category"
                v-model="formData.categoryId"
                class="form-select"
                required
                @change="handleCategoryChange"
              >
                <option value="">Select or add a category</option>
                <option 
                  v-for="category in categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
                <option value="new">+ Add new category</option>
              </select>
              <input
                v-if="showNewCategoryInput"
                v-model="newCategoryName"
                type="text"
                class="form-input new-category-input"
                placeholder="Enter new category name"
                @keyup.enter="addNewCategory"
                @blur="addNewCategory"
              />
            </div>
          </div>
          
          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
        </form>
      </div>
      
      <div class="dialog-actions">
        <button @click="closeDialog" class="btn btn-outline">
          Cancel
        </button>
        <button 
          @click="handleSubmit"
          class="btn btn-primary"
          :disabled="isSubmitting || !isFormValid"
        >
          {{ isSubmitting ? 'Creating...' : 'Create Listing' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useUserStore } from '@/stores/user'
import { useCategoriesStore } from '@/stores/categories'
import PhotoUpload from '@/components/PhotoUpload.vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  listingCreated: [listing: any]
}>()

const listingsStore = useListingsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const isSubmitting = ref(false)
const error = ref('')
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')

const formData = ref({
  title: '',
  description: '',
  categoryId: '',
  imageFile: null as File | null
})

const categories = computed(() => categoriesStore.categories)

const isFormValid = computed(() => {
  return formData.value.title.trim() &&
         formData.value.description.trim() &&
         formData.value.categoryId &&
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
      categoryId: formData.value.categoryId,
      imageUrl
    }

    const newListing = await listingsStore.addListing(listingData)
    
    // Reset form
    formData.value = {
      title: '',
      description: '',
      categoryId: '',
      imageFile: null
    }

    // Emit success event and close dialog
    emit('listingCreated', newListing)
    emit('close')
  } catch (err) {
    error.value = 'Failed to create listing. Please try again.'
    console.error('Error creating listing:', err)
  } finally {
    isSubmitting.value = false
  }
}

const handleCategoryChange = () => {
  if (formData.value.categoryId === 'new') {
    showNewCategoryInput.value = true
    formData.value.categoryId = ''
  } else {
    showNewCategoryInput.value = false
  }
}

const addNewCategory = async () => {
  if (!newCategoryName.value.trim()) {
    showNewCategoryInput.value = false
    return
  }

  try {
    const newCategory = await categoriesStore.addCategory(newCategoryName.value.trim())
    formData.value.categoryId = newCategory.id
    showNewCategoryInput.value = false
    newCategoryName.value = ''
  } catch (error) {
    console.error('Error adding new category:', error)
  }
}

const closeDialog = () => {
  // Reset form when closing
  formData.value = {
    title: '',
    description: '',
    categoryId: '',
    imageFile: null
  }
  error.value = ''
  showNewCategoryInput.value = false
  newCategoryName.value = ''
  emit('close')
}

// Watch for dialog opening to initialize categories
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    categoriesStore.initializeCategories()
  }
})

onMounted(() => {
  categoriesStore.initializeCategories()
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.dialog-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #374151;
}

.dialog-body {
  padding: 2rem;
}

.form-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.listing-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.category-selector {
  position: relative;
}

.new-category-input {
  margin-top: 0.5rem;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.alert-error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.dialog-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
}

.dialog-actions .btn {
  min-width: 120px;
}

@media (max-width: 768px) {
  .dialog-content {
    margin: 0.5rem;
    max-height: 95vh;
  }
  
  .dialog-header,
  .dialog-body,
  .dialog-actions {
    padding: 1rem;
  }
  
  .dialog-actions {
    flex-direction: column;
  }
  
  .dialog-actions .btn {
    width: 100%;
  }
}
</style>
