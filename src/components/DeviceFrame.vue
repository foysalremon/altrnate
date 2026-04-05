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
</template>
<script setup lang="ts">
import type { Variant, VariantConfig, DeviceMode } from '@/stores/simulator'

interface Props {
  variant: Variant
  config: VariantConfig
  deviceMode: DeviceMode
}

const props = defineProps<Props>()
</script>
