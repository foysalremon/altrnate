<template>
  <div
    v-if="props.deviceMode === 'desktop'"
    class="w-full h-full flex flex-col"
    data-testid="device-frame-desktop"
  >
    <div
      class="flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-xl border border-b-0 border-border"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <span class="w-2.5 h-2.5 rounded-full bg-green-400" />
      <div
        class="mx-auto flex-1 max-w-48 bg-white dark:bg-gray-700 rounded border border-border text-xs text-center text-muted-foreground px-2 py-0.5"
      >
        yoursite.com
      </div>
    </div>
    <div class="flex-1 min-h-0 border border-t-0 border-border rounded-b-xl overflow-hidden">
      <slot />
    </div>
  </div>
  <div
    v-if="props.deviceMode === 'mobile'"
    class="flex items-center justify-center h-full"
    data-testid="device-frame-mobile"
  >
    <div class="relative" :style="{ width: '320px', height: '580px' }">
      <div
        class="absolute inset-0 rounded-[2.5rem] border-4 border-gray-800 dark:border-gray-600 bg-gray-800 shadow-2xl overflow-hidden"
      >
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-2xl z-10 flex items-center justify-center gap-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-gray-600" />
          <span class="w-8 h-1.5 rounded-full bg-gray-600" />
        </div>
        <div class="absolute inset-1 rounded-[2rem] overflow-hidden mt-4">
          <slot />
        </div>
      </div>
      <div class="absolute -right-1.5 top-20 w-1.5 h-10 bg-gray-700 rounded-r" />
      <div class="absolute -left-1.5 top-16 w-1.5 h-6 bg-gray-700 rounded-l" />
      <div class="absolute -left-1.5 top-28 w-1.5 h-8 bg-gray-700 rounded-l" />
    </div>
  </div>
  <div
    v-if="props.deviceMode === 'tablet'"
    class="flex items-center justify-center h-full"
    data-testid="device-frame-tablet"
  >
    <div class="relative" :style="{ width: '480px', height: '620px' }">
      <div
        class="absolute inset-0 rounded-[1.5rem] border-4 border-gray-700 dark:border-gray-500 bg-gray-700 shadow-2xl overflow-hidden"
      >
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-b-xl z-10 flex items-center justify-center"
        >
          <span class="w-2 h-2 rounded-full bg-gray-500" />
        </div>
        <div className="absolute inset-1 rounded-[1.2rem] overflow-hidden mt-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Variant, VariantConfig, DeviceMode } from '@/stores/simulator'

interface Props {
  deviceMode: DeviceMode
}

const props = defineProps<Props>()
</script>
