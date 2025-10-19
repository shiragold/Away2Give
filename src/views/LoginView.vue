<template>
  <div class="login-view">
    <div class="container">
      <div class="login-container">
        <h1>Welcome to Giveaway App</h1>
        <p class="login-subtitle">Enter your details to get started</p>
        
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="name" class="form-label">Full Name *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email Address *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="form-input"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Address *</label>
            <textarea
              id="address"
              v-model="formData.address"
              class="form-textarea"
              placeholder="Your full address (street, city, postal code)"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number (Optional)</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              class="form-input"
              placeholder="Your phone number"
            />
          </div>
          
          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary btn-large"
              :disabled="isSubmitting || !isFormValid"
            >
              {{ isSubmitting ? 'Creating Account...' : 'Get Started' }}
            </button>
          </div>
        </form>
        
        <div class="login-info">
          <h3>How it works</h3>
          <div class="info-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Create Your Profile</h4>
                <p>Add your details so others can contact you</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>List Items</h4>
                <p>Upload photos and descriptions of items you want to give away</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Connect & Give</h4>
                <p>People can request your items and you can arrange collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types'

const router = useRouter()
const userStore = useUserStore()

const isSubmitting = ref(false)
const error = ref('')

const formData = ref({
  name: '',
  email: '',
  address: '',
  phone: ''
})

const isFormValid = computed(() => {
  return formData.value.name.trim() &&
         formData.value.email.trim() &&
         formData.value.address.trim()
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  error.value = ''

  try {
    const userData: User = {
      id: Date.now().toString(),
      name: formData.value.name.trim(),
      email: formData.value.email.trim(),
      address: formData.value.address.trim(),
      phone: formData.value.phone.trim() || undefined,
      createdAt: new Date()
    }

    await userStore.login(userData)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = 'Failed to create account. Please try again.'
    console.error('Error creating account:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-view {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.login-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.login-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.login-form {
  margin-bottom: 3rem;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
  min-width: 200px;
}

.login-info {
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
}

.login-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1f2937;
  text-align: center;
}

.info-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.step-content p {
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .login-container {
    padding: 2rem 1rem;
    margin: 0 1rem;
  }
  
  .login-container h1 {
    font-size: 2rem;
  }
  
  .info-steps {
    grid-template-columns: 1fr;
  }
}
</style>
