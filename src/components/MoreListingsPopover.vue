<template>
  <div 
    ref="triggerRef"
    class="popover-trigger"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
  
  <Teleport to="body">
      <div 
        v-if="isVisible && listings.length > 0"
        class="popover"
        :style="popoverStyle"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="popover-header">
          <strong>{{ title }}</strong>
          <span class="popover-count">({{ listings.length }})</span>
        </div>
        <div class="popover-list">
          <div 
            v-for="item in listings.slice(0, 5)" 
            :key="item.id"
            class="popover-item"
            @click="$emit('item-click', item)"
          >
            <img :src="item.imageUrl" :alt="item.title" class="popover-image" />
            <div class="popover-details">
              <div class="popover-item-title">{{ item.title }}</div>
              <div class="popover-item-status" :class="`status-${item.status}`">
                {{ item.status }}
              </div>
            </div>
          </div>
          <div v-if="listings.length > 5" class="popover-more">
            +{{ listings.length - 5 }} more
          </div>
        </div>
      </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Listing } from '@/types'

interface Props {
  title: string
  listings: Listing[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'item-click': [listing: Listing]
}>()

const triggerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const popoverPosition = ref({ top: 0, left: 0 })
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const popoverStyle = computed(() => ({
  top: `${popoverPosition.value.top}px`,
  left: `${popoverPosition.value.left}px`,
}))

const handleMouseEnter = () => {
  // Cancel any pending hide
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
    return;
  }
  
  if (triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    popoverPosition.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    }
  }
  isVisible.value = true
}

const handleMouseLeave = () => {
  // Delay hiding to allow mouse to move to popover
  hideTimeout = setTimeout(() => {
    isVisible.value = false
    hideTimeout = null
  }, 100)
}
</script>

<style scoped>
.popover-trigger {
  cursor: pointer;
}

.popover {
  position: absolute;
  z-index: 1000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  min-width: 300px;
  max-width: 400px;
  border: 1px solid #e5e7eb;
  animation: popoverFadeIn 0.2s ease;
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popover-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #1f2937;
}

.popover-count {
  color: #6b7280;
  font-weight: normal;
}

.popover-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.popover-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popover-item:hover {
  background-color: #f3f4f6;
}

.popover-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.popover-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.popover-item-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popover-item-status {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
}

.popover-item-status.status-available {
  color: #10b981;
}

.popover-item-status.status-booked {
  color: #f59e0b;
}

.popover-item-status.status-taken {
  color: #6b7280;
}

.popover-more {
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}
</style>

