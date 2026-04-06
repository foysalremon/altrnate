<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden rounded-xl border border-border select-none cursor-col-resize"
    data-testid="overlay-compare"
  >
    <!-- Variant B (background) -->
    <div class="absolute inset-0">
      <LandingPreview variant="B" :config="props.variantB" :device-mode="props.deviceMode" />
    </div>

    <!-- Variant A (clipped foreground) -->
    <div class="absolute inset-0 overflow-hidden" :style="{ width: `${position}%` }">
      <div class="w-full h-full" :style="{ minWidth: `${(100 / position) * 100}%` }">
        <LandingPreview variant="A" :config="props.variantA" :device-mode="props.deviceMode" />
      </div>
    </div>

    <!-- Divider -->
    <div
      class="absolute top-0 bottom-0 z-20 flex items-center justify-center"
      :style="{ left: `${position}%`, transform: 'translateX(-50%)' }"
      data-testid="overlay-divider"
      @mousedown="onMouseDown"
      @touchmove="onTouchMove"
    >
      <div class="w-0.5 h-full bg-white shadow-lg pointer-events-none" />
      <div
        class="absolute w-10 h-10 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center gap-0.5 cursor-col-resize"
      >
        <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M8 5l-5 7 5 7M16 5l5 7-5 7"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Labels -->
    <div class="absolute top-3 right-3 z-10 flex gap-1.5">
      <span class="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">A</span>
      <span class="text-gray-400 text-xs font-bold">vs</span>
      <span class="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">B</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import LandingPreview from '@/components/LandingPreview.vue'
import type { VariantConfig, DeviceMode } from '@/stores/simulator'

interface Props {
  variantA: VariantConfig
  variantB: VariantConfig
  deviceMode: DeviceMode
}

const props = defineProps<Props>()

const position = ref(50)
const dragging = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

function updatePosition(clientX: number | null | undefined) {
  if (!clientX) return
  const container = containerRef.value
  if (!container) return
  const rect = container.getBoundingClientRect()
  const pct = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.max(5, Math.min(95, pct))
}

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  dragging.value = true

  const onMove = (e: MouseEvent) => updatePosition(e.clientX)
  const onUp = () => {
    dragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function onTouchMove(e: TouchEvent) {
  updatePosition(e.touches[0]?.clientX)
}
</script>
