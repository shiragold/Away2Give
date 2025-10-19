import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category } from '@/types'
import { sampleCategories } from './sample-data'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])

  const initializeCategories = () => {
    const stored = localStorage.getItem('categories')
    if (stored) {
      categories.value = JSON.parse(stored).map((cat: any) => ({
        ...cat,
        createdAt: new Date(cat.createdAt)
      }))
    } else {
      categories.value = [...sampleCategories]
      localStorage.setItem('categories', JSON.stringify(categories.value))
    }
  }

  const getCategoryById = (id: string) => {
    return categories.value.find(category => category.id === id)
  }

  const getCategoryName = (id: string) => {
    const category = getCategoryById(id)
    return category?.name || 'Unknown Category'
  }

  const getCategoryColor = (id: string) => {
    const category = getCategoryById(id)
    return category?.color || '#6B7280'
  }

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color: '#6B7280', // Default color
      createdAt: new Date()
    }
    
    categories.value.push(newCategory)
    localStorage.setItem('categories', JSON.stringify(categories.value))
    return newCategory
  }

  const allCategories = computed(() => categories.value)

  return {
    categories,
    allCategories,
    initializeCategories,
    getCategoryById,
    getCategoryName,
    getCategoryColor,
    addCategory
  }
})