<template>
  <main class="flex-1 min-h-0 overflow-hidden bg-background p-4">
    <div
      v-if="store.compareMode === 'side-by-side'"
      :class="[
        'h-full grid gap-4',
        store.deviceMode === 'desktop' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2',
      ]"
      :style="{ gridTemplateRows: previewHeight === '100%' ? '100%' : previewHeight }"
    >
      <div :style="{ height: previewHeight }" class="min-h-0">
        <DeviceFrame :deviceMode="store.deviceMode"> LandingPreviewA </DeviceFrame>
      </div>
      <div :style="{ height: previewHeight }" class="min-h-0">
        <DeviceFrame :deviceMode="store.deviceMode"> LandingPreviewB </DeviceFrame>
      </div>
    </div>
    <div v-else>Overlay</div>
  </main>
</template>
<script setup lang="ts">
import { useSimulatorStore } from '@/stores/simulator'
import DeviceFrame from '@/components/DeviceFrame.vue'

const store = useSimulatorStore()

const previewHeight =
  store.deviceMode === 'desktop' ? '100%' : store.deviceMode === 'tablet' ? '700px' : '620px'
</script>
